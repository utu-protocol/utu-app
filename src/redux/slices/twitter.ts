import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk, RootState} from "../store";
import axios from "axios";
import {UTU_API_AUTH_TOKEN} from "./wallet";
import {notifier} from "../../components/Notification/notify";

const TWITTER_OATH_TOKEN = "TWITTER_OATH_TOKEN";
require('dotenv').config();

export interface RequestTokenState {
    oauth_token?: string | null;
    oauth_token_secret?: string | null;
}

export interface UserAccessTokenState {
    oauth_token?: string | null;
    oauth_token_secret?: string | null;
}

interface TwitterSliceState {
    request_token: RequestTokenState;
    user_access_token: UserAccessTokenState;
    loadingToken: boolean,
    connectingTwitter: boolean,
}

const initialState: TwitterSliceState = {
    request_token: {
        oauth_token: null,
        oauth_token_secret: null,
    },
    user_access_token: {
        oauth_token: null,
        oauth_token_secret: null,
    },
    loadingToken: false,
    connectingTwitter: false,
};

export const getUTUApiAccessToken = async () => {
    const utu_api_token = await localStorage.getItem(UTU_API_AUTH_TOKEN);
    if (!utu_api_token) return null;
    const {access_token} = JSON.parse(utu_api_token);
    return access_token;
};

export const twitterSlice = createSlice({
    name: "twitter",
    initialState,
    reducers: {
        setRequestToken: (state, action: PayloadAction<RequestTokenState>) => {
            state.request_token = {
                oauth_token: action.payload.oauth_token,
                oauth_token_secret: action.payload.oauth_token_secret,
            };
        },
        setUserAccessToken: (
            state,
            action: PayloadAction<UserAccessTokenState>
        ) => {
            state.user_access_token = {
                oauth_token: action.payload.oauth_token,
                oauth_token_secret: action.payload.oauth_token_secret,
            };
        },
        resetRequestToken: (state) => {
            state.request_token = initialState.request_token;
        },
        resetUserAccessToken: (state) => {
            state.user_access_token = initialState.user_access_token;
        },
        setLoadingToken: (state, action: PayloadAction<boolean>) => {
            state.loadingToken = action.payload;
        },
        setConnectingTwitter: (state, action: PayloadAction<boolean>) => {
            state.connectingTwitter = action.payload;
        }
    },
});

export const {
    setRequestToken,
    setUserAccessToken,
    resetRequestToken,
    resetUserAccessToken,
    setLoadingToken,
    setConnectingTwitter
} = twitterSlice.actions;

export const selectSecret = (state: RootState) =>
    state.twitter.request_token.oauth_token_secret;

export const requestToken = (): AppThunk => async (dispatch) => {
    try {
        const utu_api_token = await getUTUApiAccessToken();
        dispatch(setLoadingToken(true))
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/social/logins/twitter/oauth/request_token`,
            {
                callback_url: `${window.location.origin}/connect`,
            },
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            }
        );
        const {oAuthToken, oAuthTokenSecret} = response.data;
        dispatch(
            setRequestToken({
                oauth_token: oAuthToken,
                oauth_token_secret: oAuthTokenSecret,
            })
        );
        await localStorage.setItem(TWITTER_OATH_TOKEN, oAuthTokenSecret);
        dispatch(setLoadingToken(false))
        //Oauth Step 2
        window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oAuthToken}`;
    } catch (e) {
        dispatch(setLoadingToken(false))
        notifier.alert("Error requesting token!")
    }
};

export const connectTwitter =
    ({oauth_token, oauth_verifier}: any): AppThunk =>
        async (dispatch, getState) => {
            const {address} = getState().wallet;

            if (oauth_token && oauth_verifier && address) {
                const oauth_token_secret = await localStorage.getItem(
                    TWITTER_OATH_TOKEN
                );
                const utu_api_token = await getUTUApiAccessToken();

                const response = axios({
                    url: `${process.env.REACT_APP_API_URL}/connections/twitter`,
                    method: "POST",
                    data: {
                        address,
                        oauth_token,
                        oauth_token_secret,
                        oauth_verifier,
                    },
                    headers: {
                        authorization: `Bearer ${utu_api_token}`,
                    },
                });

                await notifier.asyncBlock(
                    response,
                    'Twitter connection was successful!!',
                    "Something went wrong connecting twitter, try again or contact tech support"
                );

                // window.location.href ="/connect"
            }
        };

export const sendAccessToken =
    ({oauth_token, oauth_token_secret}: any): AppThunk =>
        async (dispatch) => {
        };

export default twitterSlice.reducer;

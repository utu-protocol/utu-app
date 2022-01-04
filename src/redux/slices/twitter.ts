import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import axios from "axios";
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
    },
});

export const {
    setRequestToken,
    setUserAccessToken,
    resetRequestToken,
    resetUserAccessToken,
} = twitterSlice.actions;


export const requestToken = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/logins/twitter/oauth/request_token`,
            {},
            {
                withCredentials: true,
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
        //Oauth Step 2
        window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oAuthToken}`;
    } catch (e) {
        notifier.alert("Error requesting token!")
    }
};


export const connectTwitter = ({oauth_token, oauth_verifier, address}: any): AppThunk =>
    async (dispatch) => {
        try {
            const oauth_token_secret = await localStorage.getItem(
                TWITTER_OATH_TOKEN
            );

            await axios({
                url: `${process.env.REACT_APP_API_URL}/connections/twitter`,
                method: "POST",
                data: {
                    oauth_token, oauth_verifier, address, oauth_token_secret
                },
                withCredentials: true,
            });

        } catch (e) {
            notifier.alert("Error connecting twitter")
        }
    };

export default twitterSlice.reducer;

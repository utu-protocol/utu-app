import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";

import dotenv from 'dotenv';
import axios from "axios";
import {UTU_API_AUTH_TOKEN} from "./wallet";
import {notifier} from "../../components/Notification/notify";

dotenv.config();

interface TelegramSliceState {
    phoneCodeHash: string | null;
    phone_number: string | null;
    codeSent: boolean,
    showCode: boolean,
    submittingCode: boolean,
    submittingPhone: boolean,
}

const initialState: TelegramSliceState = {
    phoneCodeHash: null,
    phone_number: null,
    showCode: false,
    codeSent: false,
    submittingCode: false,
    submittingPhone: false,
}

export const telegramSLice = createSlice({
    name: "telegram",
    initialState,
    reducers: {
        setPhoneCodeHash: (state, action: PayloadAction<string>) => {
            state.phoneCodeHash = action.payload;
        },
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phone_number = action.payload;
        },
        setShowCode: (state, action: PayloadAction<boolean>) => {
            state.showCode = action.payload;
        },
        setTokenSent: (state, action: PayloadAction<boolean>) => {
            state.codeSent = action.payload;
        },
        setSubmittingCode: (state, action: PayloadAction<boolean>) => {
            state.submittingCode = action.payload;
        },
        setSubmittingPhone: (state, action: PayloadAction<boolean>) => {
            state.submittingPhone = action.payload;
        },
    }
});

export const {
    setPhoneCodeHash,
    setPhoneNumber,
    setTokenSent,
    setShowCode,
    setSubmittingCode,
    setSubmittingPhone,
} = telegramSLice.actions;

export const requestCode = ({phone}: any): AppThunk => async (dispatch, getState) => {
    try {
        const utu_api_token = await localStorage.getItem(UTU_API_AUTH_TOKEN);
        dispatch(setSubmittingPhone(true));

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/logins/telegram/token`,
            {
                phone_number: phone
            },
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            }
        );

        const {message, phoneCodeHash} = response.data;

        dispatch(setPhoneCodeHash(phoneCodeHash));
        dispatch(setPhoneNumber(phone));
        dispatch(setShowCode(true));
        dispatch(setSubmittingPhone(false));

        notifier.success(message);
    } catch (e) {
        dispatch(setSubmittingPhone(false));
        console.log(e)
        notifier.alert("Error requesting telegram login code!")
    }
}

export const sendToken = ({phone_code}: any): AppThunk => async (dispatch, getState) => {
    try {
        const {phoneCodeHash, phone_number} = getState().telegram;
        const {address} = getState().wallet;

        dispatch(setSubmittingCode(true));

        const utu_api_token = await localStorage.getItem(UTU_API_AUTH_TOKEN);

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/connections/telegram`,
            {
                phone_number,
                phone_code_hash: phoneCodeHash,
                phone_code,
                address
            },
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            }
        );
        const {message} = response.data;
        dispatch(setTokenSent(true));
        dispatch(setSubmittingCode(false));

        notifier.success(message);

    } catch (e) {
        dispatch(setSubmittingCode(false));
        console.log(e);
        notifier.alert("Error submitting telegram login information!")
    }
}

export const getUTUApiAccessToken = async () => {
    const utu_api_token = await localStorage.getItem(UTU_API_AUTH_TOKEN);
    if (!utu_api_token) return null;
    const {access_token} = JSON.parse(utu_api_token);
    return access_token;
};

export default telegramSLice.reducer;

//https://stage-api.ututrust.com/token-listener/connections
//https://stage-api.ututrust.com/token-listener/balance/0xc8c745De6a84DFF8E604c1fD4BE18baDd8433135

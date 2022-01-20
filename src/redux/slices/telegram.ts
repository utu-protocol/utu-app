import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";

import dotenv from 'dotenv';
import axios from "axios";
import {UTU_API_AUTH_TOKEN} from "./wallet";

dotenv.config();

interface TelegramSliceState {
    phoneCodeHash: string | null;
    phone_number: string | null;
    codeSent: boolean,
    showCode: boolean,
}

const initialState: TelegramSliceState = {
    phoneCodeHash: null,
    phone_number: null,
    showCode: false,
    codeSent: false
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
    }
});

export const {
    setPhoneCodeHash,
    setPhoneNumber,
    setTokenSent,
    setShowCode
} = telegramSLice.actions;

export const requestCode = ({phone}: any): AppThunk => async (dispatch, getState) => {
    try {
        const utu_api_token = await localStorage.getItem(UTU_API_AUTH_TOKEN);

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

    } catch (e) {
        console.log(e)
    }
}

export const sendToken = ({phone_code}: any): AppThunk => async (dispatch, getState) => {
    try {
        const {phoneCodeHash, phone_number} = getState().telegram;

        const utu_api_token = await localStorage.getItem(UTU_API_AUTH_TOKEN);

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/connections/telegram`,
            {
                phone_number,
                phone_code_hash: phoneCodeHash,
                phone_code
            },
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            }
        );
        const {message} = response.data;
        dispatch(setTokenSent(true));

    } catch (e) {
        console.log(e)
    }
}

export default telegramSLice.reducer;

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUTUApiAccessToken} from "./telegram";
import {AppThunk} from "../store";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

interface BalanceSliceState {
    utt_balance: number | null,
    total_staked_on_you: number | null,
    total_you_have_staked: number | null,
}

const initialState: BalanceSliceState = {
    total_staked_on_you: 0,
    total_you_have_staked: 0,
    utt_balance: 0
}

export const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        setUTTBalance: (state, action: PayloadAction<number>) => {
            state.utt_balance = action.payload;
        },
        setTotalStakedOnYou: (state, action: PayloadAction<number>) => {
            state.total_staked_on_you = action.payload
        },
        setTotalYouHaveStaked: (state, action: PayloadAction<number>) => {
            state.total_you_have_staked = action.payload
        }
    }
});

export const {
    setUTTBalance,
    setTotalStakedOnYou,
    setTotalYouHaveStaked
} = balanceSlice.actions;

export const getUttBalance = (): AppThunk => async (dispatch, getState) => {
    try {
        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();

        const result = await axios.get(
            `${process.env.REACT_APP_API_URL}/balance/${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            },
        );

        dispatch(setUTTBalance(result.data));
    } catch (e) {
        console.log(e)
    }
}

export const getTotalYouStaked = (): AppThunk => async (dispatch, getState) => {
    try {
        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();

        const result = await axios.get(
            `${process.env.REACT_APP_API_URL}/total-staked-amount?target_address=${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            },
        );

        dispatch(setTotalYouHaveStaked(result.data));
    } catch (e) {
        console.log(e)
    }
}

export const getTotalStakedOnYou = (): AppThunk => async (dispatch, getState) => {
    try {
        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();

        const result = await axios.get(
            `${process.env.REACT_APP_API_URL}/total-staked-amount?source_address=${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            },
        );

        dispatch(setTotalStakedOnYou(result.data));
    } catch (e) {
        console.log(e)
    }
}

export default balanceSlice.reducer;
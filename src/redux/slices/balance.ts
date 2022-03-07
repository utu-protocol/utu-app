import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import axios from "axios";
import dotenv from "dotenv";
import { getUTUApiAccessToken } from "./wallet";
dotenv.config();

interface BalanceSliceState {
    utt_balance: number | null,
    total_staked_on_you: number | null,
    total_you_have_staked: number | null,

    balance_loading: boolean,
    staked_on_you_loading: boolean,
    total_you_staked_loading: boolean
}

const initialState: BalanceSliceState = {
    total_staked_on_you: 0,
    total_you_have_staked: 0,
    utt_balance: 0,

    balance_loading: false,
    staked_on_you_loading: false,
    total_you_staked_loading: false
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
        },

        setBalanceLoading:  (state, action: PayloadAction<boolean>) => {
            state.balance_loading = action.payload
        },
        setTotalStakedOnYouLoading: (state, action: PayloadAction<boolean>) => {
            state.staked_on_you_loading = action.payload
        },
        setTotalYouStakedLoading: (state, action: PayloadAction<boolean>) => {
            state.total_you_staked_loading = action.payload
        }
    }
});

export const {
    setUTTBalance,
    setTotalStakedOnYou,
    setTotalYouHaveStaked,

    setBalanceLoading,
    setTotalStakedOnYouLoading,
    setTotalYouStakedLoading
} = balanceSlice.actions;

export const getUttBalance = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setBalanceLoading(true));
        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();

        const result = await axios.get(
            `${process.env.REACT_APP_API_TOKEN_LISTENER_URL}/balance/${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            },
        );

        dispatch(setUTTBalance(result.data));
        dispatch(setBalanceLoading(false));
    } catch (e) {
        console.log(e)
        dispatch(setBalanceLoading(false));
    }
}

export const getTotalYouStaked = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setTotalYouStakedLoading(true));

        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();

        const result = await axios.get(
            `${process.env.REACT_APP_API_TOKEN_LISTENER_URL}/total-staked-amount?target_address=${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            },
        );

        dispatch(setTotalYouHaveStaked(result.data));
        dispatch(setTotalYouStakedLoading(false));

    } catch (e) {
        console.log(e)
        dispatch(setTotalYouStakedLoading(false));
    }
}

export const getTotalStakedOnYou = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setTotalStakedOnYouLoading(true));

        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();

        const result = await axios.get(
            `${process.env.REACT_APP_API_TOKEN_LISTENER_URL}/total-staked-amount?source_address=${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            },
        );

        dispatch(setTotalStakedOnYou(result.data));
        dispatch(setTotalStakedOnYouLoading(false));
    } catch (e) {
        console.log(e)
        dispatch(setTotalStakedOnYouLoading(false));
    }
}

export default balanceSlice.reducer;
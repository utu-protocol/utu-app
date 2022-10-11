import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import dotenv from "dotenv";
import {getProvider} from "./wallet";
import {client} from "../../grapql/apollo";
import {
    GET_STAKED_AMOUNT_BY,
    GET_STAKED_AMOUNT_ON,
} from "../../grapql/querries/staked";
import {getBalance} from "../../utils/ethereum";

dotenv.config();

interface BalanceSliceState {
    utt_balance: number | null;
    total_staked_on_you: number | null;
    total_you_have_staked: number | null;

    balance_loading: boolean;
    staked_on_you_loading: boolean;
    total_you_staked_loading: boolean;
}

const initialState: BalanceSliceState = {
    total_staked_on_you: 0,
    total_you_have_staked: 0,
    utt_balance: 0,

    balance_loading: false,
    staked_on_you_loading: false,
    total_you_staked_loading: false,
};

export const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        setUTTBalance: (state, action: PayloadAction<number>) => {
            state.utt_balance = action.payload;
        },
        setTotalStakedOnYou: (state, action: PayloadAction<number>) => {
            state.total_staked_on_you = action.payload;
        },
        setTotalYouHaveStaked: (state, action: PayloadAction<number>) => {
            state.total_you_have_staked = action.payload;
        },

        setBalanceLoading: (state, action: PayloadAction<boolean>) => {
            state.balance_loading = action.payload;
        },
        setTotalStakedOnYouLoading: (state, action: PayloadAction<boolean>) => {
            state.staked_on_you_loading = action.payload;
        },
        setTotalYouStakedLoading: (state, action: PayloadAction<boolean>) => {
            state.total_you_staked_loading = action.payload;
        },
    },
});

export const {
    setUTTBalance,
    setTotalStakedOnYou,
    setTotalYouHaveStaked,

    setBalanceLoading,
    setTotalStakedOnYouLoading,
    setTotalYouStakedLoading,
} = balanceSlice.actions;

export const getUttBalance = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setBalanceLoading(true));
        const {address} = getState().wallet;
        const provider = await getProvider();
        if (!provider || !address) return
        const balance = await getBalance(address, provider);
        dispatch(setUTTBalance(Number(balance || 0)));
        dispatch(setBalanceLoading(false));
    } catch (e) {
        console.log(e);
        dispatch(setBalanceLoading(false));
    }
};

export const getStakedAmountBy = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setTotalYouStakedLoading(true));
        const {address} = getState().wallet;

        const {data} = await client.query({
            query: GET_STAKED_AMOUNT_BY,
            variables: {
                id: address?.toLowerCase(),
            },
            fetchPolicy: 'network-only',
        });

        const amount = Number(data?.stakedAmountByEntity?.amount || 0);
        dispatch(setTotalYouHaveStaked(amount));

        dispatch(setTotalYouStakedLoading(false));
    } catch (e) {
        console.log(e);
        dispatch(setBalanceLoading(false));
    }
};

export const getStakedAmountOn = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setTotalStakedOnYouLoading(true));
        const {address} = getState().wallet;

        const {data} = await client.query({
            query: GET_STAKED_AMOUNT_ON,
            variables: {
                id: address?.toLowerCase(),
            },
            fetchPolicy: 'network-only',
        });

        const amount = Number(data?.stakedAmountOnEntity?.amount || 0);
        dispatch(setTotalStakedOnYou(amount));
        dispatch(setTotalStakedOnYouLoading(false));
    } catch (e) {
        console.log(e);
        dispatch(setBalanceLoading(false));
    }
};

export default balanceSlice.reducer;

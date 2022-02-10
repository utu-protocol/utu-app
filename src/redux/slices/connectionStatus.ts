import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUTUApiAccessToken} from "./telegram";
import {AppThunk} from "../store";
import axios from "axios";

interface IConnectionStatus {
    connectionType: any,
    UTT_balance: number | null
}

const initialState: IConnectionStatus = {
    connectionType: null,
    UTT_balance: null,
}


export const connectionStatusSLice = createSlice({
    name: "connectionStatus",
    initialState,
    reducers: {
        setUTTBalance: (state, action: PayloadAction<number>) => {
            state.UTT_balance = action.payload;
        },
        setConnectionStatus: (state, action: PayloadAction<any>) => {
            state.connectionType = action.payload;
        }
    }
});

export const {
    setUTTBalance,
    setConnectionStatus
} = connectionStatusSLice.actions;



export const connectionStatus = (): AppThunk => async (dispatch, getState) => {
    try {
        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();
        const result = await axios.get(
            `https://stage-api.ututrust.com/token-listener/connections/${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },

            },
        );

        console.log(result.data.connections)
        dispatch(setConnectionStatus(result.data.connections));
    } catch (e) {
        console.log(e)
    }
}




export const UttBalance = (): AppThunk => async (dispatch, getState) => {
    try {
        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();
        console.log(utu_api_token);
        const result = await axios.get(
            `https://stage-api.ututrust.com/token-listener/balance/${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },

            },
        );

        console.log(result.data)
        dispatch(setUTTBalance(result.data));
    } catch (e) {
        console.log(e)
    }
}


export default connectionStatusSLice.reducer;
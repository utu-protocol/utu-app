import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import axios from "axios";
import dotenv from "dotenv";
import {getUTUApiAccessToken} from "./wallet";

dotenv.config();


interface IConnectionStatus {
    connectionType: any,
    connectionTypeLoading: boolean
}

const initialState: IConnectionStatus = {
    connectionType: [],
    connectionTypeLoading: false
}


export const connectionStatusSLice = createSlice({
    name: "connectionStatus",
    initialState,
    reducers: {
        setConnectionStatus: (state, action: PayloadAction<any>) => {
            state.connectionType = action.payload;
        },
        setConnectionTypeLoading: (state, action: PayloadAction<boolean>) => {
            state.connectionTypeLoading = action.payload
        }
    }
});

export const {
    setConnectionStatus,
    setConnectionTypeLoading
} = connectionStatusSLice.actions;


export const connectionStatus = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setConnectionTypeLoading(true));
        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();
        const result = await axios.get(
            `${process.env.REACT_APP_API_TOKEN_LISTENER_URL}/connections?target_address=${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                }
            },
        );

        dispatch(setConnectionTypeLoading(false))
        dispatch(setConnectionStatus(result.data.connections));
    } catch (e) {
        console.log(e);
        dispatch(setConnectionTypeLoading(false))
    }
}


export default connectionStatusSLice.reducer;
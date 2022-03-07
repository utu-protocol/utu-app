import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import axios from "axios";
import dotenv from "dotenv";
import { getUTUApiAccessToken } from "./wallet";
dotenv.config();


interface IConnectionStatus {
    connectionType: any,
}

const initialState: IConnectionStatus = {
    connectionType: []
}


export const connectionStatusSLice = createSlice({
    name: "connectionStatus",
    initialState,
    reducers: {
        setConnectionStatus: (state, action: PayloadAction<any>) => {
            state.connectionType = action.payload;
        }
    }
});

export const {
    setConnectionStatus
} = connectionStatusSLice.actions;



export const connectionStatus = (): AppThunk => async (dispatch, getState) => {
    try {
        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();
        const result = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/connections?source_address=${address}`,
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


export default connectionStatusSLice.reducer;
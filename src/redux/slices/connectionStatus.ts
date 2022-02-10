import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUTUApiAccessToken} from "./telegram";
import {AppThunk} from "../store";
import axios from "axios";

interface IConnectionStatus {
    connectionType: string |null
}

const initialState: IConnectionStatus = {
    connectionType: null
}


export const connectionStatusSLice = createSlice({
    name: "connectionStatus",
    initialState,
    reducers: {
        setConnectionStatus: (state, action: PayloadAction<string>) => {
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
            `https://stage-api.ututrust.com/token-listener/connections/${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },

            },
        );

        console.log(result.data.connections.type)
        dispatch(setConnectionStatus(result.data.connections.type));
    } catch (e) {
        console.log(e)
    }
}


export default connectionStatusSLice.reducer;
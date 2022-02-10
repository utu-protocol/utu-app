import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUTUApiAccessToken} from "./telegram";
import {AppThunk} from "../store";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

interface EndorsementState {
    endorsements: any[]
}

const initialState: EndorsementState = {
    endorsements: []
}

export const endorsementSlice = createSlice({
    name: "endorsement",
    initialState,
    reducers: {
        setEndorsements: (state, action: PayloadAction<any[]>) => {
            state.endorsements = action.payload
        }
    }
});

export const {setEndorsements} = endorsementSlice.actions;

export const getEndorsements = (): AppThunk => async (dispatch, getState) => {
    try {
        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();

        const result = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/endorsments/${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            },
        );

        console.log(result.data, "endorsements");

        dispatch(setEndorsements(result.data));
    } catch (e) {
        console.log(e)
    }
}

export default endorsementSlice.reducer;
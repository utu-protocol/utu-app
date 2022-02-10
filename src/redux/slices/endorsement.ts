import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUTUApiAccessToken} from "./telegram";
import {AppThunk} from "../store";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

interface EndorsementState {
    endorsements: any[],
    endorsements_loading: boolean
}

const initialState: EndorsementState = {
    endorsements: [],
    endorsements_loading: false

}

export const endorsementSlice = createSlice({
    name: "endorsement",
    initialState,
    reducers: {
        setEndorsements: (state, action: PayloadAction<any[]>) => {
            state.endorsements = action.payload
        },
        setEndorsementLoading: (state, action: PayloadAction<boolean>) => {
            state.endorsements_loading = action.payload
        }
    }
});

export const {setEndorsements, setEndorsementLoading} = endorsementSlice.actions;

export const getEndorsements = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setEndorsementLoading(true))
        const {address} = getState().wallet;
        const utu_api_token = await getUTUApiAccessToken();

        const result = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/endorsements/${address}`,
            {
                headers: {
                    authorization: `Bearer ${utu_api_token}`,
                },
            },
        );

        const {endorsements} = result.data;

        dispatch(setEndorsements(endorsements));
        dispatch(setEndorsementLoading(false))
    } catch (e) {
        console.log(e)
        dispatch(setEndorsementLoading(false))
    }
}

export default endorsementSlice.reducer;
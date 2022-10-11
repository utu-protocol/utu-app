import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import dotenv from "dotenv";
import { client } from "../../grapql/apollo";
import {
  GET_ENDORSEMENTS_BY_SOURCE,
  GET_ENDORSEMENTS_BY_TARGET,
} from "../../grapql/querries/endorsements";

dotenv.config();

interface EndorsementState {
  endorsements: any[];
  endorsements_loading: boolean;
}

const initialState: EndorsementState = {
  endorsements: [],
  endorsements_loading: false,
};

export const endorsementSlice = createSlice({
  name: "endorsement",
  initialState,
  reducers: {
    setEndorsements: (state, action: PayloadAction<any[]>) => {
      state.endorsements = action.payload;
    },
    setEndorsementLoading: (state, action: PayloadAction<boolean>) => {
      state.endorsements_loading = action.payload;
    },
  },
});

export const { setEndorsements, setEndorsementLoading } =
  endorsementSlice.actions;

export const getEndorsements = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setEndorsementLoading(true));
    const { address } = getState().wallet;

    const res_source = await client.query({
      query: GET_ENDORSEMENTS_BY_SOURCE,
      variables: {
        source: address?.toLowerCase(),
      },
      fetchPolicy: 'network-only',
    });

    const res_target = await client.query({
      query: GET_ENDORSEMENTS_BY_TARGET,
      variables: {
        target: address?.toLowerCase(),
      },
      fetchPolicy: 'network-only',
    });

    const endorsements = [
      ...res_source.data.endorseEntities,
      ...res_target.data.endorseEntities,
    ].map((item: any) => ({
      source: item._from,
      target: item._to,
      value: Number(item._value),
    }));

    dispatch(setEndorsements(endorsements));
    dispatch(setEndorsementLoading(false));
  } catch (e) {
    console.log(e);
    dispatch(setEndorsementLoading(false));
  }
};

export default endorsementSlice.reducer;

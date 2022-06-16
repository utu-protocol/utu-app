import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
import dotenv from "dotenv";
import { getUTUApiAccessToken } from "./wallet";
import { client } from "../../grapql/apollo";
import {
  GET_ENDORSEMENTS,
  GET_ENDORSEMENTS_BY_SOURCE,
  GET_ENDORSEMENTS_BY_TARGET,
} from "../../grapql/querries/endorsements";
import {
  setTotalStakedOnYou,
  setTotalStakedOnYouLoading,
  setTotalYouHaveStaked,
  setTotalYouStakedLoading,
} from "./balance";
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
    dispatch(setTotalStakedOnYouLoading(true));
    dispatch(setTotalYouStakedLoading(true));
    const { address } = getState().wallet;

    const res_source = await client.query({
      query: GET_ENDORSEMENTS_BY_SOURCE,
      variables: {
        source: address?.toLowerCase(),
      },
    });

    const res_target = await client.query({
      query: GET_ENDORSEMENTS_BY_TARGET,
      variables: {
        target: address?.toLowerCase(),
      },
    });

    const endorsements = [
      ...res_source.data.endorseEntities,
      ...res_target.data.endorseEntities,
    ].map((item: any) => ({
      source: item._from,
      target: item._to,
      value: Number(item._value),
    }));

    const totalStakedOnYou = res_target?.data?.endorseEntities?.reduce(
      (acc: number, endorsement: any) => acc + Number(endorsement._value),
      0
    );
    const totalStaked = res_source?.data?.endorseEntities?.reduce(
      (acc: number, endorsement: any) => acc + Number(endorsement._value),
      0
    );

    dispatch(setTotalStakedOnYou(totalStakedOnYou));
    dispatch(setTotalYouHaveStaked(totalStaked));

    dispatch(setEndorsements(endorsements));
    dispatch(setEndorsementLoading(false));
    dispatch(setTotalYouStakedLoading(false));
    dispatch(setTotalStakedOnYouLoading(false));
  } catch (e) {
    console.log(e);
    dispatch(setEndorsementLoading(false));
  }
};

export default endorsementSlice.reducer;

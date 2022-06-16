import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
import dotenv from "dotenv";
import { getUTUApiAccessToken } from "./wallet";
import { client } from "../../grapql/apollo";
import { GET_CONNECTIONS } from "../../grapql/querries/connections";
import { getSocialConnectionType } from "../../utils/helper";

dotenv.config();

interface IConnectionStatus {
  connectionType: any;
  connectionTypeLoading: boolean;
}

const initialState: IConnectionStatus = {
  connectionType: [],
  connectionTypeLoading: false,
};

export const connectionStatusSLice = createSlice({
  name: "connectionStatus",
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<any>) => {
      state.connectionType = action.payload;
    },
    setConnectionTypeLoading: (state, action: PayloadAction<boolean>) => {
      state.connectionTypeLoading = action.payload;
    },
  },
});

export const { setConnectionStatus, setConnectionTypeLoading } =
  connectionStatusSLice.actions;

export const connectionStatus = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setConnectionTypeLoading(true));
    const { address } = getState().wallet;
    const { data } = await client.query({
      query: GET_CONNECTIONS,
      variables: {
        address: address?.toLowerCase(),
      },
    });
    const result =
      data?.connectionEntities?.map((item: any) => ({
        type: getSocialConnectionType(item._connectedTypeId),
        address: item._user,
        hash: item._connectedUserIdHash,
      })) || [];

    dispatch(setConnectionTypeLoading(false));
    dispatch(setConnectionStatus(result));
  } catch (e) {
    console.log(e);
    dispatch(setConnectionTypeLoading(false));
  }
};

export default connectionStatusSLice.reducer;

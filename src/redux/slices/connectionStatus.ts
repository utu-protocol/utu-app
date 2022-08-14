import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
import dotenv from "dotenv";
import { getUTUApiAccessToken } from "./wallet";
import { client } from "../../grapql/apollo";
import { GET_CONNECTIONS } from "../../grapql/querries/connections";
import { getSocialConnectionType } from "../../utils/helper";
import { sleep } from "../../lib/utilities";

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

export const connectionStatusFromApi = async (
  address: string
): Promise<any[]> => {
  try {
    const utu_api_token = await getUTUApiAccessToken();
    const result = await axios.get(
      `${process.env.REACT_APP_API_TOKEN_LISTENER_URL}/connections?target_address=${address}`,
      {
        headers: {
          authorization: `Bearer ${utu_api_token}`,
        },
      }
    );

    return result.data.connections;
  } catch (e) {
    console.log(e);
    return [];
  }
};

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
        address: item._user,
        type: getSocialConnectionType(item._connectedTypeId),
        hash: item._connectedUserIdHash,
      })) || [];
    const listFromApi = await connectionStatusFromApi(address!);
    const list = [...listFromApi, ...result].filter(
      (connection, index, array) => {
        return (
          array.findIndex((item) => item.hash === connection.hash) === index
        );
      }
    );
    dispatch(setConnectionTypeLoading(false));
    dispatch(setConnectionStatus(list));
  } catch (e) {
    console.log(e);
    dispatch(setConnectionTypeLoading(false));
  }
};

export const  refreshConnectionsStatus = (): AppThunk => async (dispatch)=> {
  dispatch(setConnectionTypeLoading(true)); 
  await sleep(3000);
  return dispatch(connectionStatus());
};

export default connectionStatusSLice.reducer;

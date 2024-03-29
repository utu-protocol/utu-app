import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

import dotenv from "dotenv";
import axios from "axios";
import { getUTUApiAccessToken } from "./wallet";
import { notifier } from "../../components/Notification/notify";
import moment from "moment";
import { refreshConnectionsStatus } from "./connectionStatus";

dotenv.config();

interface TelegramSliceState {
  phoneCodeHash: string | null;
  phone_number: string | null;
  codeSent: boolean;
  showCode: boolean;
  showPasswordField: boolean;
  submittingCode: boolean;
  submittingPhone: boolean;
}

const initialState: TelegramSliceState = {
  phoneCodeHash: null,
  phone_number: null,
  showCode: false,
  showPasswordField: false,
  codeSent: false,
  submittingCode: false,
  submittingPhone: false,
};

export const telegramSLice = createSlice({
  name: "telegram",
  initialState,
  reducers: {
    setPhoneCodeHash: (state, action: PayloadAction<string>) => {
      state.phoneCodeHash = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
    },
    setShowCode: (state, action: PayloadAction<boolean>) => {
      state.showCode = action.payload;
    },
    setShowPasswordField: (state, action: PayloadAction<boolean>) => {
      state.showPasswordField = action.payload;
    },
    setTokenSent: (state, action: PayloadAction<boolean>) => {
      state.codeSent = action.payload;
    },
    setSubmittingCode: (state, action: PayloadAction<boolean>) => {
      state.submittingCode = action.payload;
    },
    setSubmittingPhone: (state, action: PayloadAction<boolean>) => {
      state.submittingPhone = action.payload;
    },
  },
});

export const {
  setPhoneCodeHash,
  setPhoneNumber,
  setTokenSent,
  setShowCode,
  setSubmittingCode,
  setSubmittingPhone,
  setShowPasswordField,
} = telegramSLice.actions;

export const requestCode =
  ({ phone }: any): AppThunk =>
  async (dispatch, getState) => {
    try {
      const utu_api_token = await getUTUApiAccessToken();
      dispatch(setSubmittingPhone(true));

      const response = await axios.post(
        `${process.env.REACT_APP_API_SOCIAL_CONNECTOR_URL}/logins/telegram/token`,
        {
          phone_number: phone,
        },
        {
          headers: {
            authorization: `Bearer ${utu_api_token}`,
          },
        }
      );

      const { message, phoneCodeHash } = response.data;

      dispatch(setPhoneCodeHash(phoneCodeHash));
      dispatch(setPhoneNumber(phone));
      dispatch(setShowCode(true));
      dispatch(setSubmittingPhone(false));

      notifier.success(message);
    } catch (e: any) {
      dispatch(setSubmittingPhone(false));

      if (e.response) {
        const { statusCode, message } = e.response.data;
        if (statusCode === 420) {
          const seconds = message.split(" ")[3];
          const time = moment().add(seconds, "seconds").calendar();

          return notifier.alert(
            `There’s a Telegram connection rate limit active, please wait ${seconds} seconds (${time}) before trying again with this phone number.`
          );
        }
        return notifier.alert(message.toString());
      }
      notifier.alert("Error requesting telegram login code!");
    }
  };

export const sendToken =
  ({ phone_code, password }: any): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { phoneCodeHash, phone_number } = getState().telegram;
      const { address } = getState().wallet;

      dispatch(setSubmittingCode(true));

      const utu_api_token = await getUTUApiAccessToken();

      const response = await axios.post(
        `${process.env.REACT_APP_API_SOCIAL_CONNECTOR_URL}/connections/telegram`,
        {
          phone_number,
          phone_code_hash: phoneCodeHash,
          phone_code,
          address,
          password,
        },
        {
          headers: {
            authorization: `Bearer ${utu_api_token}`,
          },
        }
      );
      const { message } = response.data;
      dispatch(setTokenSent(true));
      dispatch(setSubmittingCode(false));
      notifier.success(message);
      dispatch(refreshConnectionsStatus());
    } catch (e: any) {
      dispatch(setSubmittingCode(false));

      if (
        e.response &&
        e.response?.data?.message.toString().includes("SESSION_PASSWORD_NEEDED")
      ) {
        dispatch(setShowPasswordField(true));
        notifier.alert(
          "Please provide your telegram Two-Step Verification password"
        );
        return;
      }

      notifier.alert(
        e.response
          ? e.response?.data?.message.toString()
          : "Error submitting telegram login information!"
      );
    }
  };

export default telegramSLice.reducer;

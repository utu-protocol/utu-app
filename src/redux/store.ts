import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import walletReducer from './slices/wallet';
import twitterReducer from './slices/twitter';
import telegramReducer from "./slices/telegram";
import connectionStatusReducer from "./slices/connectionStatus";
import balanceReducer from "./slices/balance";
import endorsementReducer from "./slices/endorsement";
import addressDetailsReducer from './slices/addressDetails';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    twitter: twitterReducer,
    telegram: telegramReducer,
    connectionStatus:connectionStatusReducer,
    balance: balanceReducer,
    endorsement: endorsementReducer,
    addressDetails: addressDetailsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

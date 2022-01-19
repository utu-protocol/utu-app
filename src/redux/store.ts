import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import walletReducer from './slices/wallet';
import twitterReducer from './slices/twitter';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    twitter: twitterReducer
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

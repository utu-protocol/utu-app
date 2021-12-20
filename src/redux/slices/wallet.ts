import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { AppThunk, RootState } from "../store";
import Web3Modal from "web3modal";
import { providers } from "ethers";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
};

let web3Modal: any;
let provider: any;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

if (web3Modal) {
  console.log(web3Modal.cachedProvider);
}

export interface WalletState {
  provider?: any;
  web3Provider?: any;
  address?: string | null;
  chainId?: number | null;
}

const initialState: WalletState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

export const connectWallet = createAsyncThunk("wallet/connect", async () => {
  provider = await web3Modal.connect();

  // We plug the initial `provider` into ethers.js and get back
  // a Web3Provider. This will add on methods from ethers.js and
  // event listeners such as `.on()` will be different.
  const web3Provider = new providers.Web3Provider(provider);

  const signer = web3Provider.getSigner();
  const address = await signer.getAddress();

  const network = await web3Provider.getNetwork();
  // The value we return becomes the `fulfilled` action payload
  return {
    provider: {},
    web3Provider: {},
    address,
    chainId: network.chainId,
  };
});

export const disconnectWallet = createAsyncThunk(
  "wallet/disconnect",
  async () => {
    const provider = await web3Modal.cachedProvider;
    await web3Modal.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === "function") {
      await provider.disconnect();
    }
  }
);

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setWeb3Provider: (state, action: PayloadAction<WalletState>) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
    resetWeb3Provider: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        connectWallet.fulfilled,
        (state, action: PayloadAction<WalletState>) => {
          state.address = action.payload.address;
          state.web3Provider = action.payload.web3Provider;
          state.chainId = action.payload.chainId;
          state.provider = action.payload.provider;
        }
      )
      .addCase(disconnectWallet.fulfilled, (state, action) => {
        state = initialState;
      });
  },
});

export const { setWeb3Provider, resetWeb3Provider } = walletSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.wallet.value)`
export const selectAddress = (state: RootState) => state.wallet.address;

export const initWallet = (): AppThunk => (dispatch, getState) => {
  if (web3Modal && web3Modal.cachedProvider) {
    dispatch(connectWallet());
  }
};

export default walletSlice.reducer;

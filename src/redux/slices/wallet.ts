import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { AppThunk, RootState } from "../store";
import Web3Modal from "web3modal";
import { providers } from "ethers";
// @ts-ignore
import { addressSignatureVerification } from "@ututrust/web-components";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";
export const UTU_API_AUTH_TOKEN = "utu-identity-data";

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

export interface WalletState {
  address?: string | null;
  chainId?: number | null;
  networkName?: string | null;
}

const initialState: WalletState = {
  address: null,
  chainId: null,
  networkName: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setWeb3Provider: (state, action: PayloadAction<WalletState>) => {
      state.address = action.payload.address;
      state.chainId = action.payload.chainId;
      state.networkName = action.payload.networkName;
    },
    resetWeb3Provider: (state) => {
      state.address = null;
      state.chainId = null;
      state.networkName = null;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setChainId: (state, action: PayloadAction<number>) => {
      state.chainId = action.payload;
    },
    setNetworkName: (state, action: PayloadAction<string>) => {
      state.networkName = action.payload;
    },
  },
});

export const {
  setWeb3Provider,
  resetWeb3Provider,
  setAddress,
  setChainId,
  setNetworkName,
} = walletSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.wallet.value)`
export const selectAddress = (state: RootState) => state.wallet.address;

export const initWallet = (): AppThunk => (dispatch) => {
  if (web3Modal && web3Modal.cachedProvider) {
    dispatch(connectWallet());
  }
};

export const subscribeProvider =
  (provider: any): AppThunk =>
  async (dispatch) => {
    if (!provider.on) {
      return;
    }
    provider.on("disconnect", () => dispatch(disconnectWallet()));
    provider.on("accountsChanged", async (accounts: string[]) => {
      if (!accounts.length) {
        return dispatch(disconnectWallet());
      }
      await dispatch(setAddress(accounts[0]));
    });
    provider.on("chainChanged", async (chainId: number) => {
      await dispatch(setChainId(chainId));
      const { name } = await new providers.Web3Provider(provider).getNetwork;
      await dispatch(setNetworkName(name));
    });
  };

export const connectWallet = (): AppThunk => async (dispatch) => {
  provider = await web3Modal.connect();

  // We plug the initial `provider` into ethers.js and get back
  // a Web3Provider. This will add on methods from ethers.js and
  // event listeners such as `.on()` will be different.
  const web3Provider = new providers.Web3Provider(provider);

  const signer = web3Provider.getSigner();
  const address = await signer.getAddress();

  const network = await web3Provider.getNetwork();
  const networkName = network.name;
  const chainId = network.chainId;

  dispatch(subscribeProvider(provider));
  // The value we return becomes the `fulfilled` action payload
  const data = {
    address,
    chainId,
    networkName,
  };
  dispatch(setWeb3Provider(data));

  return data;
};

export const disconnectWallet = (): AppThunk => async (dispatch) => {
  const provider = await web3Modal.cachedProvider;
  await web3Modal.clearCachedProvider();
  if (provider?.disconnect && typeof provider.disconnect === "function") {
    await provider.disconnect();
  }
  localStorage.removeItem(UTU_API_AUTH_TOKEN);
  dispatch(resetWeb3Provider());
};

export const connectApi = (): AppThunk => async (dispatch, getState) => {
  return addressSignatureVerification(process.env.REACT_APP_API_URL);
};

export const getUTUApiAccessToken = async () => {
  const utu_api_token = await localStorage.getItem(UTU_API_AUTH_TOKEN);
  if (!utu_api_token) return null;
  const { access_token } = JSON.parse(utu_api_token);
  return access_token;
};

export default walletSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { AppThunk, RootState } from "../store";
import Web3Modal from "web3modal";
import { providers } from "ethers";
import Web3 from "web3";
import axios from "axios";

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
let web3: any;

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
  address?: string | null;
  chainId?: number | null;
  networkId?: number | null;
}

const initialState: WalletState = {
  address: null,
  chainId: null,
  networkId: null,
};

export const initWeb3 = (provider: any) => {
  const web3: any = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
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
      state.networkId = action.payload.networkId;
    },
    resetWeb3Provider: (state) => {
      state.address = null;
      state.chainId = null;
      state.networkId = null;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setChainId: (state, action: PayloadAction<number>) => {
      state.chainId = action.payload;
    },
    setNetworkId: (state, action: PayloadAction<number>) => {
      state.networkId = action.payload;
    },
  },
});

export const {
  setWeb3Provider,
  resetWeb3Provider,
  setAddress,
  setChainId,
  setNetworkId,
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
      const networkId = await web3.eth.net.getId();
      await dispatch(setNetworkId(networkId));
    });
  };

export const connectWallet = (): AppThunk => async (dispatch) => {
  const provider = await web3Modal.connect();

  // We plug the initial `provider` into ethers.js and get back
  // a Web3Provider. This will add on methods from ethers.js and
  // event listeners such as `.on()` will be different.
  const web3Provider = new providers.Web3Provider(provider);

  const signer = web3Provider.getSigner();
  const address = await signer.getAddress();

  web3 = initWeb3(provider);
  const networkId = await web3.eth.net.getId();
  const chainId = await web3.eth.chainId();

  dispatch(subscribeProvider(provider));
  // The value we return becomes the `fulfilled` action payload
  const data = {
    address,
    chainId,
    networkId,
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

  dispatch(resetWeb3Provider());
};

export const connectApi = (): AppThunk => async (dispatch, getState) => {
  const { address } = getState().wallet;
  const signature = await web3.eth.personal.sign(
    web3.eth.accounts.hashMessage("utu-trust-api"),
    address
  );
  await axios.post(
    `${process.env.REACT_APP_API_URL}/identity-api/verify-address`,
    {
      address,
      signature,
    },
    {
      withCredentials: true,
    }
  );
};

export default walletSlice.reducer;

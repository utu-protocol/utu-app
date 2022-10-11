import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers, utils } from "ethers";
import Web3Modal from "web3modal";
import { AppThunk, RootState } from "../store";
// @ts-ignore
import { addressSignatureVerification } from "@ututrust/web-components";
import { CHAIN_ID } from "../../config";
import supportedChains from "../../lib/chains";


const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";
export const UTU_API_AUTH_TOKEN = "utu-identity-data";

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: INFURA_ID, // required
            rpc: {
                1: "https://mainnet.infura.io/v3/" + INFURA_ID,
                42: "https://kovan.infura.io/v3/" + INFURA_ID,
                137: "https://polygon-rpc.com",
                80001: "https://rpc-mumbai.maticvigil.com",
            },
        },
    },
};

let web3Modal: any;
let provider: any;
let currentChainId: number;

if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true,
        providerOptions, // required
    });
}

export interface WalletState {
    address?: string | null;
    connecting: boolean;
    authorizing: boolean;
    connected: boolean;
    chainId?: number | null;
    networkName?: string | null;
}

const initialState: WalletState = {
    address: null,
    chainId: null,
    connecting: false,
    authorizing: false,
    connected: false,
    networkName: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setWeb3Provider: (
      state,
      action: PayloadAction<{
        address?: string | null;
        chainId?: number | null;
        networkName?: string | null;
      }>
    ) => {
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
    setConnecting: (state, action: PayloadAction<boolean>) => {
      state.connecting = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
        state.connected = action.payload;
        if(action.payload){
            state.connecting = false;
        }
    },
    setAuthorizing: (state, action: PayloadAction<boolean>) => {
        state.authorizing = action.payload;
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
    setConnecting,
    setConnected,
    setAuthorizing,
} = walletSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.wallet.value)`
export const selectAddress = (state: RootState) => state.wallet.address;

export const selectConnectingState = (state: RootState) => state.wallet.connecting;

export const selectConnectedState = (state: RootState) => state.wallet.connected;

export const selectAuthorizingState = (state: RootState) => state.wallet.authorizing;

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
                // await localStorage.removeItem(UTU_API_AUTH_TOKEN);
                window.location.reload();
            });
            provider.on("chainChanged", async (chainId: number) => {
                currentChainId = chainId;
                await dispatch(setChainId(chainId));
                const {name} = await new providers.Web3Provider(provider).getNetwork();
                await dispatch(setNetworkName(name));
            });
        };

export const connectWallet = (): AppThunk => async (dispatch) => {
    provider = await web3Modal.connect();
    dispatch(setConnecting(true));
    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    
    const network = await web3Provider.getNetwork();
    const networkName = network.name;
    currentChainId = network.chainId;

    await switchNetwork();

    dispatch(subscribeProvider(provider));
    // The value we return becomes the `fulfilled` action payload
    const data = {
        address,
        chainId: currentChainId,
        networkName,
    };
    dispatch(setWeb3Provider(data));
    return data;
};

export const disconnectWallet = (): AppThunk => async (dispatch) => {
    dispatch(setConnecting(false));
    dispatch(setAuthorizing(false));
    const provider = await web3Modal.cachedProvider;
    await web3Modal.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
    }
    if (provider?.close && typeof provider.close === "function") {
        await provider.close();
    }
    await localStorage.removeItem('walletconnect');
    await localStorage.removeItem(UTU_API_AUTH_TOKEN);
    dispatch(resetWeb3Provider());
    window.location.reload();
};

export const connectApi = (): AppThunk => async (dispatch, getState) => {
    try{
        dispatch(setAuthorizing(true));
        await addressSignatureVerification(
          process.env.REACT_APP_API_URL,
          provider
        );
    }catch(e){
        
        throw e;
    }finally {
        dispatch(setAuthorizing(false));
    }
};

const requestNetworkChange = async (network: any) => {
    await provider.request({
        method: "wallet_switchEthereumChain",
        params: [
            {
                chainId: utils.hexStripZeros(utils.hexlify(network.chain_id)),
            },
        ],
    });
};

const addNetwork = async (network: any) => {
    await provider.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: utils.hexStripZeros(utils.hexlify(network?.chain_id)),
                chainName: network.name,
                nativeCurrency: network.native_currency,
                rpcUrls: [network.rpc_url],
            },
        ],
    });
};

export const getProvider = () => {
    return new providers.Web3Provider(provider);
}

export const switchNetwork = async () => {
    if (Number(currentChainId) === Number(CHAIN_ID)) {
        return;
    }
    // @ts-ignore
    const network = supportedChains.find(
        (chain) => chain.chain_id === Number(CHAIN_ID)
    );
    if (!network) return;
    try {
        await addNetwork(network);
        await requestNetworkChange(network);
    } catch (e: any) {
      console.log(e);
    }
};

export const getUTUApiAccessToken = async () => {
    const utu_api_token = await localStorage.getItem(UTU_API_AUTH_TOKEN);
    if (!utu_api_token) return null;
    const {access_token} = JSON.parse(utu_api_token);
    return access_token;
};

export default walletSlice.reducer;

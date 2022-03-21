import { ethers } from 'ethers'
import supportedChains from './chains'
import { IChainData } from './types'

export function getChainData(chainId?: number): IChainData | null {
  if (!chainId) {
    return null
  }
  const chainData = supportedChains.filter(
    (chain: any) => chain.chain_id === chainId
  )[0]

  if (!chainData) {
    return null
  }

  const API_KEY = '460f40a260564ac4a4f4b3fffb032dad'

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY)

    return {
      ...chainData,
      rpc_url: rpcUrl,
    }
  }

  return chainData
}

export function ellipseAddress(address = '', width = 4): string {
  if (!address) {
    return ''
  }
  const value = ethers.utils.getAddress(address);
  return `${value.slice(0, width)}...${value.slice(-width)}`
}

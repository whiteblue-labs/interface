import TokenContractData from '../contract/Token/data.json'
import SwapOneChainData from '../contract/SwapOneChain/data.json'
import SwapTwoChainData from '../contract/SwapTwoChain/data.json'

import {
  BASE_SWAP_SAME_CHAIN, ARB_SWAP_SAME_CHAIN,
  BASE_SWAP_CROSS_CHAIN, ARB_SWAP_CROSS_CHAIN,
} from '../constants/contracts'
import { ChainIds } from '../constants/network'

export const getTokenContract = (web3: any, address: string) => {
  return new web3.eth.Contract(
    TokenContractData.abi, address
  )
}

export const getSwapOneContract = (web3: any, chainID: number) => {
  if (chainID === ChainIds.ARB) {
    return new web3.eth.Contract(
      SwapOneChainData.abi, ARB_SWAP_SAME_CHAIN
    )
  }
  return new web3.eth.Contract(
    SwapOneChainData.abi, BASE_SWAP_SAME_CHAIN
  )
}

export const getSwapTwoContract = (web3: any, chainID: number) => {
  if (chainID === ChainIds.ARB) {
    return new web3.eth.Contract(
      SwapTwoChainData.abi, ARB_SWAP_CROSS_CHAIN
    )
  }

  return new web3.eth.Contract(
    SwapTwoChainData.abi, BASE_SWAP_CROSS_CHAIN
  )
}


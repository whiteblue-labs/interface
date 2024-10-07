import TokenContractData from '../contract/Token/data.json'
import SwapOneChainData from '../contract/SwapOneChain/data.json'
import SwapTwoChainData from '../contract/SwapTwoChain/data.json'
import FaucetTokenData from '../contract/FaucetToken/data.json'

import {
  BASE_EXCHANGE_ONE_ADDRESS, SEPOLIA_EXCHANGE_ONE_ADDRESS,
  BASE_EXCHANGE_TWO_ADDRESS, SEPOLIA_EXCHANGE_TWO_ADDRESS,
  MBC_FAUCET_ADDRESS, AGD_FAUCET_ADDRESS
} from '../constants/contracts'

export const getTokenContract = (web3: any, address: string) => {
  return new web3.eth.Contract(
    TokenContractData.abi, address
  )
}

export const getSwapOneContract = (web3: any, chainID: number) => {
  if (chainID === 8888) {
    return new web3.eth.Contract(
      SwapOneChainData.abi, SEPOLIA_EXCHANGE_ONE_ADDRESS
    )
  } else {
    return new web3.eth.Contract(
      SwapOneChainData.abi, BASE_EXCHANGE_ONE_ADDRESS
    )
  }
}

export const getSwapTwoContract = (web3: any, chainID: number) => {
  if (chainID === 8888) {
    return new web3.eth.Contract(
      SwapTwoChainData.abi, SEPOLIA_EXCHANGE_TWO_ADDRESS
    )
  } else {
    return new web3.eth.Contract(
      SwapTwoChainData.abi, BASE_EXCHANGE_TWO_ADDRESS
    )
  }
}

export const getFaucetContract = (web3: any, chainID: number) => {
  if (chainID === 8888) {
    return new web3.eth.Contract(
      FaucetTokenData.abi, AGD_FAUCET_ADDRESS
    )
  } else {
    return new web3.eth.Contract(
      FaucetTokenData.abi, MBC_FAUCET_ADDRESS
    )
  }
}

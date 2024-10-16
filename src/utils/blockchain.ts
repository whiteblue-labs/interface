import { IAsset } from '../state/user/userSlice'
import tokenData from '../contract/Token/data.json'
import { IUserState } from "../state/user/userSlice"
import { fixStringBalance } from "./string"
import { IToken } from "../state/app/appSlice"
import { BASE_SWAP_SAME_CHAIN, ARB_SWAP_SAME_CHAIN, ARB_SWAP_CROSS_CHAIN, BASE_SWAP_CROSS_CHAIN } from '../constants/contracts'
import {ChainIds, ChainsInfo} from "../constants/network";
import {ARB_EXPLORER, BASE_EXPLORER} from "../constants/host";

export const getBalanceToken = async (myWeb3: any, address: string, token: IToken) => {
    const tokenABI = tokenData.abi;
    const tokenContract = new myWeb3.eth.Contract(tokenABI, token.deployedAddress);
    let balance = await tokenContract.methods.balanceOf(address).call(
        {from: address}
    )
    const decimals = await tokenContract.methods.decimals().call({from: address})
    console.log(balance, decimals)
    balance = fixStringBalance(balance.toString(), Number(decimals))
    return {token, balance}
}

export const getBalanceAccount = async (myWeb3: any, userState: IUserState, tokenState: IToken[]) : Promise<IAsset[]> => {
    const tokensInMyNetwork = tokenState.filter((value) => value.network === userState.network)
    return Promise.all(tokensInMyNetwork.map((token: IToken) => getBalanceToken(myWeb3, userState.address, token)))
}

export const getTokenInOtherNetwork = (tokenState: IToken[], userState: IUserState) => {
    const tokenInNetwork = tokenState.filter((value) => value.network === userState.network)
    const tokenInOtherNetwork = tokenState.filter((value) => {
        if (tokenInNetwork.includes(value)) return false
        else return true
    })
    return tokenInOtherNetwork;
}


// ------------------ Mapping -------------------
export const mappingNetwork = (chainID: number) => {
    return ChainsInfo[chainID as ChainIds].name
}

export const mappingCurrency = (chainID: number) => {
    return "ETH";
}

// ------------------  -------------------
export const getAddressOneChainContract = (chainID: number) => {
    if (chainID === ChainIds.ARB) return ARB_SWAP_SAME_CHAIN
    return BASE_SWAP_SAME_CHAIN
}

export const getAddressTwoChainContract = (chainID: number) => {
    if (chainID === ChainIds.ARB) return ARB_SWAP_CROSS_CHAIN
    return BASE_SWAP_CROSS_CHAIN
}

export const getLinkExplore = (transactionID: string | undefined, chainID: number) => {
    if (chainID === ChainIds.ARB) return ARB_EXPLORER.concat(`/tx/${transactionID}`)
    return BASE_EXPLORER.concat(`/tx/${transactionID}`)
}



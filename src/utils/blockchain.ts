import { IAsset } from '../state/user/userSlice'
import tokenData from '../contract/Token/data.json'
import { IUserState } from "../state/user/userSlice"
import { fixStringBalance } from "./string"
import { IToken } from "../state/app/appSlice"
import { MBC_EXCHANGE_ONE_ADDRESS, AGD_EXCHANGE_ONE_ADDRESS, AGD_EXCHANGE_TWO_ADDRESS, MBC_EXCHANGE_TWO_ADDRESS } from '../constants/contracts'
import { AGD_EXPLORER, MBC_EXPLORER } from '../constants/host'

export const getBalanceToken = async (myWeb3: any, userState: IUserState, token: IToken) => {
    const tokenABI = tokenData.abi;
    const tokenContract = new myWeb3.eth.Contract(tokenABI, token.deployedAddress);
    let balance = await tokenContract.methods.balanceOf(userState.address).call(
        {from: userState.address}
    )
    const decimals = await tokenContract.methods.decimals().call({from: userState.address})


    balance = fixStringBalance(balance.toString(), Number(decimals))
    return {token, balance}
}

export const getBalanceAccount = async (myWeb3: any, userState: IUserState, tokenState: IToken[]) : Promise<IAsset[]> => {
    const tokensInMyNetwork = tokenState.filter((value) => value.network === userState.network)
    return Promise.all(tokensInMyNetwork.map((token: IToken) => getBalanceToken(myWeb3, userState, token)))
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
    if (chainID === 8888) return "AGD Network"
    else if (chainID === 4444) return "MBC Network"
}

export const mappingCurrency = (chainID: number) => {
    if (chainID === 4444) return "MBC"
    else if (chainID === 8888) return "AGD"
}

// ------------------  -------------------
export const getAddressOneChainContract = (chainID: number) => {
    if (chainID === 8888) return AGD_EXCHANGE_ONE_ADDRESS
    else if (chainID === 4444) return MBC_EXCHANGE_ONE_ADDRESS
}

export const getAddressTwoChainContract = (chainID: number) => {
    if (chainID === 8888) return AGD_EXCHANGE_TWO_ADDRESS
    else if (chainID === 4444) return MBC_EXCHANGE_TWO_ADDRESS
}

export const getLinkExplore = (transactionID: string | undefined, chainID: number) => {
    if (chainID === 8888) return AGD_EXPLORER.concat(`/tx/${transactionID}`)
    else if (chainID === 4444) return MBC_EXPLORER.concat(`/tx/${transactionID}`)
}



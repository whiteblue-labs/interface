import { toast } from "react-toastify";
import {ChainIds, ChainsInfo} from "../constants/network";

export const requestChangeNetwork = async (chainID: number, provider: any) => {
  alert(`Switch to ${ChainsInfo[chainID as ChainIds].name} to continue!`)
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x' + chainID.toString(16) }], // chainId must be in hexadecimal numbers
    });
  } catch (error : any) {
    toast.error(error.message);
  }
}




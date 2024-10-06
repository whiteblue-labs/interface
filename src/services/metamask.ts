import { toast } from "react-toastify";
import { mappingNetwork } from "../utils/blockchain";

export const requestChangeNetwork = async (chainID: number) => {
  alert(`Switch to ${mappingNetwork(chainID)} to continue!`)
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x' + chainID.toString(16) }], // chainId must be in hexadecimal numbers
    });
  } catch (error : any) {
    toast.error(error.message);
    if (error.code === 4001) return;
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x' + chainID.toString(16),
          chainName: mappingNetwork(chainID),
          rpcUrls: chainID === 4444 ? ["https://mbctest.vbchain.vn/VBCinternship2023"] :
              ["https://agridential.vbchain.vn/VBCinternship2023"],
          nativeCurrency : {
            name: chainID === 4444 ? "MBC" : "AGD",
            symbol: chainID === 4444 ? "MBC" : "AGD",
            decimals: 18
          }
        },
      ],
    });
  }
}




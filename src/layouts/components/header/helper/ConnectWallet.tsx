import {ConnectKitButton} from "connectkit";

const SIGN_MESSAGE = "Verify Account"
export const signatureLogin = async (web3: any, userAddress: string) : Promise<string> => {
    return await web3.eth.personal.sign(SIGN_MESSAGE, userAddress, "");
};

const ConnectWallet = () => {
    return <ConnectKitButton  />
};

export default ConnectWallet;

import {ConnectKitButton} from "connectkit";

const SIGN_MESSAGE = "Verify Account"
export const signatureLogin = async (web3: any, userAddress: string) : Promise<string> => {
    return await web3.eth.personal.sign(SIGN_MESSAGE, userAddress, "");
};

const ConnectWallet = () => {
    return <ConnectKitButton label={'0x2032C216cE3B726702E2E8E4b78Ef2aeCC4847D1'}  />
};

export default ConnectWallet;

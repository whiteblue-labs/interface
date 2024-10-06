import Web3 from "web3";
import { toast } from 'react-toastify'
import { Button, Popover } from "antd";
import { SafetyCertificateTwoTone } from "@ant-design/icons";

import PopoverUser from "./PopoverUser";
import { clearWeb3, saveWeb3 } from "../../../../state/app/appSlice";
import { IUserState, clearInfo, saveInfo } from "../../../../state/user/userSlice";
import { useAppSelector, useAppDispatch } from "../../../../state/hooks";
import { fixStringBalance, shortenAddress } from "../../../../utils/string";
import { getBalanceAccount, mappingNetwork } from "../../../../utils/blockchain";
import jwt_decode from "jwt-decode";
import appApi from "../../../../api/appAPI";
import store from  "../../../../state";
import { ConnectKitButton } from "connectkit";

const SIGN_MESSAGE = "Verify Account"
export const signatureLogin = async (web3: any, userAddress: string) : Promise<string> => {
    return await web3.eth.personal.sign(SIGN_MESSAGE, userAddress, "");
};

export const hdConnectWallet = async () => {
    const toastify = toast.loading("Connecting to wallet ..., sign message to confirm!")
    let storeData = store.getState();
    if (typeof window.ethereum !== "undefined") {
        const myWeb3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const address = (await myWeb3.eth.getAccounts())[0];
            const signature = await signatureLogin(myWeb3, address);
            const res = await appApi.login({
                address: address,
                signature: signature,
                message: "Verify Account",
            })
            const token_decode : any = (jwt_decode(res?.data.accessToken))
            const myUserState : IUserState = {
                address:  address,
                token: res?.data.accessToken,
                network: Number(await myWeb3.eth.net.getId()),
                wallet: [],
                balance:fixStringBalance(String(
                    await myWeb3.eth.getBalance(address)
                ), 18),
                isAuthenticated: true,
                signature: signature,
                createdAt: res?.data.user.createdAt,
                expiredTime: new Date(token_decode.exp * 1000)
            }
            myUserState.wallet = await getBalanceAccount(myWeb3, myUserState, storeData.appState.tokens)
            if (!storeData.appState.isListening) {
                window.ethereum.on("accountsChanged", () =>  hdAccountChange())
                window.ethereum.on("chainChanged", () => hdNetworkChange())
            }
            store.dispatch(saveInfo(myUserState));
            store.dispatch(saveWeb3(myWeb3));

            toast.update(toastify, { render: "Connect wallet successfully!", type: "success", isLoading: false, autoClose: 1000});
        } catch (error) {
            toast.update(toastify, { render: "Connect wallet failed, see detail in console.", type: "error", isLoading: false, autoClose: 1000});
            console.log(error)
        }
    } else {
        alert("MetaMask is not installed.");
    }
}
const hdAccountChange = async () => {
    let storeData = store.getState();
    if (!storeData.appState.isListening) return;
    const toastify = toast.loading("Account changed, sign message to continue...")
    try {
    const myWeb3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const address = (await myWeb3.eth.getAccounts())[0];
    const signature = await signatureLogin(myWeb3, address);
        const res = await appApi.login({
            address: address,
            signature: signature,
            message: "Verify Account",
        })
        const token_decode : any = (jwt_decode(res?.data.accessToken))
        const myUserState : IUserState = {
            address: address,
            token: res?.data.accessToken,
            network: Number(await myWeb3.eth.net.getId()),
            wallet: [],
            balance:fixStringBalance(String(
                await myWeb3.eth.getBalance(address)
            ), 18),
            isAuthenticated: true,
            signature: signature,
            createdAt: res?.data.user.createdAt,
            expiredTime: new Date(token_decode.exp * 1000)
        }
        myUserState.wallet = await getBalanceAccount(myWeb3, myUserState, storeData.appState.tokens)
        store.dispatch(saveInfo(myUserState));
        store.dispatch(saveWeb3(myWeb3));
        toast.update(toastify, { render: "Change account successfully!", type: "success", isLoading: false, autoClose: 1000});
    } catch (error) {
        toast.update(toastify, { render: "Change account failed", type: "error", isLoading: false, autoClose: 1000});
        alert(error);
    }
}
const hdNetworkChange = async () => {
    let storeData = store.getState();
    if (!storeData.appState.isConnectedWallet) return;
    const toastify = toast.loading("Network changed, please wait a moment...")
    const myWeb3 = new Web3(window.ethereum);
    const address = (await myWeb3.eth.getAccounts())[0];
    const myUserState : IUserState = {
        address:  address,
        token: storeData.userState.token,
        network: Number(await myWeb3.eth.net.getId()),
        wallet: [],
        balance:fixStringBalance(String(
            await myWeb3.eth.getBalance(address)
        ), 18),
        isAuthenticated: true,
        signature: storeData.userState.signature,
        createdAt: storeData.userState.createdAt,
        expiredTime: storeData.userState.expiredTime
    }
    myUserState.wallet = await getBalanceAccount(myWeb3, myUserState, storeData.appState.tokens)
    store.dispatch(saveInfo(myUserState));
    store.dispatch(saveWeb3(myWeb3));
    toast.update(toastify, { render: "Change network successful!", type: "success", isLoading: false, autoClose: 1000});
}

const ConnectWallet = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.userState);
    const appState = useAppSelector((state) => state.appState);
    
    if (appState.isConnectedWallet) {
        return (
            <Popover
                content={<PopoverUser onClickLogout = {() => {
                    dispatch(clearInfo());
                    dispatch(clearWeb3());
                    window.ethereum.removeListener('accountsChanged', hdAccountChange);
                    window.ethereum.removeListener('chainChanged', hdNetworkChange);
                }}/>}
                placement={"bottomRight"}
            >
                <div className="header-popover--container">
                    <div className="network">
                        <SafetyCertificateTwoTone
                            rev={""}
                            size={10}
                            className="network-icon"
                        />
                        <p className="network-name">{mappingNetwork(userState.network)}</p>
                    </div>
                    <Button type="primary" className="btn-connect_wallet">
                        {shortenAddress(userState.address)}
                    </Button>
                </div>
            </Popover>
        );
    } else {
        return <ConnectKitButton  />
    }

};

export default ConnectWallet;

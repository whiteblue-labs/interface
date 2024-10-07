import React, {useEffect} from "react";
import {toast} from "react-toastify";
import RouterList from "./router";
import store from "./state/index";
import AppLayout from "./layouts";
import 'react-toastify/dist/ReactToastify.css';
import LoadingPage from "./components/app/LoadingPage";
import ModalPage from "./components/app/ModalPage";
import {closeTaskModel, doneOneTask, updateTask} from "./state/task/taskSlice";
import {useAccount, useConnect, useDisconnect} from "wagmi";
import {ConnectKitProvider} from "connectkit";
import Web3 from "web3";
import appApi from "./api/appAPI";
import jwt_decode from "jwt-decode";
import {IUserState, saveInfo} from "./state/user/userSlice";
import {fixStringBalance} from "./utils/string";
import {getBalanceAccount} from "./utils/blockchain";
import {saveTokens, saveWeb3} from "./state/app/appSlice";
import {signatureLogin} from "./layouts/components/header/helper/ConnectWallet";

function App() {
  const { connectors   } = useConnect();
  const { isConnected, connector } = useAccount()
  const { disconnect } = useDisconnect()

  const handleOnConnect = async (address?: string, connectorId?: string) => {
    const connector = connectors.find(item => item.id === connectorId);
    if (!connector || !address) return;
    let storeData = store.getState();
    const toastify = toast.loading("Connecting to wallet ..., sign message to confirm!")
    const provider: any = await connector.getProvider();
    const myWeb3 = new Web3(provider);
    try {
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
      store.dispatch(saveInfo(myUserState));
      store.dispatch(saveWeb3(myWeb3));
      toast.update(toastify, { render: "Connect wallet successfully!", type: "success", isLoading: false, autoClose: 1000});
    } catch (error) {
      toast.update(toastify, { render: "Connect wallet failed, see detail in console.", type: "error", isLoading: false, autoClose: 1000});
      disconnect()
      console.log(error)
    }
  }


  const initWeb3 = async () => {
    if (isConnected) {
      const provider: any = await connector?.getProvider();
      console.log(provider)
      const myWeb3 = new Web3(provider);
      store.dispatch(saveWeb3(myWeb3));
    }
  }


  useEffect(() => {
    store.dispatch(closeTaskModel())
    const myTasks = store.getState().taskState.taskList
    for (let i = 0; i < myTasks.length; i++) {
      if (![3, -1,-2].includes(myTasks[myTasks.length - i -1].status)) {
        store.dispatch(updateTask({
          id: myTasks.length - i -1,
          task: {...myTasks[myTasks.length - i -1], status: myTasks[myTasks.length - i -1].status === 1 ? -1 : -2 }}))
        store.dispatch(doneOneTask())
        }
      else {
        break
      }
    }
    appApi.getTokens().then(res => {
      store.dispatch(saveTokens(res.data))
      console.log(res.data)
    })
  }, [])

  useEffect(() => {
    initWeb3()
  }, [connector])

  return (
    <ConnectKitProvider
      theme={'nouns'}
      onConnect={({address, connectorId}) => handleOnConnect(address, connectorId)}
    >
      <LoadingPage />
      <ModalPage />
      <AppLayout>
        <RouterList />
      </AppLayout>
    </ConnectKitProvider>
  );
}

export default App;

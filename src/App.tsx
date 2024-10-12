import React, {useEffect} from "react";
import {toast} from "react-toastify";
import RouterList from "./router";
import store from "./state/index";
import AppLayout from "./layouts";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "./components/app/LoadingPage";
import ModalPage from "./components/app/ModalPage";
import {closeTaskModel, doneOneTask, updateTask,} from "./state/task/taskSlice";
import {useAccount, useChainId, useDisconnect, useSignMessage,} from "wagmi";
import {ConnectKitProvider} from "connectkit";
import Web3 from "web3";
import appApi from "./api/appAPI";
import jwt_decode from "jwt-decode";
import {IUserState, saveInfo} from "./state/user/userSlice";
import {fixStringBalance} from "./utils/string";
import {getBalanceAccount} from "./utils/blockchain";
import {saveTokens, saveWeb3} from "./state/app/appSlice";
import {useAppDispatch, useAppSelector} from "./state/hooks";

function App() {
  const { isConnected, connector, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const chainId = useChainId();

  const storeData = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const isLoggedIn = storeData.userState.isAuthenticated;

  const handleOnConnect = async () => {
    if (!connector) return;

    const provider: any = await connector.getProvider();
    const myWeb3 = new Web3(provider);
    dispatch(saveWeb3(myWeb3));

    if (true) {
      const toastify = toast.loading(
        "Connecting to wallet ..., sign message to confirm!",
      );
      try {
        const signature = await signMessageAsync({ message: "Verify Account" });
        const res = await appApi.login({
          address: address,
          signature: signature,
          message: "Verify Account",
        });
        const token_decode: any = jwt_decode(res?.data.accessToken);
        const myUserState: IUserState = {
          address: address as string,
          token: res?.data.accessToken,
          network: Number(await myWeb3.eth.net.getId()),
          wallet: [],
          balance: fixStringBalance(
            String(await myWeb3.eth.getBalance(address as string)),
            18,
          ),
          isAuthenticated: true,
          signature: signature,
          createdAt: res?.data.user.createdAt,
          expiredTime: new Date(token_decode.exp * 1000),
        };

        myUserState.wallet = await getBalanceAccount(
          myWeb3,
          myUserState,
          storeData.appState.tokens,
        );

        dispatch(saveInfo(myUserState));
        toast.update(toastify, {
          render: "Connect wallet successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
    } catch (error) {
      toast.update(toastify, {
        render: "Connect wallet failed, see detail in console.",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
      disconnect();
    }
  }
  };

  const handleChainChange = async () => {
    if (isLoggedIn && connector) {
      const myUserState = {...storeData.userState};
      const provider: any = await connector.getProvider();
      const myWeb3 = new Web3(provider);
      myUserState.network = Number(chainId);
      myUserState.wallet = await getBalanceAccount(
        myWeb3,
        myUserState,
        storeData.appState.tokens,
      );
      dispatch(saveInfo(myUserState));
    }
  };

  useEffect(() => {
    if (isConnected && connector) {
      handleOnConnect();
    }
  }, [isConnected, connector]);

  useEffect(() => {
    handleChainChange();
  }, [chainId]);

  //
  // const initWeb3 = async () => {
  //   if (isConnected) {
  //     const provider: any = await connector?.getProvider();
  //     console.log(provider);
  //     const myWeb3 = new Web3(provider);
  //     store.dispatch(saveWeb3(myWeb3));
  //   }
  // };
  //
  useEffect(() => {
    store.dispatch(closeTaskModel());
    const myTasks = store.getState().taskState.taskList;
    for (let i = 0; i < myTasks.length; i++) {
      if (![3, -1, -2].includes(myTasks[myTasks.length - i - 1].status)) {
        store.dispatch(
          updateTask({
            id: myTasks.length - i - 1,
            task: {
              ...myTasks[myTasks.length - i - 1],
              status: myTasks[myTasks.length - i - 1].status === 1 ? -1 : -2,
            },
          }),
        );
        store.dispatch(doneOneTask());
      } else {
        break;
      }
    }
    appApi.getTokens().then((res) => {
      store.dispatch(saveTokens(res.data));
      console.log(res.data);
    });
  }, []);

  return (
    <ConnectKitProvider theme={"nouns"}>
      <LoadingPage />
      <ModalPage />
      <AppLayout>
        <RouterList />
      </AppLayout>
    </ConnectKitProvider>
  );
}

export default App;

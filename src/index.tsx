import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import store, { persistor } from "./state";
import { PersistGate } from "redux-persist/lib/integration/react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "./translation";
import {cookieStorage, createConfig, createStorage, http, WagmiProvider} from "wagmi";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";
import {arbitrum, base} from "viem/chains";
import {getDefaultConfig} from "connectkit";
import { coinbaseWallet } from "wagmi/connectors";
import { injected } from "wagmi/connectors";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const queryClient = new QueryClient();

const config = createConfig(
  getDefaultConfig({
    chains: [base, arbitrum],
    transports: {
      [base.id]: http(),
      [arbitrum.id]: http(),
    },
    connectors: [
      injected(),
      coinbaseWallet({
        appName: 'Create Wagmi',
        preference: 'smartWalletOnly',
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    walletConnectProjectId: '',
    appName: "WhiteBlueSwap",
  }),
);


root.render(<Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </WagmiProvider>
        </I18nextProvider>
      </BrowserRouter>
    </PersistGate>
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

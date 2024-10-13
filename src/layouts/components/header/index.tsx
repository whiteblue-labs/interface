import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState} from "react";
import { useTranslation } from "react-i18next";
import { FloatButton} from "antd";
import clsx from "clsx";
import { base } from 'viem/chains';

import Logo from "../../../assets/svg/big_logo.svg";
import ConnectWallet from "./helper/ConnectWallet";
import SITEMAP from "../../../constants/sitemap";
import "./Header.scss";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import SidebarMobile from "./helper/SidebarMobile";
import {useAppSelector} from "../../../state/hooks";
const Header = () => {
  const currentUrl = useLocation().pathname;

  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const appState = useAppSelector((state) => state.appState);

  const [headerShow, setheaderShow] = useState(false);

  window.onscroll = function () {
    if (!headerShow && window.scrollY >= 60) {
      setheaderShow(true);
    } else if (headerShow && window.scrollY < 60) {
      setheaderShow(false);
    }
  };

  return (
    <>
      <div
        className={clsx("app-header", {
          "app-header--shadow": headerShow,
        })}
      >
        <div className="app-header--pane">
          <div style={{ display: "flex", flexDirection: "row", flex: 1 }} >
            <SidebarMobile />
            <img
              src={Logo}
              alt="WhiteBlueSwap"
              className="app-logo"
              onClick={() => navigate("/")}
            />
            {
              appState.isConnectedWallet &&
              <div className="app-header--option">
                {SITEMAP.map((item, idx) => (
                  <div key={idx}>
                    <Link
                      to={item.path}
                      style={{padding: '20px 0 20px 0'}}
                      className={clsx({ tabFocus: currentUrl === item.path })}
                    >
                      {t(item.key)}
                    </Link>
                  </div>
                ))}
              </div>
            }
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            className="gotoTop"
          >
            <ConnectWallet />
            {
              (headerShow && currentUrl === "/") &&
              <FloatButton style={{right: 80}} icon={<VerticalAlignTopOutlined rev={""} />} 
                onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

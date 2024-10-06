import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState} from "react";
import { useTranslation } from "react-i18next";
import { FloatButton} from "antd";
import clsx from "clsx";

import Logo from "../../../assets/svg/logo_loyal-chain.svg";
import ConnectWallet from "./helper/ConnectWallet";
import SITEMAP from "../../../constants/sitemap";
import "./Header.scss";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import SidebarMobile from "./helper/SidebarMobile";
const Header = () => {
  const currentUrl = useLocation().pathname;
  const { t } = useTranslation("common");
  const navigate = useNavigate();

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
          <div style={{ display: "flex", flexDirection: "row" }} >
            <SidebarMobile />
            <img
              src={Logo}
              alt="WhiteBlueSwap"
              className="app-logo"
              onClick={() => navigate("/")}
            />
            {/*<div className="app-header--option">*/}
            {/*  {SITEMAP.map((item, idx) => (*/}
            {/*    <div key={idx}>*/}
            {/*      <Link*/}
            {/*        to={item.path}*/}
            {/*        style={{padding: '20px 0 20px 0'}}*/}
            {/*        className={clsx({ tabFocus: currentUrl === item.path })}*/}
            {/*      >*/}
            {/*        {t(item.key)}*/}
            {/*      </Link>*/}
            {/*    </div>*/}
            {/*  ))}*/}
            {/*</div>*/}
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

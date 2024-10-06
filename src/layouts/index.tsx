import { useEffect } from "react";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "tsparticles-engine";

import Header from "./components/header";
import Footer from "./components/footer/Footer";
import { LayoutProps } from "../types/route";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { saveTokens } from "../state/app/appSlice";
import { Empty, FloatButton, Popconfirm, Popover } from 'antd';

import appApi from "../api/appAPI";
import { CheckCircleTwoTone, ClearOutlined, CloseCircleTwoTone, LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import { ITask, clearTask, openTaskModel } from "../state/task/taskSlice";
import PairToken from "../components/app/PairToken";
import { hdConnectWallet } from "./components/header/helper/ConnectWallet";
import store from "../state";
const Layout = ({ children }: LayoutProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
    },
    []
  );

  const taskState = useAppSelector((state) => state.taskState);
  const userState = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Get info about all tokens in system.
    async function fetchTokens() {
      const tokens = await appApi.getTokens();
      if (tokens){
        dispatch(saveTokens(tokens.data));
      }

      let storeData = store.getState();

      if (new Date(storeData.userState.expiredTime) > new Date()) {
        if (window.ethereum) {
          window.ethereum._metamask.isUnlocked().then(async (res: any) => {
              res && await hdConnectWallet()
          })
        }
      }
    }
    // Clear modal in application
    fetchTokens()

  }, [])    
  

  const getTitleTask = (type: string)  => {
    switch (type) {
      case "TRANSFER":
        return "Transfer Token";
      case "ACCEPT":
        return "Accept Order";
      case "CREATE":
        return "Create Order";
      case "SELLER-CREATE":
        return "Create Order";
      case "REMOVE":
        return "Remove Order"
      case "SELLER-REMOVE":
        return "Remove Order";
      case "BUYER-DEPOSIT":
          return "Deposit Token"
      case "SELLER-DEPOSIT":
          return "Deposit Token"
      case "SELLER-WITHDRAW":
          return "Withdraw Token"
      case "BUYER-WITHDRAW":
          return "Withdraw Token"
      case "REFUND":
          return "Refund Token"
      default:
        return "Task";
    }
  }

  const getAddress = (task: ITask, type: string) => {
        switch (type) {
      case "TRANSFER":
        return task.from.address
      case "ACCEPT":
        return task.to?.address
      case "CREATE":
        return task.from.address
      case "SELLER-CREATE":
        return task.to?.address
      case "REMOVE":
        return task.from.address
      case "SELLER-REMOVE":
        return task.from.address
      case "BUYER-DEPOSIT":
          return task.to?.address
      case "SELLER-DEPOSIT":
          return task.from.address
      case "SELLER-WITHDRAW":
          return  task.from.address
      case "BUYER-WITHDRAW":
          return task.to?.address
      case "REFUND":
          return task.from.address || task.to?.address
      default:
        return 
    }
  }

  const contentTaskPopover = () => {
    return (
      <div className="task-manage">
        {
          taskState.taskList.length === 0 ?
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
          taskState.taskList.slice(0).reverse().map((task, index) => {
            return (
              <div key={index} style={{ 
                display:'flex', flexDirection:'row', alignItems:"center", 
                padding: "5px 20px",   margin: "5px 0", borderRadius: 3, 
                backgroundColor: 'rgba(219, 219, 219, 0.5)'}}
                onClick={() => dispatch(openTaskModel(taskState.taskList.length - index - 1))}
              >
                <div style={{margin: "0 16px 0 -10px"}}>
                  {
                      (task.status === 1 || task.status === 2 || task.status === 0) ?
                        <LoadingOutlined rev={""} style={{fontSize: '2.5rem', color:"var(--color-secondary)"}}/>
                      :
                      (
                        task.status === 3 ? <CheckCircleTwoTone twoToneColor="#52c41a" rev={""} style={{fontSize: '2.5rem'}}/> 
                        : <CloseCircleTwoTone twoToneColor={"rgba(252, 75, 75, 1)"} rev={""} style={{fontSize: '2.5rem'}}/>
                      )
                  }
                </div>
                <div>
                  <p style={{fontSize: '1.4rem', fontWeight: 500}}>
                  {
                   getTitleTask(task.type)
                  }
                  </p>
                  <p style={{fontSize: '1.2rem'}}>Task ID: #0{task.id}
                    <span style={{marginLeft: 10}}>Account: {
                      getAddress(task, task.type)?.slice(0, 5) +'...' + getAddress(task, task.type)?.slice(-10)
                    }</span>
                  </p>
                </div>
                
                <div style={{marginLeft: 'auto'}}>
                  {
                    task.type === "TRANSFER" ? 
                      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <p style={{fontWeight: 500, marginRight: 10}}>{task.from.amount} {task.from.token.symbol}</p>
                        <img src={task.from.token ? task.from.token.image : 'token'} alt={""} style={{height: 30}}/>
                      </div>
                    :
                      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <p style={{fontWeight: 500, marginRight: -10}}>{task.from.amount} {task.from.token.symbol}</p>
                        <PairToken from_img={task.from.token.image} to_img={task.to?.token.image} width={30}/>
                        <p style={{fontWeight: 500, marginLeft: -10}}>{task.to?.amount} {task.to?.token.symbol}</p>
                    </div>
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  
  return (
    <>
      <div className="gradient"></div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={toptions}
      />
      <Header />
      <div style={{ height: "var(--header-height)" }}></div>
      <div style={{margin: "30px var(--app-margin) 0 var(--app-margin)" }}>
        {children}
      </div>


      <Popover placement="leftBottom" title={
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
          <p>Your task</p>

          <div onClick={() => {}}>
            <Popconfirm
              title="Delete all task"
              description="Are you sure to delete all task?"
              onConfirm={() => dispatch(clearTask())}
              okText="Yes"
            >
              <ClearOutlined rev={""} style={{marginRight: 20, padding: 4, cursor:'pointer'}}/>
            </Popconfirm>
          </div>
        </div>
      } content={contentTaskPopover} trigger="click">
        <FloatButton shape="square" className="btn-task" icon={
          // <LoadingOutlined rev={""} style={{fontSize: '2.5rem', color:"var(--color-secondary)"}}/>
          taskState.tasksInProgress !== 0 &&
          <SyncOutlined spin rev={""}/>
        }/>
      </Popover>

      {/*<Footer />*/}
    </>
  );
};


const toptions: ISourceOptions = {
  name: "Polygon Mask",
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onDiv: {
        elementId: "repulse-div",
        enable: false,
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: "bubble",
        parallax: {
          enable: false,
          force: 2,
          smooth: 10,
        },
      },
    },
    modes: {
      bubble: {
        distance: 40,
        duration: 2,
        opacity: 8,
        size: 6,
      },
      connect: {
        distance: 80,
        links: {
          opacity: 0.5,
        },
        radius: 60,
      },
      grab: {
        distance: 400,
        links: {
          opacity: 1,
        },
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      slow: {
        active: false,
        radius: 0,
        factor: 1,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      blink: false,
      color: "#ffffff",
      consent: false,
      distance: 30,
      enable: true,
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      outModes: "bounce",
      speed: 1,
    },
    number: {
      limit: 0,
      value: 200,
    },
    opacity: {
      animation: {
        enable: true,
        speed: 2,
        sync: false,
      },
      value: {
        min: 0.05,
        max: 0.4,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: 1,
    },
  },
  polygon: {
    draw: {
      enable: true,
      lineColor: "rgba(255,255,255,0.2)",
      lineWidth: 1,
    },
    enable: true,
    move: {
      radius: 10,
    },
    position: {
      x: 50,
      y: 50,
    },
    inline: {
      arrangement: "equidistant",
    },
    scale: 0.5,
    type: "inline",
    url: "https://particles.js.org/images/smalldeer.svg",
  },
};
export default Layout;

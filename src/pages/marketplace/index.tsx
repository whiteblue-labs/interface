import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

import "./Marketplace.scss";
import appApi from "../../api/appAPI";
import Order from "../../components/marketplace/Order";
import SelectToken from "../../components/app/SelectToken";
import TableOrder from "../../components/marketplace/TableOrder";
import MarketPane from "../../components/marketplace/MarketPane";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import StatisticItem from "../../components/marketplace/StatisticItem";
import FilterDrawer from "./filterDrawer/FilterDrawer";

export interface IFilterData {
  network: number,
  from: any,
  to: any,
  amountFrom: [number, number],
  amountTo: [number, number],
  page: number;
}

const filterRawData: IFilterData = {
  network: -1,
  from: "",
  to: "",
  amountFrom: [0, 10000],
  amountTo: [0, 10000],
  page: 1,
};
const titleStatistic = [
  {
    title: "Total Transaction",
    note: ""
  },
  {
    title: "Transaction",
    note: "24h"
  },
  {
    title: "Amount Order",
    note: "now"
  }
]

const Marketplace = () => {
  const [isListMode, setIsListMode] = useState(false);
  const [data, setData] = useState([])
  const [statis, setStatic] = useState([0, 0, 0])
  const [selectState, setSelectState] = useState({
    selectFrom: false,
    selectTo: false
  });
  const [filter, setFilter] = useState({
    open: false,
    isFilterMode: true,
    filterData: filterRawData,
  });
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(true)

  const appState = useAppSelector((state) => state.appState)
  const userState = useAppSelector((state) => state.userState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFilterOrder = async () => {
      setLoading(true)
      const filterData = {
        fromTokenId: filter.filterData.from !== '' ? filter.filterData.from._id : null,
        toTokenId: filter.filterData.to !== '' ? filter.filterData.to._id : null,
        fromValueUp: filter.filterData.amountFrom[1],
        fromValueDown: filter.filterData.amountFrom[0],
        toValueUp: filter.filterData.amountTo[1],
        toValueDown: filter.filterData.amountTo[0],
        network: filter.filterData.network === -1 ? null : filter.filterData.network,
        page: filter.filterData.page,
      }
      const res = await appApi.getOrdersWithFilter({...filterData})
      if (res) {
        if (res.data.length < 12) {
          setData(res.data)
          setNextPage(false)
        } else if (res.data.length === 0) {
          setNextPage(false)
        } else if (res.data.length === 12) {
          setData(res.data)
          setNextPage(true)
        }
        setLoading(false)
      }
    }
    const fetchStatic = async () => {
      const res = await appApi.getStatisApp()
      if (res) setStatic([res.data.total, res.data.total24h, res.data.totalNow])
    }

    fetchStatic()
    fetchFilterOrder()
  }, [filter.filterData, userState.wallet, userState.balance])


  const toggleModeView = () => {
    setIsListMode(!isListMode)
  };
  const openFilter = () => {
    setFilter({
      open: true,
      isFilterMode: true,
      filterData: filter.filterData,
    });
  };
  const hdClickClearFilter = () => {
    setFilter({...filter, filterData: filterRawData});
  };

  const closeSelectToken = () => {
    setSelectState({selectFrom: false, selectTo: false})
  };

  const setFilterNetwork = (network: number) => {
    setFilter({...filter, filterData: {...filter.filterData, network, page: 1}});
  }

  const handleClickCreateOrder = () => {
    if (appState.isConnectedWallet) {


    }

  }

  return (
    <div className="app-market">
      <FilterDrawer
        filter={filter}
        setFilter={setFilter}
        setFilterNetwork={setFilterNetwork}
        clearFilter={hdClickClearFilter}
        selectState={selectState}
        setSelectState={setSelectState}
      />

      <div className="header">
        <div className="statistic-list">
          {
            statis.map((value, index) => (
              <StatisticItem title={titleStatistic[index].title} note={titleStatistic[index].note}
                             value={Number(value) * 100}/>
            ))
          }
        </div>

        <div className="market-btn-container">
          <Button
            onClick={() => navigate('marketplace/create')} type='primary' size={'large'}>
            Create Order
          </Button>
        </div>
      </div>

      <MarketPane
        isListMode={isListMode}
        toggleModeView={toggleModeView}
        openFilter={openFilter}
        funcSwapTo={() => setSelectState({selectFrom: false, selectTo: true})}
        funcSwapFrom={() => setSelectState({selectFrom: true, selectTo: false})}
        funcClearFilter={hdClickClearFilter}
        funcNetwork={setFilterNetwork}
        funcChangePage={(page: number) => setFilter({...filter, filterData: {...filter.filterData, page}})}
        dataFilter={filter.filterData}
        nextpage={nextPage}
        loading={loading}
      />

      {isListMode ? (
        <TableOrder data={data}/>
      ) : (
        <div className="grid-order">
          {
            loading ?
              Array(12).fill(0).map(value => (
                <Order data={{}} skeleton/>
              )) :
              data.map((item, index) =>
                <Order data={item}/>
              )
          }
        </div>
      )}

      {((selectState.selectFrom || selectState.selectTo) && !filter.open) && (
        <div>
          <SelectToken
            closeFunction={closeSelectToken}
            top_css="calc((100vh - 600px) / 2 - 20px)"
            onClickSelect={(token) => {
              if (selectState.selectFrom) {
                if (appState.isConnectedWallet) {
                  setFilter({...filter, filterData: {...filter.filterData, from: token.token, page: 1}});
                } else {
                  setFilter({...filter, filterData: {...filter.filterData, from: token, page: 1}});
                }
              } else {
                if (appState.isConnectedWallet) {
                  setFilter({...filter, filterData: {...filter.filterData, to: token.token, page: 1}});
                } else {
                  setFilter({...filter, filterData: {...filter.filterData, to: token, page: 1}});
                }
              }
              setSelectState({selectFrom: false, selectTo: false});
            }}
            isCheckNetwork={false}
          />
        </div>
      )}
    </div>
  )
};

export default Marketplace;

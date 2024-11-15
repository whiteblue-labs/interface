import {Button, Tooltip} from "antd";
import {AppstoreOutlined, BarsOutlined, ClearOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import "./MarketPane.scss";
import {IFilterData} from "../../../pages/marketplace";
import {ChainIds, ChainsInfo} from "../../../constants/network";

interface IMarketPaneProps {
  isListMode: boolean;
  openFilter: () => void;
  dataFilter: IFilterData;
  toggleModeView: () => void;
  funcNetwork: (network: number) => void;
  funcSwapTo?: () => void;
  funcSwapFrom?: () => void;
  funcClearFilter?: () => void;
  funcChangePage: (page: number) => void;
  nextpage?: boolean;
  loading? : boolean;
}

const MarketPane = (props: IMarketPaneProps) => {
  return (
    <div className="app-market--pane">
      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <Button
          type="primary"
          size="large"
          onClick={() => props.openFilter()}
        >
          All Filters
        </Button>
        <div>
          <Button style={{margin: 0, borderRadius: 0, borderTopLeftRadius: 6, borderBottomLeftRadius: 6,
            backgroundColor: props.dataFilter.network === ChainIds.TAIKO ? 'rgba(21, 191, 253, 0.5)' : 'white' }}
                  onClick={() => {
                    if (props.dataFilter.network === ChainIds.TAIKO)
                      props.funcNetwork(-1)
                    else props.funcNetwork(ChainIds.TAIKO)
                  }}>
            {ChainsInfo[ChainIds.TAIKO].name}
          </Button>
          <Button style={{margin: 0, borderRadius: 0,
            backgroundColor: props.dataFilter.network === ChainIds.BASE ? 'rgba(21, 191, 253, 0.5)' : 'white' }}
            onClick={() => {
              if (props.dataFilter.network === ChainIds.BASE)
                props.funcNetwork(-1)
              else props.funcNetwork(ChainIds.BASE)
            }}>
            {ChainsInfo[ChainIds.BASE].name}
          </Button>

          <Button style={{margin: 0, borderRadius: 0,  borderTopRightRadius: 6, borderBottomRightRadius: 6,
            backgroundColor: props.dataFilter.network === ChainIds.ARB ? 'rgba(21, 191, 253, 0.5)' : 'white' }}
            onClick={() => {
              if (props.dataFilter.network === ChainIds.ARB)
                props.funcNetwork(-1)
              else props.funcNetwork(ChainIds.ARB)
            }}
          >
            {ChainsInfo[ChainIds.ARB].name}
          </Button>
        </div>
        <Button type="primary" size="middle" onClick={props.funcSwapFrom} >
          {
            props.dataFilter.from !== '' ?
            <div style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
              <img src={props.dataFilter.from.image} alt="token" style={{height: 20, marginRight: 10}}/>
              <p>{props.dataFilter.from.symbol}</p>
            </div>
            :
            'Swap From'
          }
        </Button>
        <Button type="primary" size="middle"  onClick={props.funcSwapTo}>
          {
            props.dataFilter.to !== '' ?
            <div style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
              <img src={props.dataFilter.to.image} alt="token" style={{height: 20, marginRight: 10}}/>
              <p>{props.dataFilter.to.symbol}</p>
            </div>
            :
            'Swap To'
          }
        </Button>

        <div className="icon-clearfilter" onClick={props.funcClearFilter}>
          <ClearOutlined rev={""}/>
        </div>

      </div>

      <div style={{display: 'flex', flexDirection:"row", alignItems:'center'}}>
        <div className="pagination-container">
          <Tooltip placement="bottom" title={props.dataFilter.page > 1 ? "Previous page" : "This is end."}>
            <LeftOutlined rev={""} className="pagination-btn"  style= {{fontSize: '1.8rem'}}
              onClick={() => props.dataFilter.page  > 1 && !props.loading && props.funcChangePage(Number(props.dataFilter.page - 1))}
            />
          </Tooltip>
          <div className="pagination-current"> {props.dataFilter.page} </div>
          <Tooltip placement="bottom" title={ props.nextpage ? "Next page" : "This is end."}>
            <RightOutlined rev={""} className="pagination-btn" style= {{fontSize: '1.8rem'}}
              onClick={() => {props.nextpage  && !props.loading && props.funcChangePage(Number(props.dataFilter.page + 1))}}/>
          </Tooltip>
        </div>
        <Tooltip placement="bottom" title={"View list"}>
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              if (props.isListMode) props.toggleModeView();
            }}
          >
            <AppstoreOutlined rev={""} />
          </Button>
        </Tooltip>
        <Tooltip placement="bottom" title={"View grid"}>
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              if (!props.isListMode) props.toggleModeView();
            }}
          >
            <BarsOutlined rev={""} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default MarketPane;

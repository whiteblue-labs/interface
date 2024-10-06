import React, {Dispatch, FC, SetStateAction } from 'react';
import {Button, Divider, Drawer, InputNumber, Radio, Slider} from "antd";
import clsx from "clsx";
import {CloseCircleOutlined} from "@ant-design/icons";
import SelectToken from "../../../components/app/SelectToken";
import { IFilterData } from '..';
import {useAppSelector} from "../../../state/hooks";
import "./FilterDrawer.scss"

interface IFilterState {
  open: boolean,
  isFilterMode: boolean,
  filterData: IFilterData
}

interface IPropsType {
  filter: IFilterState
  setFilter: Dispatch<SetStateAction<IFilterState>>
  clearFilter: () => void
  setFilterNetwork: (network: number) => void
  selectState: {selectFrom: boolean, selectTo: boolean},
  setSelectState: Dispatch<SetStateAction<{selectFrom: boolean, selectTo: boolean}>>,
}

const FilterDrawer: FC<IPropsType> = ({setFilter, filter, clearFilter, selectState, setSelectState, setFilterNetwork}) => {
  const appState = useAppSelector((state) => state.appState)

  return (
   <Drawer
     className="app-market-filter"
     style={{ backgroundColor: "#eee" }}
     width={500}
     closable={false}
     onClose={() => setFilter({ ...filter, open: false })}
     open={filter.open}
   >
     {filter.open && (
       <>
         <div className="header">
           <div className="header--tab">
             <div
               className={clsx("header--tab--item", {
                 "header--tab--item--show": filter.isFilterMode,
               })}
               onClick={() => setFilter({ ...filter, isFilterMode: true })}
             >
               Filter
             </div>

             <div
               className={clsx("header--tab--item", {
                 "header--tab--item--show": !filter.isFilterMode,
               })}
               onClick={() => setFilter({ ...filter, isFilterMode: false })}
             >
               Sort
             </div>
           </div>

           <div className="header--option">
             <div
               className="header--option--item"
               onClick={clearFilter}
             >
               Clear All
             </div>
             <div
               onClick={() =>
                 setFilter({
                   open: !filter.open,
                   isFilterMode: true,
                   filterData: filter.filterData,
                 })
               }
             >
               <CloseCircleOutlined
                 className="close-icon"
                 rev={"size"}
                 size={30}
               />
             </div>
           </div>
         </div>

         <Divider className="divider" />

         {filter.isFilterMode ? (
           <div className="content-filter">
             <div className="item">
               <p className="item--title">Swap from</p>
               <div className="item--token">
                 <p>Token</p>
                 <Button
                   type="primary"
                   onClick={() => setSelectState({selectFrom: true, selectTo: false})}
                   style={filter.filterData.from && {padding: '0 20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                 >
                   {
                     filter.filterData.from !== '' ?
                       <div style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
                         <img src={filter.filterData.from.image} alt="token" style={{height: 24, marginRight: 12}}/>
                         <p style={{color: 'white', fontWeight: 600, fontSize: '1.6rem', minWidth: 0}}>{filter.filterData.from.symbol}</p>
                       </div>
                       :
                       'Select a token'
                   }
                 </Button>
               </div>
               <div className="item--token">
                 <p>Quantity</p>
                 <Slider
                   min={0}
                   max={10000}
                   range={{ draggableTrack: true }}
                   step={20}
                   value={filter.filterData.amountFrom}
                   defaultValue={[0, 100000]}
                   onChange={(value : [number, number]) => setFilter({ ...filter, filterData: {...filter.filterData, amountFrom: value}})}
                   style={{width: '80%'}}
                   railStyle={{
                     borderColor: "white",
                     backgroundColor: "#999",
                   }}
                 />
               </div>

               <div className = "item--amount">
                 <InputNumber
                   min={0}
                   max={10000}
                   style={{ width: "100px" }}
                   onChange={(value) => setFilter({ ...filter, filterData: {
                       ...filter.filterData,
                       amountFrom: [Number(value), filter.filterData.amountFrom[0] ]
                     }})}
                   value={filter.filterData.amountFrom[0]}
                   placeholder="Amount"
                 />
                 <InputNumber
                   min={0}
                   max={10000}
                   style={{ width: "100px" }}
                   onChange={(value) => setFilter({ ...filter, filterData: {
                       ...filter.filterData,
                       amountFrom: [filter.filterData.amountFrom[0] ,Number(value)]
                     }})}
                   value={filter.filterData.amountFrom[1]}
                   placeholder="Amount"
                 />
               </div>


             </div>

             <div className="item">
               <p className="item--title">Swap to</p>
               <div className="item--token">
                 <p>Token</p>
                 <Button
                   type="primary"
                   onClick={() => setSelectState({selectFrom: false, selectTo: true})}
                   style={filter.filterData.to && {padding: '0 20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                 >
                   {
                     filter.filterData.to !== '' ?
                       <div style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
                         <img src={filter.filterData.to.image} alt="token" style={{height: 24, marginRight: 12}}/>
                         <p style={{color: 'white', fontWeight: 600, fontSize: '1.6rem', minWidth: 0}}>{filter.filterData.to.symbol}</p>
                       </div>
                       :
                       'Select a token'
                   }
                 </Button>

               </div>
               <div className="item--token">
                 <p>Quantity</p>
                 <Slider
                   min={0}
                   max={10000}
                   range={{ draggableTrack: true }}
                   step={20}
                   value={filter.filterData.amountTo}
                   defaultValue={[0, 100000]}
                   onChange={(value : [number, number]) => setFilter({ ...filter, filterData: {...filter.filterData, amountTo: value}})}
                   style={{width: '80%'}}
                   railStyle={{
                     borderColor: "white",
                     backgroundColor: "#999",
                   }}
                 />
               </div>

               <div className = "item--amount">
                 <InputNumber
                   min={0}
                   max={10000}
                   style={{ width: "100px" }}
                   onChange={(value) => setFilter({ ...filter, filterData: {
                       ...filter.filterData,
                       amountTo: [Number(value), filter.filterData.amountTo[0] ]
                     }})}
                   value={filter.filterData.amountTo[0]}
                   placeholder="Amount"
                 />
                 <InputNumber
                   min={0}
                   max={10000}
                   style={{ width: "100px" }}
                   onChange={(value) => setFilter({ ...filter, filterData: {
                       ...filter.filterData,
                       amountTo: [filter.filterData.amountTo[0] ,Number(value)]
                     }})}
                   value={filter.filterData.amountTo[1]}
                   placeholder="Amount"
                 />
               </div>

             </div>


             <div className="item">
               <p className="item--title">Network</p>
               <div className="item--amount" style={{marginLeft:90}}>
                 <Radio.Group defaultValue={() => {
                   if (filter.filterData.network === 4444)
                     return 'a'
                   else if (filter.filterData.network === 8888)
                     return 'b'
                   else if (filter.filterData.network === 0)
                     return 'c'
                   else return ''
                 }} size="middle" >
                   <Radio.Button value="a" onClick={() => {if (filter.filterData.network === 4444) setFilterNetwork(-1); else setFilterNetwork(4444) }}>MBC Network</Radio.Button>
                   <Radio.Button value="b" onClick={() => {if (filter.filterData.network === 8888) setFilterNetwork(-1); else setFilterNetwork(8888) }}>AGD Network</Radio.Button>
                   <Radio.Button value="c" onClick={() => {if (filter.filterData.network === 0) setFilterNetwork(-1); else setFilterNetwork(0) }}>Cross Network</Radio.Button>
                 </Radio.Group>
               </div>
             </div>


             {(selectState.selectFrom || selectState.selectTo) && (
               <div style={{zIndex: 2}}>
                 <SelectToken
                   closeFunction={() => {setSelectState({selectFrom: false, selectTo: false}) }}
                   top_css="calc((100vh - 600px) / 2 - 20px)"
                   right_css="16px"
                   onClickSelect={(token) => {
                     if (selectState.selectFrom) {
                       if (appState.isConnectedWallet) {
                         setFilter({ ...filter, filterData: {...filter.filterData, from: token.token}});
                       } else {
                         setFilter({ ...filter, filterData: {...filter.filterData, from: token}});
                       }
                     }
                     else {
                       if (appState.isConnectedWallet) {
                         setFilter({ ...filter, filterData: {...filter.filterData, to: token.token}});
                       } else {
                         setFilter({ ...filter, filterData: {...filter.filterData, to: token}});
                       }
                     }
                     setSelectState({selectFrom: false, selectTo: false});
                   }
                   }
                 />
               </div>
             )}

           </div>

         ) : (
           <div></div>
         )}
       </>
     )}
   </Drawer>

 );
};

export default FilterDrawer;
import React from 'react'
import { ITask, ITaskState } from '../../../../state/task/taskSlice'
import { Modal, Steps, Tooltip } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { getLinkExplore, mappingNetwork } from '../../../../utils/blockchain'
import PairToken from '../../PairToken'


export interface IModalElement {
    task: ITask;
    taskState: ITaskState;
    afterClose: () => void;
}

const ModalRemove = ({task, taskState, afterClose} : IModalElement) => {
  return (
      <Modal
        title="Remove Order"
        open={true}
        onOk={() => task.status === 0 ? task.funcExecute(taskState, task.id) : 
          ((task.status === 3 || task.status < 0) ? afterClose() : {})}
          okText= {
            task.status === 0 ? "Confirm" : (
            (task.status === 3 || task.status < 0) ? "OK" : <LoadingOutlined  rev={""}/>)}
        afterClose={afterClose}
        onCancel={afterClose}
        width={700}
        style={{top: 200}}
        closable={true}
        cancelButtonProps={{ style: { display: 'none' } }}
    >
    {
        task.from.token.network === task.to?.token.network ?
        <Steps size="default" style={{width: 600, margin: 'auto', marginTop: 40, marginBottom: 30}}
            items={
                task.status === 0 ? 
                [
                  {
                    title: "Refund Token",
                    status: "process"
                  },
                  {
                    title: "Save Data",
                    status: "wait"
                  },
                  {
                    title: "Done",
                    status: "wait"
                  }
                ] : 
                [
                  {
                    title: "Refund Token",
                    status: task.status === -1 ? 'error' : 
                            ((task.status >  1) ? 'finish' : 'process'),
                    icon:  task.status === 1 && <LoadingOutlined  rev={""}/>
                  },
                  {
                    title: "Save Data",
                    status: task.status === -2 ? 'error' : (
                              task.status < 2 ? 'wait' : (
                                task.status === 3 ? 'finish' : 'process'
                              )
                            ),
                    icon:  task.status === 2 && <LoadingOutlined  rev={""}/>                  
                  },
                  {
                    title: 'Done',
                    status: task.status === 3 ? 'finish' : 'wait'
                  }
                ]}
        />
        : 
        <Steps size="default" style={{width: 600, margin: 'auto', marginTop: 40, marginBottom: 30}}
            items={
                task.status === 0 ? 
                [
                    {
                    title: "Remove Order",
                    status: "process"
                    },
                    {
                    title: "Done",
                    status: "wait"
                    }
                ] : 
              [
                {
                  title: "Remove Order",
                  status: task.status === -1 ? 'error' : (
                            task.status > 1 ? 'finish' : 'process'
                          ),
                  icon:  task.status === 1 && <LoadingOutlined  rev={""}/>                  
                },
                {
                  title: 'Done',
                  status: task.status === 3 ? 'finish' : 'wait'
                }
              ]}
          />
    }

        <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom: 30}}>
            <div >
              <p style={{fontSize: '1.6rem', fontWeight: 500, lineHeight: '1.6rem'}}>{task.from.token.name}</p>
              <p style={{textAlign: "right", fontSize: '1.6rem', fontWeight: 600, color: 'var(--color-secondary)'}}>{task.from.amount} {task.from.token.symbol}</p>
            </div>
            <PairToken from_img={task.from.token.image} to_img={task.to?.token.image} width={60}/>
            <div>
                <p style={{fontSize: '1.6rem', fontWeight: 500, lineHeight: '1.6rem'}}>{task.to?.token.name}</p>
                <p style={{fontSize: '1.6rem', fontWeight: 600, color: 'var(--color-secondary)'}}>{task.to?.amount} {task.to?.token.symbol}</p>
            </div>
        </div>

        <div style={{fontWeight: 500}}>
              <p>Status: {
                  task.status === 0  ? 
                      <span style={{fontWeight: 400, color: "#333"}}>Pending</span> 
                  : (task.status === 3 ? 
                      <span style={{fontWeight: 400, color: "#52c41a"}}>Success</span> 
                  : 
                      <span style={{fontWeight: 400, color: '#1677ff'}}>In Progress</span>)}
              </p>
              <p>Owner: <span style={{fontWeight: 400}}>{task.from.address}</span></p>
              
              <p>Network: 
                  <span style={{fontWeight: 400}}> {
                    task.from.token.network === task.to?.token.network ?
                      mappingNetwork(task.from.token.network)
                    : mappingNetwork(task.from.token.network) + ' - ' + mappingNetwork(task.to?.token.network)  
                  }
                  </span>
              </p>
              <p>Order ID:  
                  <span style={{fontWeight: 400}}> {
                      task.orderID
                  }</span>
              </p>
              {
                task.from.token.network === task.to?.token.network &&
                <p>Transaction Hash:  
                  {
                    task.transactionHash && 
                    <Tooltip title={(<div style={{cursor:'pointer'}} onClick={() => window.open(getLinkExplore(task.transactionHash, task.to?.token.network), '_blank', 'noopener,noreferrer')}>View in explorer</div>)} placement='bottom'>
                    <span style={{ fontWeight: 400 }}> {' '}
                    { task.transactionHash }
                    </span>
                    </Tooltip>
                  }
                </p>
              }
          </div>
    </Modal>

  )
}

export default ModalRemove
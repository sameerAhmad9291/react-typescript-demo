import * as React from 'react';
import {  Col, Row, Table, Tag, Button, Modal } from 'antd';
import { IShipment } from '../models/IShipment';
import { ICargo } from '../models/ICargo';
import Utils from '../utilities/Utils';
import Status from './Status';

// Create the containers interface
export interface IProps {
  shipment: IShipment;
}

interface IState {
    shipment: IShipment,
    visible: boolean
}

export default class ShipmentDetail extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState){
    super(props, state);
      this.state = {
          visible: false,
          shipment: this.props.shipment
      };        
    }

    showModal = () => {
        this.setState({
          visible: true
        });
    };

    closeModal = () => {
        this.setState({
          visible: false
        });
    };

    getColumns(){
      return  [
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
          sorter: (a:ICargo, b:ICargo) => Utils.sortByString(a.type, b.type)
        },
        {
          title: 'Volume',
          dataIndex: 'volume',
          key: 'volume',
          sorter: (a:ICargo, b:ICargo) => Utils.sortByStrNumber(a.volume, b.volume)
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description'
        }
      ];
    }

    public render() {
      const columns = this.getColumns();
      const { shipment } = this.props;
      return (
        <>
        <Button type="default" onClick={this.showModal}>
                View
        </Button>
        { this.state.visible ? 
            (<Modal title={"Shipment: "+ shipment.id} visible={true} 
                onCancel={this.closeModal} footer={null}>
                   <Row>
                    <Row>
                      <Col span={19} offset={1}>
                        <h5>{shipment.name}</h5>
                      </Col>
                      <Col span={3}>
                        <Status status={shipment.status}/>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={22} offset={1}>
                        <h5><b>Origin: </b>{shipment.origin}</h5> 
                      </Col>
                    </Row>
                    <Row>
                      <Col span={22} offset={1}>            
                        <h5><b>Destination: </b> {shipment.destination}</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={22} offset={1}>
                        <h5><b>Mode: </b> <Tag color="#87d068">{shipment.mode.toLocaleUpperCase()}</Tag></h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={22} offset={1}>
                        <h5><b>Total: </b> {shipment.total}</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col offset={1} span={22}>
                        <Table title={() => 'Cargo Items'} columns={columns}  dataSource={shipment.cargo} bordered={true}  
                        size="small" rowKey={(record, index) => index.toString()} />
                      </Col>
                    </Row>
                  </Row>
            </Modal>) : ""    
        }
  </>
     );
    }
  }
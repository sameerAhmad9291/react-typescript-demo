import * as React from 'react';

import { Row , Table, Input, Col} from 'antd';

import { IShipment } from '../models/IShipment';
import Status from '../components/Status';
import Utils from '../utilities/Utils';
import ShipmentDetail from './ShipmentDetail';
import ShipmentEdit from './ShipmentEdit';


// Create the containers interface
interface IProps {
    handleSearch(value: string): void,
    onUpdate(): void,
    shipments: IShipment[];
}

export default class ShipmentTable extends React.Component<IProps> {

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        this.props.handleSearch(newValue);
    }

    getTableColumns():any{
        return  [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a:IShipment, b:IShipment) => Utils.sortByStrNumber(a.id.substring(1), b.id.substring(1))
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a:IShipment, b:IShipment) => Utils.sortByString(a.name, b.name)
        },
        {
            title: 'Mode',
            dataIndex: 'mode',
            key: 'mode',
            sorter: (a:IShipment, b:IShipment) => Utils.sortByString(a.mode, b.mode)
        },
        {
            title: 'Origin',
            dataIndex: 'origin',
            key: 'origin',
            sorter: (a:IShipment, b:IShipment) => Utils.sortByString(a.origin, b.origin)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a:IShipment, b:IShipment) => Utils.sortByString(a.status, b.status),
            render:  (text:string, record:IShipment) => (
            <Status status={record.status}/>
            ),
        },      
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            sorter: (a:IShipment, b:IShipment) =>  Utils.sortByNumber(a.total, b.total)
        },
        {
          title: 'Actions',
          dataIndex: '',
          key: '',
          render:  (text:string, record:IShipment) => (
            <>
                <ShipmentEdit shipment={record} onUpdate={this.props.onUpdate}/>
                <ShipmentDetail shipment={record}/>
            </>
          ),
        }
        ];
    }

    public render() {
        
        const columns = this.getTableColumns();
        const shipments  = this.props.shipments;
        const { Search } = Input;
        
        return (
            <Row>
            <Col offset={1} span={5} className="margin-bottom-20">
                <h1>Shipments</h1>
                <Search placeholder="input search id" onChange={e => this.onChange(e)} enterButton={true} />  
            </Col>
            <Col offset={1} span={22}>
                <Table columns={columns}  dataSource={shipments} pagination={{ pageSize: 20 }} bordered={true}  size="small" rowKey='id' />
            </Col>
            </Row>
        );
    }
}

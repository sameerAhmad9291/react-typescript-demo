import * as React from 'react';
import { message } from 'antd';
import axios from 'axios';
import { IShipment } from '../models/IShipment';
import ShipmentTable from './ShipmentTable';
import Config from '../constants/Config';

// Create the containers interface
interface IProps {
}

interface IState {
  shipments: IShipment[];
  filtered: IShipment[];
}

export default class ShipmentList extends React.Component<IProps, IState> {

  constructor(props: IProps, state: IState) {
    super(props, state);

    this.state = {
      shipments: [],
      filtered:[]
    }
  }

  componentDidMount(){
    this.loadShipments();
  }

  async loadShipments(){
    try {
      const response = await axios.get(Config.GET_ALL);
      this.setState({
        shipments: response.data,
        filtered: response.data
      });     
    } catch (err) {
      console.error(err);
      message.error(err);
    }
  }

  onUpdate = (): void=>{
    this.loadShipments();
  }


  handleSearch = (value: string) => {
    value = value.toLocaleLowerCase();
    let data = this.state.shipments.filter(s=> { return s.id.toLocaleLowerCase().indexOf(value) !== -1 });
    this.setState({ filtered: data });
  }

  public render() {
    const shipments  = this.state.filtered;
    
    return (
      <div className="page-container">
        <ShipmentTable onUpdate={this.onUpdate} handleSearch={this.handleSearch} shipments={shipments}/>
      </div>
    );
  }
}

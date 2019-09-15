import * as React from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { IShipment } from '../models/IShipment';
import axios from 'axios';
import Config from '../constants/Config';

// Create the containers interface
interface IProps {
  shipment: IShipment;
  onUpdate(): void;
}

interface IState {
    shipment: IShipment,
    visible: boolean
}

export default class ShipmentEdit extends React.Component<IProps, IState> {

    constructor(props: IProps, state: IState){
        super(props, state);  
        this.state = {
          visible: false,
          shipment: this.props.shipment
      };   
    }

    handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();  

      let shipment = this.state.shipment;
      let name = shipment.name.trim();
      if(name === "" || name === null){
        message.error("Pleae enter valid name")
        return;
      }
      try{
          await axios.patch(Config.EDIT+shipment.id, shipment);
          this.closeModal();
          this.props.onUpdate();
      }catch(ex){
        console.error(ex)
        message.error(ex)
      }
    }

    onChange= (event: React.ChangeEvent<HTMLInputElement>) => { 
      let updatedName: string = event.currentTarget.value
      this.setState({
        shipment: {
          ...this.state.shipment,
          name: updatedName
        }
      });
    }

    showModal = () => {
        this.setState({
          visible: true
        });
    };

    closeModal = () => {
        this.setState({
          visible: false,
          shipment: this.props.shipment
        });
    };
    
    public render() {
      const {shipment} = this.state;

      return (
        <>
            <Button type="primary" onClick={this.showModal}>
                    Edit
            </Button>
            { this.state.visible ? 
                (<Modal title={"Shipment: "+shipment.id} visible={true} 
                    onCancel={this.closeModal} footer={null}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                      <Input  placeholder="name" value={shipment.name} onChange={this.onChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                    </Form.Item>
                  </Form>
                </Modal>) : ""    
            }
        </>
      );
    }
  }
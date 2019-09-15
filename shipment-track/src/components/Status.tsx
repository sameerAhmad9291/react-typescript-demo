import * as React from 'react';
import '../styles/status.css';
import { Tag } from 'antd';

interface IProps {
  status: string;
}

export default class Status extends React.Component<IProps> {

    getTagColorByStatus(status:string): string{
      switch(status.toLocaleLowerCase()){
        case "new": return "magenta";
        case "active": return "blue";
        case "completed": return "green";
        default : return "gold";
      }
    }

    public render() {
      const { status } = this.props;
      return (
              <Tag color={this.getTagColorByStatus(status)}>
                  {status.toLowerCase()}
              </Tag>
              );
    }
  }
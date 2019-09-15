import React from 'react';
import 'antd/dist/antd.css';  
import './App.css';
import ShipmentList from './components/ShipmentList';

const App: React.FC = () => {
  return (
    <div className="App">
      <>
        <ShipmentList />
      </>
    </div>
  );
}

export default App;

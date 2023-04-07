'use client';

import React from 'react';
import BluetoothDevicesList from './BluetoothDevicesList';
import BluetoothAdvertisementList from './BluetoothAdvertisementList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Bluetooth Devices List</h1>
      <BluetoothAdvertisementList />
    </div>
  );
};

export default App;
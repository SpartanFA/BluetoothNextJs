'use client';

import React from 'react';
import Button from './button';
import BluetoothDevicesList from './BluetoothDevicesList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Bluetooth Devices List</h1>
      <BluetoothDevicesList />
    </div>
  );
};

export default App;
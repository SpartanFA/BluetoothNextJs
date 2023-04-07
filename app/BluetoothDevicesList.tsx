import React, { useState, useEffect } from 'react';

const BluetoothDevicesList: React.FC = () => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const scanForDevices = async () => {
    if (!navigator.bluetooth) {
      alert('Your browser does not support Web Bluetooth API.');
      return;
    }

    try {
      setIsScanning(true);
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });

      setDevices(prevDevices => [...prevDevices, device]);
      setIsScanning(false);
    } catch (error) {
      console.error('Error scanning for Bluetooth devices:', error);
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsScanning(false);
    };
  }, []);

  return (
    <div>
      <button onClick={scanForDevices} disabled={isScanning}>
        {isScanning ? 'Scanning...' : 'Scan for Bluetooth Devices'}
      </button>
      <ul>
        {devices.map(device => {
          console.log(device.name); // Log the device to the console
          return (
            <li key={device.id}>
              {'ic' || 'Unknown Device'} - ID: {device.gatt?.connected ? 'Connected' : 'Disconnected'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BluetoothDevicesList;

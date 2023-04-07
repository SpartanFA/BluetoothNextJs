import React, { useState, useEffect } from 'react';

interface DeviceWithServices {
  device: BluetoothDevice;
  serviceUUIDs: string[];
}

const BluetoothDevicesList: React.FC = () => {
  const [devices, setDevices] = useState<DeviceWithServices[]>([]);
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
        optionalServices: ['*'],
      });

      const gattServer = await device.gatt?.connect();
      const services = await gattServer?.getPrimaryServices();
      const serviceUUIDs = services?.map(service => service.uuid) || [];

      setDevices(prevDevices => [
        ...prevDevices,
        {
          device,
          serviceUUIDs,
        },
      ]);

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
        {devices.map(({ device, serviceUUIDs }) => (
          <li key={device.id}>
            {device.name || 'Unknown Device'}
            <ul>
              {serviceUUIDs.map(uuid => (
                <li key={uuid}>{uuid}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BluetoothDevicesList;
import React, { useState, useEffect } from 'react';

interface DeviceInfo {
  device: BluetoothDevice;
  rssi: number;
  txPower: number | null;
  serviceData: Map<string, DataView>;
}

const BluetoothAdvertisementList: React.FC = () => {
  const [devices, setDevices] = useState<Map<string, DeviceInfo>>(new Map());
  const [isScanning, setIsScanning] = useState(false);

  const onAdvertisementReceived = (event: BluetoothAdvertisingEvent) => {
    setDevices((prevDevices) => {
      const updatedDevices = new Map(prevDevices);
      updatedDevices.set(event.device.id, {
        device: event.device,
        rssi: event.rssi,
        txPower: event.txPower,
        serviceData: event.serviceData,
      });
      return updatedDevices;
    });
  };

  const scanForAdvertisements = async () => {
    if (!navigator.bluetooth) {
      alert('Your browser does not support Web Bluetooth API.');
      return;
    }

    try {
      setIsScanning(true);
      await navigator.bluetooth.requestLEScan({
        acceptAllAdvertisements: true,
      });

      navigator.bluetooth.addEventListener('advertisementreceived', onAdvertisementReceived);

    } catch (error) {
      console.error('Error scanning for Bluetooth devices:', error);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (navigator.bluetooth) {
        navigator.bluetooth.removeEventListener('advertisementreceived', onAdvertisementReceived);
      }
      setIsScanning(false);
    };
  }, []);

  return (
    <div>
      <button onClick={scanForAdvertisements} disabled={isScanning}>
        {isScanning ? 'Scanning...' : 'Scan for Bluetooth Devices'}
      </button>
      <ul>
        {Array.from(devices.values()).map((info) => (
          <li key={info.device.id}>
            <p><strong>-----------------------------------------</strong></p>
            <p><strong>Device:</strong> {info.device.name || "Unknown Name"}</p>
            <p><strong>ID:</strong> {info.device.id   || "Unknown ID"}</p>
            <p><strong>RSSI:</strong> {info.rssi}</p>
            <p><strong>TX Power:</strong> {info.txPower === null ? 'N/A' : info.txPower}</p>
            <p><strong>Service Data:</strong></p>
            <ul>
              {Array.from(info.serviceData.entries()).map(([uuid, dataView]) => (
                <li key={uuid}>{uuid}: {Array.from(new Uint8Array(dataView.buffer)).join(', ')}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BluetoothAdvertisementList;

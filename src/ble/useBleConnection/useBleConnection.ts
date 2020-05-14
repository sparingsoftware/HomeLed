import { useEffect, useState, useCallback, useRef } from 'react';
import BleConnection from '../ble-connection/ble-connection';
import { HSV } from '../../theme/colors';

export interface BleDevice {
  name: string;
  id: string;
}

//

export default function useBleConnection() {
  const bleConnection = useRef(new BleConnection());

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const [currentDevice, setCurrentDevice] = useState<BleDevice | null>(null);

  function connectToDevice(device: BleDevice) {
    disconnect();

    setIsConnecting(true);

    setCurrentDevice(device);

    console.log('CONNECT TO DEVICE = ', device);

    bleConnection.current
      .connect(device)
      .then(() => {
        console.log('Connection established!');

        setIsConnected(true);
      })
      .catch((err) => {
        console.log('Connection error = ', err);

        setIsConnected(false);

        setCurrentDevice(null);
      })
      .finally(() => {
        setIsConnecting(false);
      });

    listenToDisconnect();
  }

  function listenToDisconnect() {
    bleConnection.current.onDisconnected(() => {
      // TODO: fix at start
      // setIsConnected(false);
    });
  }

  function disconnect() {
    if (isConnected) {
      console.log('BLE disconnect');

      bleConnection.current.disconnect();

      setIsConnected(false);

      setCurrentDevice(null);
    }
  }

  function onNewPairedDevice(device: BleDevice) {
    setIsConnected(true);

    setCurrentDevice(device);
  }

  // this should be rather moved to separate module
  // (as it is not about connection)
  function sendColor(color: HSV) {
    console.log('SEND THIS COLOR = ', color);

    bleConnection.current.sendColor(color);
  }

  function stopConnecting() {
    bleConnection.current.stopConnecting();
  }

  return {
    connectToDevice,
    stopConnecting,
    disconnect,
    isConnecting,
    isConnected,
    currentDevice,
    onNewPairedDevice,
    sendColor
  };
}

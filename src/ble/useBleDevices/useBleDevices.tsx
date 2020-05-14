import React, { useEffect, useRef, useCallback } from 'react';
import useBleConnection, {
  BleDevice
} from '../useBleConnection/useBleConnection';
import useBleStorage from '../useBleStorage/useBleStorage';
import useAppState from 'react-native-appstate-hook';
import { HSV } from '../../theme/colors';

//

export default function useBleDevices() {
  const ble = useBleConnection();

  const bleStorage = useBleStorage();

  // Disconnect on background so that other users may connect to this device
  // TODO: Enable multiple connections with device
  const onBackground = useCallback(() => ble.disconnect(), [ble]);
  const onForeground = useCallback(() => {
    if (!ble.isConnected && !ble.isConnecting && bleStorage.currentDevice) {
      ble.connectToDevice(bleStorage.currentDevice);
    }
  }, [ble, bleStorage.currentDevice]);

  useAppState({ onBackground, onForeground });

  // auto-connect at start
  const didAutoConnect = useRef(false);

  useEffect(() => {
    if (bleStorage.currentDevice && !ble.isConnected && !ble.isConnecting) {
      if (!didAutoConnect.current) {
        ble.connectToDevice(bleStorage.currentDevice);
        didAutoConnect.current = true;
      }
    }
  }, [bleStorage.currentDevice, ble]);

  // connect to saved device
  function connectToDevice(device: BleDevice) {
    bleStorage.setCurrentDevice(device);

    ble.connectToDevice(device);
  }

  // we connected to a new scanned device
  function onNewDevicePaired(device: BleDevice) {
    bleStorage.setCurrentDevice(device);
    bleStorage.addDevice(device);

    ble.onNewPairedDevice(device);
  }

  function removeDevice(device: BleDevice) {
    if (bleStorage.currentDevice && device.id === bleStorage.currentDevice.id) {
      ble.disconnect();
      bleStorage.setCurrentDevice(null);
    }

    bleStorage.removeDevice(device);
  }

  function sendColorToCurrentDevice(color: HSV) {
    ble.sendColor(color);
  }

  return {
    connectToDevice,
    removeDevice,
    onNewDevicePaired,
    sendColorToCurrentDevice,
    devices: bleStorage.devices,
    currentDevice: bleStorage.currentDevice,
    isConnected: ble.isConnected,
    isConnecting: ble.isConnecting
  };
}

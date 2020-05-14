import React, { useEffect, useCallback } from 'react';
import useBleScanning from '../../../ble/useBleScanning/useBleScanning';
import useBleConnection, {
  BleDevice
} from '../../../ble/useBleConnection/useBleConnection';
import ScanDevicesScreen from './ScanDevicesScreen';

//

//

interface Props {
  onDeviceConnected: (device: BleDevice) => void;
  onClose: () => void;
}

//

const ScanDevicesScreenContainer = ({ onDeviceConnected, onClose }: Props) => {
  const { devices } = useBleScanning();

  const {
    isConnected,
    isConnecting,
    connectToDevice,
    stopConnecting,
    currentDevice
  } = useBleConnection();

  // we have connected to a new device
  useEffect(() => {
    if (isConnected && currentDevice !== null) {
      onDeviceConnected(currentDevice);
    }
  }, [isConnected, currentDevice, onDeviceConnected]);

  // stop connecting on unmount
  useEffect(() => {
    return () => stopConnecting();
  }, [stopConnecting]);

  //

  function onDevicePress(device: BleDevice) {
    if (!isConnecting) {
      console.log('connectToDevice');
      connectToDevice(device);
    }
  }

  return (
    <ScanDevicesScreen
      devices={devices}
      onClose={onClose}
      onDevicePress={onDevicePress}
      isConnecting={isConnecting}
      currentDevice={currentDevice}
    />
  );
};

//

export default ScanDevicesScreenContainer;

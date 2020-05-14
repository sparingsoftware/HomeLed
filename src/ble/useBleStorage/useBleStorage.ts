import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { BleDevice } from '../useBleConnection/useBleConnection';

//

const DEVICES_KEY = 'DEVICES_KEY';
const CURRENT_DEVICE_KEY = 'CURRENT_DEVICE_KEY';

//

export default function useBleStorage() {
  const [devices, setDevices] = useState<BleDevice[]>([]);

  const [currentDevice, setCurrentDevice] = useState<BleDevice | null>(null);

  const updateStorage = useCallback(() => {
    AsyncStorage.setItem(DEVICES_KEY, JSON.stringify(devices));
    AsyncStorage.setItem(CURRENT_DEVICE_KEY, JSON.stringify(currentDevice));
  }, [devices, currentDevice]);

  useEffect(() => {
    fetchStorage();
  }, []);

  // update storage on every devices change
  useEffect(() => {
    updateStorage();
  }, [devices, currentDevice, updateStorage]);

  function fetchStorage() {
    // TODO: merge into promise all
    AsyncStorage.getItem(DEVICES_KEY).then((val) => {
      if (val) {
        const devs: BleDevice[] = JSON.parse(val);
        setDevices(devs);
      }
    });

    AsyncStorage.getItem(CURRENT_DEVICE_KEY).then((val) => {
      if (val) {
        const dev: BleDevice = JSON.parse(val);
        setCurrentDevice(dev);
      }
    });
  }

  function addDevice(device: BleDevice) {
    const isNewDevice = devices.findIndex((d) => d.id === device.id) === -1;

    if (isNewDevice) {
      setDevices([...devices, device]);
    }
  }

  function removeDevice(device: BleDevice) {
    const filteredDevices = devices.filter((d) => d.id !== device.id);

    setDevices(filteredDevices);
  }

  return {
    devices,
    addDevice,
    removeDevice,
    fetchStorage,
    currentDevice,
    setCurrentDevice
  };
}

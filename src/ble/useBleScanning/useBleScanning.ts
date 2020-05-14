import { useEffect, useState, useCallback, useRef } from 'react';
import { BleDevice } from '../useBleConnection/useBleConnection';
import BleScanning from '../ble-scanning/ble-scanning';

//

export default function useBleScanning() {
  const bleScanning = useRef(new BleScanning());

  const [devices, setDevices] = useState<BleDevice[]>([]);

  const addNewDevice = useCallback(
    (device: BleDevice) => {
      if (!devices.find((d) => d.id === device.id)) {
        setDevices([...devices, device]);

        console.log('ADD DEVICE = ', device);
      }
    },
    [devices]
  );

  const startScanning = useCallback(() => {
    bleScanning.current.startScanning((device) => {
      console.log('check DEVICE = ', device);

      addNewDevice({
        name: device.name ?? '',
        id: device.id ?? ''
      });
    });
  }, [addNewDevice]);

  useEffect(() => {
    startScanning();

    return () => {
      stopScanning();
    };
  }, [startScanning]);

  function stopScanning() {
    bleScanning.current.stopScanning();
  }

  return {
    devices
  };
}

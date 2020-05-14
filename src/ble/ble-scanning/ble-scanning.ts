import { bleManager } from '../../app/App';
import { BleDevice } from '../useBleConnection/useBleConnection';

// TODO: change for dynamic use
// Need to add fn to change device's name
const FIXED_NAME = 'BLUNO';

//
// Wrapper for bleManager
//
export default class BleScanning {
  startScanning(onNewDevice: (device: BleDevice) => void) {
    bleManager.startDeviceScan([], null, (error, device) => {
      if (
        device?.name?.toUpperCase().includes(FIXED_NAME) ||
        device?.localName?.toUpperCase().includes(FIXED_NAME)
      ) {
        onNewDevice({
          name: device.name ?? '',
          id: device.id ?? ''
        });

        console.log('new DEVICE = ', device);
      }
    });
  }

  stopScanning() {
    bleManager.stopDeviceScan();
  }
}

import { createContext } from 'react';
import { BleDevice } from '../useBleConnection/useBleConnection';

interface ContextType {
  devices: BleDevice[];
  removeDevice?: (device: BleDevice) => void;
}

export const DevicesContext = createContext<ContextType>({
  devices: []
});

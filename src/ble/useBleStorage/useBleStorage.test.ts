import { renderHook, act } from '@testing-library/react-hooks';
import useBleStorage from './useBleStorage';
import AsyncStorage from '@react-native-community/async-storage';
import { BleDevice } from '../useBleConnection/useBleConnection';

describe('useBleStorage ', () => {
  it('should return saved devices and current device', async () => {
    mockStorage(testDevices, testDevices[1]);

    const { result, waitForNextUpdate } = renderHook(() => useBleStorage());

    // wait untill all devices are loaded
    await waitForNextUpdate();

    expect(result.current.devices.length).toEqual(2);
    expect(result.current.devices).toContainEqual(testDevices[1]);
    expect(result.current.devices).toContainEqual(testDevices[0]);

    expect(result.current.currentDevice).toEqual(testDevices[1]);
  });

  //

  it('should save new device', () => {
    mockStorage([]);

    const { result } = renderHook(() => useBleStorage());

    act(() => result.current.addDevice(testDevices[0]));

    expect(AsyncStorage.setItem).toBeCalledWith(
      'DEVICES_KEY',
      JSON.stringify([testDevices[0]])
    );
  });

  //

  it('should remove device', async () => {
    mockStorage(testDevices, testDevices[0]);

    (AsyncStorage.setItem as jest.Mock).mockImplementation(() => {
      return Promise.resolve();
    });

    const { result, waitForValueToChange } = renderHook(() => useBleStorage());

    // wait untill all devices are loaded
    await waitForValueToChange(() => {
      return result.current.devices;
    });

    act(() => result.current.removeDevice(testDevices[0]));

    expect(AsyncStorage.setItem).toBeCalledWith(
      'DEVICES_KEY',
      JSON.stringify([testDevices[1]])
    );
  });

  //

  it('should set current device', () => {
    mockStorage(testDevices, testDevices[0]);

    const { result } = renderHook(() => useBleStorage());

    act(() => result.current.setCurrentDevice(testDevices[1]));

    expect(result.current.currentDevice).toEqual(testDevices[1]);
  });
});

beforeEach(() => jest.resetAllMocks());

//
// - - - SETUP - - -
//

const testDevices = [
  {
    id: '123',
    name: 'testDevice'
  },
  {
    id: '5',
    name: 'other-device'
  }
];

function mockStorage(devices: BleDevice[], currentDevice?: BleDevice) {
  (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
    switch (key) {
      case 'DEVICES_KEY':
        return Promise.resolve(JSON.stringify(devices));

      case 'CURRENT_DEVICE_KEY':
        return Promise.resolve(JSON.stringify(currentDevice));
    }
  });
}

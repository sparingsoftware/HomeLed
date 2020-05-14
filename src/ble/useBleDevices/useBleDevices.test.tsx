import { renderHook, act } from '@testing-library/react-hooks';
import useBleDevices from './useBleDevices';
import AsyncStorage from '@react-native-community/async-storage';
import useAppState from 'react-native-appstate-hook';
import { AppState } from 'react-native';

//

describe('useBleDevices ', () => {
  //

  describe('after loading start data from storage', () => {
    it('should auto-connect at to current device', async () => {
      const { result } = await initRender();

      expect(mockConnect).toBeCalledTimes(1);
      expect(mockConnect).toBeCalledWith(testDevices[1]);
      expect(result.current.isConnected).toEqual(true);
      expect(result.current.isConnecting).toEqual(false);
    });
  });

  //

  describe('when connecting to device', () => {
    it('should connect and set current device', async () => {
      const { result } = await initRender();

      // test second connect
      act(() => result.current.connectToDevice(testDevices[0]));

      expect(mockConnect).toBeCalledTimes(2);
      expect(mockConnect).toBeCalledWith(testDevices[0]);
      expect(result.current.currentDevice).toEqual(testDevices[0]);
    });
  });

  //

  describe('when new device is paired', () => {
    it('should set it as current device and add it to storage', async () => {
      const { result } = await initRender();

      act(() => result.current.onNewDevicePaired(newDevice));

      expect(result.current.currentDevice).toEqual(newDevice);
      expect(AsyncStorage.setItem).toBeCalledWith(
        'CURRENT_DEVICE_KEY',
        JSON.stringify(newDevice)
      );
    });
  });

  describe('when device is removed', () => {
    it('should disconnect and remove it from storage', async () => {
      const { result } = await initRender();

      mockDisconnect.mockClear();

      act(() => result.current.removeDevice(testDevices[1]));

      expect(mockDisconnect).toBeCalledTimes(1);
      expect(AsyncStorage.setItem).toBeCalledWith(
        'DEVICES_KEY',
        JSON.stringify([testDevices[0]])
      );
    });
  });

  //

  describe('when goind background and then foreground', () => {
    it('should disconnect and then connect', async () => {
      await initRender();

      mockDisconnect.mockClear();

      console.log('- - - - BACKGROUND - - - - ');

      act(() => mockBackground());

      expect(mockDisconnect).toBeCalledTimes(1);

      mockConnect.mockClear();

      console.log('- - - - FOREGROUND - - - - ');

      act(() => mockForeground());

      expect(mockConnect).toBeCalledTimes(1);
      expect(mockConnect).toBeCalledWith(testDevices[1]);
    });
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

//

const newDevice = {
  id: '67',
  name: 'new-device'
};

//

const mockConnect = jest.fn();
const mockDisconnect = jest.fn();

jest.mock('../ble-connection/ble-connection', () => {
  return () => {
    return {
      default: jest.fn(), // constructor
      connect: mockConnect,
      disconnect: mockDisconnect,
      onDisconnected: jest.fn()
    };
  };
});

jest.mock('react-native-appstate-hook');

//

async function initRender() {
  mockStorage();

  mockConnectSuccess();

  mockAppState();

  const res = renderHook(() => useBleDevices());

  // it should change state
  await res.waitForNextUpdate();

  return res;
}

//

let onStateBackground: () => void;
let onStateForeground: () => void;

function mockAppState() {
  (useAppState as jest.Mock).mockImplementation(
    ({ onBackground, onForeground }) => {
      onStateBackground = onBackground;
      onStateForeground = onForeground;
    }
  );
}

function mockBackground() {
  onStateBackground();
}

function mockForeground() {
  onStateForeground();
}

//

function mockStorage() {
  (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
    switch (key) {
      case 'DEVICES_KEY':
        return Promise.resolve(JSON.stringify(testDevices));

      case 'CURRENT_DEVICE_KEY':
        return Promise.resolve(JSON.stringify(testDevices[1]));
    }
  });
}

//

//

function mockConnectSuccess() {
  mockConnect.mockImplementation(() => Promise.resolve());
}

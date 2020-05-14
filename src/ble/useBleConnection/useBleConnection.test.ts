import { renderHook, act } from '@testing-library/react-hooks';
import useBleConnection, { BleDevice } from './useBleConnection';

describe('useBleConnection ', () => {
  //

  describe('when connect -> disconnect -> connect', () => {
    //
    // this test is a little big but we want to test this whole scenario
    it('should handle isConnecting, isConnected and currentDevice ', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useBleConnection()
      );

      // 1. test default values
      expect(result.current.isConnecting).toBe(false);
      expect(result.current.isConnected).toBe(false);
      expect(result.current.currentDevice).toBe(null);

      // 2. make connect always success
      mockConnect.mockImplementation(() => Promise.resolve());

      // 3. test connect
      act(() => result.current.connectToDevice(testDevice));

      expect(result.current.currentDevice).toBe(testDevice);

      await waitForNextUpdate();

      expect(result.current.isConnecting).toBe(false);
      expect(result.current.isConnected).toBe(true);
      expect(result.current.currentDevice).toBe(testDevice);

      // 4. test disconnect
      act(() => result.current.disconnect());

      expect(result.current.isConnected).toBe(false);
      expect(result.current.currentDevice).toBe(null);

      // 5. test connect again
      act(() => result.current.connectToDevice(testDevice));

      expect(result.current.currentDevice).toBe(testDevice);

      await waitForNextUpdate();

      expect(result.current.isConnecting).toBe(false);
      expect(result.current.isConnected).toBe(true);
      expect(result.current.currentDevice).toBe(testDevice);
    });
  });

  //

  describe('when connect fails', () => {
    it('should handle isConnecting and isConnected', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useBleConnection()
      );

      // 1. test default values
      expect(result.current.isConnecting).toBe(false);
      expect(result.current.isConnected).toBe(false);

      // 2. mock connect always fail
      mockConnect.mockImplementation(() => Promise.reject());

      // 3. test connect fail
      act(() => result.current.connectToDevice(testDevice));

      expect(result.current.currentDevice).toBe(testDevice);

      await waitForNextUpdate();

      expect(result.current.isConnecting).toBe(false);
      expect(result.current.isConnected).toBe(false);
      expect(result.current.currentDevice).toBe(null);
    });
  });

  //

  describe('when new device is paired', () => {
    it('should set isConnected to true', () => {
      const { result } = renderHook(() => useBleConnection());

      expect(result.current.isConnected).toBe(false);

      act(() => result.current.onNewPairedDevice(testDevice));

      expect(result.current.isConnected).toBe(true);
      expect(result.current.currentDevice).toBe(testDevice);
    });
  });
});

//
// - - - SETUP - - -
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

beforeEach(() => {
  jest.resetAllMocks();
});

//

const testDevice = {
  id: '123',
  name: 'testDevice'
};

import 'react-native';
import React from 'react';
import {
  render,
  fireEvent,
  act,
  waitForElement
} from 'react-native-testing-library';
import ScanDevicesScreenContainer from './ScanDevicesScreenContainer';
import ScanDevicesScreen from './ScanDevicesScreen';

describe('ScanDevicesScreenContainer', () => {
  it('should render ScanDevicesScreen with scanned devices', () => {
    mockScan.mockImplementation((onNewDevice) => {
      onNewDevice(testDevices[0]);
      onNewDevice(testDevices[1]);
    });

    const { getByType } = render(
      <ScanDevicesScreenContainer
        onDeviceConnected={() => {}}
        onClose={() => {}}
      />
    );

    const screen = getByType(ScanDevicesScreen);

    expect(screen).not.toBeNull();
    expect(screen.props.devices).toContainEqual(testDevices[0]);
    expect(screen.props.devices).toContainEqual(testDevices[1]);
  });

  //

  describe('when connected', () => {
    it('should call onDeviceConnected', async () => {
      mockConnect.mockImplementation(() => Promise.resolve());

      const mockOnDeviceConnected = jest.fn();

      const { getByType } = render(
        <ScanDevicesScreenContainer
          onDeviceConnected={mockOnDeviceConnected}
          onClose={() => {}}
        />
      );

      const screen = getByType(ScanDevicesScreen);

      mockOnDeviceConnected.mockClear();

      // mock device press to connect
      act(() => screen.props.onDevicePress(testDevices[0]));

      // probably not the best way...
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(mockOnDeviceConnected).toBeCalled();
    });
  });

  //

  describe('when unmount', () => {
    it('should stop connecting', () => {
      const { unmount } = render(
        <ScanDevicesScreenContainer
          onDeviceConnected={() => {}}
          onClose={() => {}}
        />
      );

      mockStopConnecting.mockClear();

      act(() => unmount());

      expect(mockStopConnecting).toBeCalled();
    });
  });
});

beforeEach(() => jest.resetAllMocks());

//
// SETUP
//

const mockScan = jest.fn();
const mockStopScan = jest.fn();
/*
    Hmm - should we mock ble as general here or
    we should mock useBleScanning / useBleConnection?
    We should not look into component's details
    but either way we have to do it just to mock
    ble devices...
*/
jest.mock('../../../ble/ble-scanning/ble-scanning', () => {
  return () => {
    return {
      default: jest.fn(), // constructor
      startScanning: mockScan,
      stopScanning: mockStopScan
    };
  };
});

//

const mockConnect = jest.fn();
const mockDisconnect = jest.fn();
const mockStopConnecting = jest.fn();

jest.mock('../../../ble/ble-connection/ble-connection', () => {
  return () => {
    return {
      default: jest.fn(), // constructor
      connect: mockConnect,
      disconnect: mockDisconnect,
      onDisconnected: jest.fn(),
      stopConnecting: mockStopConnecting
    };
  };
});

//

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

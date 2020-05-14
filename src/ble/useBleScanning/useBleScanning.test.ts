import { renderHook, act } from '@testing-library/react-hooks';
import useBleScanning from './useBleScanning';

//

describe('useBleScanning ', () => {
  //

  it('should return devices from scanning', () => {
    mockScan.mockImplementation((onNewDevice) => {
      onNewDevice(testDevices[0]);
      onNewDevice(testDevices[1]);
    });

    const { result } = renderHook(() => useBleScanning());

    expect(result.current.devices.length).toEqual(2);
    expect(result.current.devices).toContainEqual(testDevices[0]);
    expect(result.current.devices).toContainEqual(testDevices[1]);
  });

  //

  it('should start scanning after mount', () => {
    renderHook(() => useBleScanning());

    expect(mockScan).toBeCalled();
  });

  //

  it('should stop scanning after unmount', () => {
    const { unmount } = renderHook(() => useBleScanning());

    mockStopScan.mockClear();

    unmount();

    expect(mockStopScan).toBeCalled();
  });
});

beforeEach(() => {
  jest.resetAllMocks();
});

//
// - - - SETUP - - -
//

const mockScan = jest.fn();
const mockStopScan = jest.fn();

jest.mock('../ble-scanning/ble-scanning', () => {
  return () => {
    return {
      default: jest.fn(), // constructor
      startScanning: mockScan,
      stopScanning: mockStopScan
    };
  };
});

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

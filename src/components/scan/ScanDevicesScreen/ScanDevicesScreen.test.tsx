import 'react-native';
import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import ScanDevicesScreen from './ScanDevicesScreen';
import DeviceItem from '../DeviceItem/DeviceItem';
import { ReactTestInstance } from 'react-test-renderer';

describe('ScanDevicesScreen ', () => {
  //

  it('should render scanning info', () => {
    const { getByText } = render(
      <ScanDevicesScreen
        devices={[]}
        onClose={() => {}}
        onDevicePress={() => {}}
        isConnecting={false}
        currentDevice={null}
      />
    );

    expect(getByText('Scanning...')).not.toBeNull();
  });

  //

  it('should render devices', () => {
    const { getAllByType } = render(
      <ScanDevicesScreen
        devices={testDevices}
        onClose={() => {}}
        onDevicePress={() => {}}
        isConnecting={false}
        currentDevice={null}
      />
    );

    expect(getAllByType(DeviceItem).length).toBe(2);
  });

  //

  describe('when first device is clicked', () => {
    it('should call onDevicePress', () => {
      const onDevicePress = jest.fn();

      const { getByProps } = render(
        <ScanDevicesScreen
          devices={testDevices}
          onClose={() => {}}
          onDevicePress={onDevicePress}
          isConnecting={false}
          currentDevice={null}
        />
      );

      // children[0] because DeviceItem wraps TouchableOpacity
      fireEvent.press(
        getByProps({ name: 'testDevice' }).children[0] as ReactTestInstance
      );

      expect(onDevicePress).toBeCalledWith(testDevices[0]);

      fireEvent.press(
        getByProps({ name: 'otherDevice' }).children[0] as ReactTestInstance
      );

      expect(onDevicePress).toBeCalledWith(testDevices[1]);
    });
  });
});

beforeEach(() => jest.resetAllMocks());

//
// SETUP
//

const testDevices = [
  {
    id: '123',
    name: 'testDevice'
  },
  {
    id: '5',
    name: 'otherDevice'
  }
];

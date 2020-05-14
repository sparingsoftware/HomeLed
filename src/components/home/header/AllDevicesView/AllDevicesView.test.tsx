import 'react-native';
import React from 'react';
import { render, fireEvent, act } from 'react-native-testing-library';
import AllDevicesView from './AllDevicesView';
import { BleDevice } from '../../../../ble/useBleConnection/useBleConnection';
import { DevicesContext } from '../../../../ble/context/context';

//

describe('AllDevicesView', () => {
  //

  it('should render list of devices', () => {
    const { getByText } = renderWrapper();

    expect(getByText(testDevices[0].name)).toBeTruthy();
    expect(getByText(testDevices[1].name)).toBeTruthy();
    expect(getByText(testDevices[2].name)).toBeTruthy();
  });

  //

  describe('when device is clicked', () => {
    it('should call onDeviceSelect', () => {
      const { getByText, onDeviceSelectMock } = renderWrapper();

      const device = getByText(testDevices[0].name);

      fireEvent.press(device);

      expect(onDeviceSelectMock).toBeCalledWith(testDevices[0]);
    });
  });

  //

  describe('when clicked remove on device', () => {
    it('should call removeDevice on Context', () => {
      const { getByProps, removeDeviceMock } = renderWrapper();

      const device = getByProps({ name: testDevices[2].name });

      act(() => device.props.onRemove());

      expect(removeDeviceMock).toBeCalledWith(testDevices[2]);
    });
  });
});

beforeEach(() => jest.resetAllMocks());

//
// SETUP
//

const testDevices: BleDevice[] = [
  {
    id: '1',
    name: 'Test Device'
  },
  {
    id: '2',
    name: 'Devicowe'
  },
  {
    id: '3',
    name: 'Kitchen'
  }
];

//

function renderWrapper(isVisible: boolean = true) {
  const onDeviceSelectMock = jest.fn();
  const removeDeviceMock = jest.fn();

  jest.useFakeTimers();

  const wrapper = (visible: boolean) => (
    <DevicesContext.Provider
      value={{ devices: testDevices, removeDevice: removeDeviceMock }}>
      <AllDevicesView isVisible={visible} onDeviceSelect={onDeviceSelectMock} />
    </DevicesContext.Provider>
  );

  return {
    ...render(wrapper(isVisible)),
    onDeviceSelectMock,
    removeDeviceMock
  };
}

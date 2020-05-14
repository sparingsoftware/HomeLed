import 'react-native';
import React from 'react';
import { render, fireEvent, act } from 'react-native-testing-library';
import { Header } from './Header';
import { BleDevice } from '../../../../ble/useBleConnection/useBleConnection';
import { ScanButton } from './Header.styled';

//

describe('Header', () => {
  //

  describe('when there is no current device', () => {
    it('should render Select device', () => {
      const { getByText } = render(
        <Header
          isListVisible={false}
          onScanPress={() => {}}
          onSelectPress={() => {}}
        />
      );

      expect(getByText('Select device')).toBeTruthy();
    });
  });

  //

  describe('when there is current device', () => {
    it('should render its name', () => {
      const { getByText } = render(
        <Header
          isListVisible={false}
          onScanPress={() => {}}
          onSelectPress={() => {}}
          currentDevice={currentDevice}
        />
      );

      expect(getByText('Cool Device')).toBeTruthy();
    });
  });

  //

  describe('when clicked on device button', () => {
    it('should call onSelectPress', () => {
      const onSelectPressMock = jest.fn();

      const { getByText } = render(
        <Header
          isListVisible={false}
          onScanPress={() => {}}
          onSelectPress={onSelectPressMock}
        />
      );

      const deviceButton = getByText('Select device');

      fireEvent.press(deviceButton);

      expect(onSelectPressMock).toBeCalled();
    });
  });

  //

  describe('when clicked on scan button', () => {
    it('should call onScanPress', () => {
      const onScanPressMock = jest.fn();

      const { getByType } = render(
        <Header
          isListVisible={false}
          onScanPress={onScanPressMock}
          onSelectPress={() => {}}
        />
      );

      const scanButton = getByType(ScanButton);

      fireEvent.press(scanButton);

      expect(onScanPressMock).toBeCalled();
    });
  });
});

//
// SETUP
//

const currentDevice: BleDevice = {
  id: '123',
  name: 'Cool Device'
};

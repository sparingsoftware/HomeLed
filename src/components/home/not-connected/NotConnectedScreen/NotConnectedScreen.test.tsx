import 'react-native';
import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import NotConnectedScreen from './NotConnectedScreen';
import { BleDevice } from '../../../../ble/useBleConnection/useBleConnection';

//

describe('NotConnectedScreen ', () => {
  it('should show text', () => {
    const { getByText } = render(<NotConnectedScreen device={testDevice} />);

    expect(getByText(/Not connected/)).not.toBeNull();
  });
});

//
// SETUP
//

const testDevice: BleDevice = {
  id: '123',
  name: 'deviceSuper'
};

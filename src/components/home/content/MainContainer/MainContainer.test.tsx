import 'react-native';
import React from 'react';
import { render, fireEvent, act } from 'react-native-testing-library';
import MainContainer from './MainContainer';
import { StateContext } from '../../../../state/context/context';
import StateContainer from '../../../../state/StateContainer/StateContainer';
import BleConnection from '../../../../ble/ble-connection/ble-connection';

//

describe('MainContainer ', () => {
  describe('when currentColor is changed', () => {
    it('should send it to device', () => {
      const { getByType } = render(<MainContainer />);

      const stateContainer = getByType(StateContainer);

      act(() => stateContainer.props.onColorSelect(testColor));

      expect(sendColorSpy).toBeCalledWith(testColor);
    });
  });

  //

  describe('when new device is paired', () => {
    it('should add it to ble devices', () => {
      // TODO
    });
  });

  //

  describe('when device is selected', () => {
    it('should connect to it', () => {
      // TODO
    });
  });
});

beforeEach(() => jest.clearAllMocks());

//
// SETUP
//

jest.mock('../../../../ble/ble-connection/ble-connection');

const sendColorSpy = jest.spyOn(BleConnection.prototype, 'sendColor');

const testColor = {
  h: 0.3,
  s: 0.5,
  v: 0.1
};

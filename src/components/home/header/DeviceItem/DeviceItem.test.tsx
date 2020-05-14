import 'react-native';
import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import DeviceItem from './DeviceItem';
import { TouchableOpacity } from 'react-native';

describe('DeviceItem', () => {
  it('should display name', () => {
    const { getByText } = render(
      <DeviceItem
        name={'Test Device'}
        onSelect={() => {}}
        onRemove={() => {}}
      />
    );

    expect(getByText('Test Device')).toBeTruthy();
  });

  //

  describe('when clicked select', () => {
    it('should call onSelect', () => {
      const onSelectMock = jest.fn();

      const { getByText } = render(
        <DeviceItem
          name={'Test Device'}
          onSelect={onSelectMock}
          onRemove={() => {}}
        />
      );

      fireEvent.press(getByText(/Test Device/));

      expect(onSelectMock).toBeCalled();
    });
  });

  //

  describe('when clicked remove', () => {
    it('should call onRemove', () => {
      const onRemoveMock = jest.fn();

      const { getAllByType } = render(
        <DeviceItem
          name={'Test Device'}
          onSelect={() => {}}
          onRemove={onRemoveMock}
        />
      );

      const buttons = getAllByType(TouchableOpacity);

      // click all buttons... not the best way...
      buttons.forEach((button) => fireEvent.press(button));

      expect(onRemoveMock).toBeCalled();
    });
  });
});

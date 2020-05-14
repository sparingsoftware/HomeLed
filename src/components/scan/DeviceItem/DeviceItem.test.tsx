import 'react-native';
import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import DeviceItem from './DeviceItem';
import { BorderLine } from './DeviceItem.styled';
import { TouchableOpacity } from 'react-native';

describe('DeviceItem ', () => {
  it('should render name', () => {
    const { getByText, queryByText } = render(
      <DeviceItem
        name={'Device1'}
        onSelect={() => {}}
        isPairing={false}
        isLastElem={false}
      />
    );

    expect(getByText('Device1')).not.toBeNull();
    expect(queryByText('pairing...')).toBeNull();
  });

  //

  describe('when pairing', () => {
    it('should render name and loading', () => {
      const { getByText } = render(
        <DeviceItem
          name={'Device1'}
          onSelect={() => {}}
          isPairing={true}
          isLastElem={false}
        />
      );

      expect(getByText('Device1')).not.toBeNull();
      expect(getByText('pairing...')).not.toBeNull();
    });
  });

  //

  describe('when clicked', () => {
    it('should callOnSelect', () => {
      const onSelect = jest.fn();

      const { getByType } = render(
        <DeviceItem
          name={'Device1'}
          onSelect={onSelect}
          isPairing={true}
          isLastElem={false}
        />
      );

      fireEvent.press(getByType(TouchableOpacity));

      expect(onSelect).toBeCalledTimes(1);
    });
  });
});

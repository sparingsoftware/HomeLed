import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext
} from 'react';
import { Animated, View, FlatList } from 'react-native';
import DeviceItem from '../DeviceItem/DeviceItem';
import { Container, List } from './AllDevicesView.styled';
import { BleDevice } from '../../../../ble/useBleConnection/useBleConnection';
import { DevicesContext } from '../../../../ble/context/context';

interface Props {
  isVisible: boolean;
  onDeviceSelect: (device: BleDevice) => void;
}

const AllDevicesView = ({ isVisible, onDeviceSelect }: Props) => {
  const topTransform = useRef(new Animated.Value(0));

  const { devices, removeDevice } = useContext(DevicesContext);

  useEffect(() => {
    Animated.timing(topTransform.current, {
      toValue: isVisible ? 0 : -300,
      useNativeDriver: true,
      duration: 150
    }).start();
  }, [isVisible]);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Container style={{ transform: [{ translateY: topTransform.current }] }}>
      <List
        data={devices}
        renderItem={({ item, index }) => (
          <DeviceItem
            key={index}
            name={item.name}
            onSelect={() => onDeviceSelect(item)}
            onRemove={() => removeDevice?.(item)}
          />
        )}
      />
    </Container>
  );
};

//

export default AllDevicesView;

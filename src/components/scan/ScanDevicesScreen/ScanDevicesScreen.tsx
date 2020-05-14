import React, { useEffect, useCallback } from 'react';
import { ActivityIndicator, LayoutAnimation } from 'react-native';
import DeviceItem from '../DeviceItem/DeviceItem';
import {
  Container,
  ExitButton,
  ExitButtonImage,
  Scanning,
  ScanningText,
  List
} from './ScanDevicesScreen.styled';
import useBleConnection, {
  BleDevice
} from '../../../ble/useBleConnection/useBleConnection';

//

const exitImage = require('assets/images/exit_button.png');

//

interface Props {
  onDevicePress: (device: BleDevice) => void;
  onClose: () => void;
  devices: BleDevice[];
  isConnecting: boolean;
  currentDevice?: BleDevice | null;
}

//

const LayoutAnimOpacity = {
  duration: 150,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  }
};

//

const ScanDevicesScreen = ({
  devices,
  onClose,
  onDevicePress,
  isConnecting,
  currentDevice
}: Props) => {
  useEffect(() => {
    // TODO: change to normal Animated because this layout does not handle delete...
    // TODO: check why delete (unmount) animation does not work!
    // LayoutAnimation.configureNext(LayoutAnimOpacity);
  }, []);

  return (
    <Container>
      <ExitButton onPress={onClose}>
        <ExitButtonImage source={exitImage} />
      </ExitButton>
      <List
        data={devices}
        renderItem={({ item, index }) => (
          <DeviceItem
            key={index}
            name={item.name}
            onSelect={() => onDevicePress(item)}
            isPairing={isConnecting && item.name === currentDevice?.name}
            isLastElem={index === devices.length - 1}
          />
        )}
        ListFooterComponent={() => (
          <Scanning>
            <ActivityIndicator color={'#fff'} />
            <ScanningText>{'Scanning...'}</ScanningText>
          </Scanning>
        )}
      />
    </Container>
  );
};

//

export default ScanDevicesScreen;

import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, View, Text } from 'react-native';
import { Container, ConnectingText } from './ConnectingScreen.styled';
import { BleDevice } from '../../../../ble/useBleConnection/useBleConnection';
//

interface Props {
  device: BleDevice;
}

//

const ConnectingScreen = ({ device }: Props) => {
  return (
    <Container>
      <ActivityIndicator color={'#fff'} />
      <ConnectingText>{`Connecting to ${device.name}...`}</ConnectingText>
    </Container>
  );
};

//

export default ConnectingScreen;

import React, { useEffect, useRef, useState } from 'react';
import { Container, NotConnectedText } from './NotConnectedScreen.styled';
import { BleDevice } from '../../../../ble/useBleConnection/useBleConnection';

interface Props {
  device: BleDevice;
}

const NotConnectedScreen = ({ device }: Props) => {
  return (
    <Container>
      <NotConnectedText>{`Not connected to ${device.name}.`}</NotConnectedText>
    </Container>
  );
};

//

export default NotConnectedScreen;

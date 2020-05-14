import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import styled from 'styled-components';
import { Container, ConnectingText } from './NoDevicesScreen.styled';

const NoDevicesScreen = () => {
  return (
    <Container>
      <ConnectingText>{`Select device`}</ConnectingText>
    </Container>
  );
};

//

export default NoDevicesScreen;

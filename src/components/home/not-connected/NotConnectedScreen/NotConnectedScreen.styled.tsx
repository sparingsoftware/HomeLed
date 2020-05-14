import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { BleDevice } from '../connection/ble/useBleConnection';

export const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

export const NotConnectedText = styled(Text)`
  color: white;
  margin: 10px 20px 0px 20px;
  text-align: center;
  opacity: 0.7;
  font-size: 14px;
`;

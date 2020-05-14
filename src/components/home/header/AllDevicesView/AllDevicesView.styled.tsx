import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Animated, View, FlatList } from 'react-native';
import styled from 'styled-components';
import DeviceItem from '../DeviceItem/DeviceItem';
import { BleDevice } from '../../connection/ble/useBleConnection';

export const Container = styled(Animated.View)`
  width: 100%;
  max-height: 300px;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: black;
`;

// https://dev.to/acro5piano/use-styled-components-reactnative-s-flatlist-in-typescript-308e
export const List = styled(FlatList as new () => FlatList<BleDevice>)``;

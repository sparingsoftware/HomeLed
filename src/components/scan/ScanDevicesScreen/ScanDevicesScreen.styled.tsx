import styled from 'styled-components';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { BleDevice } from '../../../ble/useBleConnection/useBleConnection';

export const Container = styled(View)`
  background-color: black;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;

export const ExitButton = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  right: 5px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  padding: 20px 0 20px 0;
`;

export const ExitButtonImage = styled(Image)``;

export const Scanning = styled(View)`
  width: 100%;
  margin-top: 30px;
`;

export const ScanningText = styled(Text)`
  color: white;
  font-size: 14px;
  text-align: center;
  opacity: 0.3;
  margin-top: 10px;
`;

// https://dev.to/acro5piano/use-styled-components-reactnative-s-flatlist-in-typescript-308e
export const List = styled(FlatList as new () => FlatList<BleDevice>)`
  margin-top: 50px;
`;

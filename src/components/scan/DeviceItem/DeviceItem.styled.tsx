import { Text, TouchableOpacity, View, LayoutAnimation } from 'react-native';
import styled from 'styled-components';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled(Text)`
  color: white;
  font-size: 20px;
`;

export const ConnectingText = styled(Text)`
  color: white;
  font-size: 14px;
  opacity: 0.6;
`;

export const BorderLine = styled(View)`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 0;
  height: 1px;
  background-color: white;
  opacity: 0.2;
`;

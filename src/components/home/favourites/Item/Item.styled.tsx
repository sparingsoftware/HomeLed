import { TouchableOpacity, View, Animated } from 'react-native';
import styled from 'styled-components';

export const Container = styled(TouchableOpacity)`
  margin: 2px;
  overflow: hidden;
`;

export const Background = styled(Animated.View)``;

export const DarkBar = styled(View)`
  width: 100%;
  height: 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1;
`;

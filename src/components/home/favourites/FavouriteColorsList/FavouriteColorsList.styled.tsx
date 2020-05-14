import React from 'react';
import { FlatList, View, Alert, Animated, Text } from 'react-native';
import styled from 'styled-components';
import { ColorVal } from '../../../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(Animated.View)`
  flex: 1;
  width: 100%;
`;

const DimView = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
`;
export const DimLine = () => {
  return <DimView colors={['rgba(0, 0, 0, 1.0)', 'rgba(0, 0, 0, 0.0)']} />;
};

export const EmptyText = styled(Text)`
  color: white;
  margin-top: 10px;
  opacity: 0.7;
  font-size: 14px;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  text-align: center;
`;

// https://dev.to/acro5piano/use-styled-components-reactnative-s-flatlist-in-typescript-308e
const AnimatedList = Animated.createAnimatedComponent(
  FlatList as new () => FlatList<ColorVal>
);
export const List = styled(AnimatedList)`
  width: 100%;
  flex: 1;
`;

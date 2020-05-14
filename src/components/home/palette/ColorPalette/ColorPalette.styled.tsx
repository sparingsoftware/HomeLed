import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import styled from 'styled-components';
import Slider from '@react-native-community/slider';
// @ts-ignore
import { ColorWheel as ColorWheel_ } from 'react-native-color-wheel';

export const Container = styled(View)`
  width: 100%;
  height: 300px;
  background-color: black;
  display: flex;
  flex-direction: row;
`;

export const AlphaSlider = styled(Slider)`
  height: 50px;
  width: 100%;
`;

export const SliderContainer = styled(View)`
  transform: rotate(-90deg);
  width: 200px;
  height: 50px;
  position: absolute;
  bottom: 100px;
  right: -65px;
  overflow: hidden;
`;

export const RightPanel = styled(View)`
  width: 50px;
  height: 100%;
  overflow: hidden;
`;

export const SaveButton = styled(TouchableOpacity)`
  position: absolute;
  left: 10px;
  bottom: 10px;
`;

export const SaveButtonImage = styled(Image)`
  margin: 8px;
`;

const AnimatedColorWheel = Animated.createAnimatedComponent(ColorWheel_);
export const ColorWheel = styled(AnimatedColorWheel)`
  flex: 1;
`;

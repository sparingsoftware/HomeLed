import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const MainSelect = styled(TouchableOpacity)`
  height: 100%;
  width: 150px;
  justify-content: center;
`;

export const TitleText = styled(Text)`
  color: white;
  font-size: 16px;
  text-align: center;
`;

export const RemoveButton = styled(TouchableOpacity)`
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 0;
  width: 50px;
  justify-content: center;
  align-items: center;
`;

export const RemoveImage = styled(Image)`
  width: 14px;
  height: 14px;
  opacity: 0.7;
`;

export const BorderLine = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: white;
  opacity: 0.2;
`;

import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  background-color: black;
  justify-content: center;
  align-items: center;
  overflow: visible;
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

export const TitleButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 100%;
`;

export const TitleText = styled(Text)`
  font-size: 20px;
  color: white;
  font-weight: 600;
`;

export const TitleImage = styled(Image)`
  margin-left: 8px;
  opacity: 0.7;
`;

export const ScanButton = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 0 20px 0 20px;
  align-items: center;
  justify-content: center;
`;

export const ScanImage = styled(Image)``;

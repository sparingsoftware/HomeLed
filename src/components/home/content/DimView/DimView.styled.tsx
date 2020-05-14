import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Animated, LayoutAnimation } from 'react-native';
import styled from 'styled-components';

export const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.7;
`;

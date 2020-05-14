import React, { useEffect, useRef, useState, useCallback } from 'react';
import { HSV, HSVtoRGB } from '../../../../theme/colors';
import { Container, DarkBar, Background } from './Item.styled';
import { Animated } from 'react-native';

interface Props {
  style: object;

  id: number;
  color: HSV;

  // scrolling aimation
  scrollPosAnim: any; // ref to scroll?
  scrollPos: number;

  // actions
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
}

export const Item = ({
  style,
  id,
  color = { h: 0.1, s: 0.1, v: 1.0 },
  scrollPosAnim,
  scrollPos,
  onPress,
  onLongPress
}: Props) => {
  const colorLight: HSV = { h: color.h, s: color.s, v: 1.0 };

  useEffect(() => {
    console.log('MOUNT ITEM! ', id);
  }, [id]);

  const backgroundColor = HSVtoRGB(colorLight);

  // TODO: add some scroll animation
  // const opacityScrollAnim = scrollPosAnim.interpolate({
  //   inputRange: [scrollPos - 250, scrollPos],
  //   outputRange: [0.1, 1.0]
  // });

  return (
    <Container
      activeOpacity={0.7}
      onPress={() => onPress(id)}
      onLongPress={() => onLongPress(id)}>
      <Background
        style={[
          style,
          {
            backgroundColor
          }
        ]}>
        <DarkBar style={{ backgroundColor: HSVtoRGB(color) }} />
      </Background>
    </Container>
  );
};

export default Item;

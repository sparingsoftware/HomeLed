import React, { useEffect, useRef, useState, useContext } from 'react';
import { HSV, HSVtoRGB, rawHSVtoRGB, hsvToHex } from '../../../../theme/colors';
import {
  AlphaSlider,
  Container,
  SaveButton,
  SaveButtonImage,
  ColorWheel,
  SliderContainer,
  RightPanel
} from './ColorPalette.styled';
import { Animated, View } from 'react-native';
//

const addImage = require('assets/images/add_button.png');

interface Props {
  currentAlpha: number;
  currentColor?: HSV;

  onColorSelected: (color: HSV) => void;
  onAlphaSelected: (alpha: number) => void;
  onAddColor: () => void;
}

const StartColor = '#ffffff';

const ColorPalette = ({
  currentAlpha,
  currentColor,
  onColorSelected,
  onAlphaSelected,
  onAddColor
}: Props) => {
  const showAnim = useRef(new Animated.Value(0)).current;

  const wheelRef = useRef(null);

  function show() {
    Animated.spring(showAnim, {
      toValue: 1.0,
      useNativeDriver: true
    }).start();
  }

  useEffect(() => {
    show();
  }, []);

  // scroll when currentColor changed
  useEffect(() => {
    if (currentColor) {
      // this 'forceUpdate' is a hack (not officially documented) - it may not work properly
      setTimeout(
        () => wheelRef.current?.forceUpdate(hsvToHex(currentColor)),
        300
      );
    }
  }, [currentColor]);

  return (
    <Container>
      <ColorWheel
        ref={wheelRef}
        style={{
          opacity: showAnim
        }}
        initialColor={StartColor}
        onColorChangeComplete={(color: any) => {
          if (color) {
            console.log('WHEEL COLOR = ', color);

            onColorSelected(color);
          }
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        thumbStyle={{ height: 30, width: 30, borderRadius: 30 }}
      />
      <RightPanel>
        <SliderContainer>
          <AlphaSlider
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#333"
            value={currentAlpha}
            onSlidingComplete={(val) => onAlphaSelected(val)}
          />
        </SliderContainer>
      </RightPanel>
      <SaveButton onPress={onAddColor}>
        <SaveButtonImage source={addImage} />
      </SaveButton>
    </Container>
  );
};

//

export default ColorPalette;

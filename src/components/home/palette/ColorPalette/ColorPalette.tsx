import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback
} from 'react';
import {
  HSV,
  HSVtoRGB,
  rawHSVtoRGB,
  hsvToHex,
  isColorEqual
} from '../../../../theme/colors';
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
import { useThrottleCallback } from '@react-hook/throttle';

//

const addImage = require('assets/images/add_button.png');

interface Props {
  currentAlpha: number;
  currentColor?: HSV;

  onColorSelected: (color: HSV) => void;
  onAlphaSelected: (alpha: number) => void;
  onAddColor: () => void;
}

//

const StartColor = '#ffffff';

const ThrottleChangeFps = 4;

//

const ColorPalette = ({
  currentAlpha,
  currentColor,
  onColorSelected,
  onAlphaSelected,
  onAddColor
}: Props) => {
  const showAnim = useRef(new Animated.Value(0)).current;

  const wheelRef = useRef(null);

  // this is because ColorWheel may call onColorChange at start and we don't want to send this
  const isStartChange = useRef(true);

  //

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
      // TODO scroll
    }
  }, [currentColor]);

  const onThrottleColorSelected = useThrottleCallback(
    onColorSelected,
    ThrottleChangeFps,
    false
  );
  const onThrottleAlphaSelected = useThrottleCallback(
    onAlphaSelected,
    ThrottleChangeFps,
    false
  );

  function onColorChange(color: HSV) {
    if (!isStartChange.current) {
      onThrottleColorSelected(color);
    }

    isStartChange.current = false;
  }

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
            onThrottleColorSelected(color);
          }
        }}
        onColorChange={(color: any) => {
          if (color) {
            onColorChange(color);
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
            onSlidingComplete={(val) => onThrottleAlphaSelected(val)}
            onValueChange={(val) => onThrottleAlphaSelected(val)}
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

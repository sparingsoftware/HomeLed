import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  TitleText,
  BorderLine,
  ScanImage,
  ScanButton,
  TitleButton,
  TitleImage
} from './Header.styled';
import { BleDevice } from '../../../../ble/useBleConnection/useBleConnection';

//

const arrowDownImage = require('assets/images/arrow_down.png');
const addImage = require('assets/images/add_small_button.png');

//

type Props = {
  onSelectPress: () => void;
  onScanPress: () => void;
  currentDevice?: BleDevice | null;
  isListVisible: Boolean;
};

//

export const Header = ({
  onSelectPress,
  onScanPress,
  currentDevice,
  isListVisible
}: Props) => {
  const title = currentDevice ? currentDevice.name : 'Select device';

  return (
    <Container>
      <TitleButton onPress={onSelectPress} activeOpacity={0.7}>
        <TitleText>{title}</TitleText>
        <TitleImage
          source={arrowDownImage}
          style={{
            transform: [{ rotateX: isListVisible ? '180deg' : '0deg' }]
          }}
        />
      </TitleButton>

      <ScanButton onPress={onScanPress} activeOpacity={0.7}>
        <ScanImage source={addImage} />
      </ScanButton>

      <BorderLine />
    </Container>
  );
};

//

export default Header;

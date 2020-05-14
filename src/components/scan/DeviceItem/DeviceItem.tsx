import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  TitleText,
  ConnectingText,
  BorderLine
} from './DeviceItem.styled';

//

interface Props {
  name: string;
  isPairing: Boolean;
  isLastElem: Boolean;
  onSelect: () => void;
}

//

const DeviceItem = ({ name, onSelect, isPairing, isLastElem }: Props) => {
  return (
    <Container onPress={onSelect}>
      <TitleText>{name}</TitleText>
      {isPairing && <ConnectingText>{'pairing...'}</ConnectingText>}
      {!isLastElem && <BorderLine />}
    </Container>
  );
};

//

export default DeviceItem;

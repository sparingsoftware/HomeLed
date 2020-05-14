import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  BorderLine,
  TitleText,
  MainSelect,
  RemoveButton,
  RemoveImage
} from './DeviceItem.styled';

const removeImage = require('assets/images/exit_button.png');

interface Props {
  name: string;
  onSelect: () => void;
  onRemove: () => void;
}

const DeviceItem = ({ name, onSelect, onRemove }: Props) => {
  return (
    <Container>
      <MainSelect onPress={onSelect}>
        <TitleText>{name}</TitleText>
      </MainSelect>
      <RemoveButton onPress={onRemove}>
        <RemoveImage source={removeImage} />
      </RemoveButton>

      <BorderLine />
    </Container>
  );
};

//

export default DeviceItem;

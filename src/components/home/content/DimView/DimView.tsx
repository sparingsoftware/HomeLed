import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Animated, LayoutAnimation } from 'react-native';
import styled from 'styled-components';
import { Container } from './DimView.styled';

//

const LayoutAnimOpacity = {
  duration: 150,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  }
};

const DimView = () => {
  useEffect(() => {
    // TODO: check why delete (unmount) animation does not work!
    LayoutAnimation.configureNext(LayoutAnimOpacity);
  }, []);

  return <Container />;
};

//

export default DimView;

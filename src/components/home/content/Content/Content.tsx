import React, { useEffect, useRef, useState } from 'react';
import ColorPaletteContainer from '../../palette/ColorPalette/ColorPaletteContainer';
import ConnectingScreen from '../../connecting/ConnectingScreen/ConnectingScreen';
import NotConnectedScreen from '../../not-connected/NotConnectedScreen/NotConnectedScreen';
import NoDevicesScreen from '../../empty/NoDevicesScreen/NoDevicesScreen';
import { BleDevice } from '../../../../ble/useBleConnection/useBleConnection';
import FavouriteColors from '../../favourites/FavouriteColorsList/FavouriteColorsList';

interface Props {
  isConnecting: boolean;
  isConnected: boolean;
  currentDevice?: BleDevice | null;
}

const Content = ({ isConnecting, isConnected, currentDevice }: Props) => {
  if (!currentDevice) {
    return <NoDevicesScreen />;
  }

  if (isConnecting) {
    return <ConnectingScreen device={currentDevice} />;
  }

  if (!isConnected) {
    return <NotConnectedScreen device={currentDevice} />;
  }

  return (
    <>
      <ColorPaletteContainer />
      <FavouriteColors />
    </>
  );
};

//

export default Content;

import React, { useEffect, useRef, useState, createContext } from 'react';
import { ColorVal, HSV } from '../../../../theme/colors';
import Content from '../Content/Content';
import ScanDevicesScreenContainer from '../../../scan/ScanDevicesScreen/ScanDevicesScreenContainer';
import useBleStorage from '../../../../ble/useBleStorage/useBleStorage';
import ContainerHeaderWrapper from '../ContainerHeaderWrapper/ContainerHeaderWrapper';
import useAppState from 'react-native-appstate-hook';
import { Container } from './MainContainer.styled';
import useBleConnection, {
  BleDevice
} from '../../../../ble/useBleConnection/useBleConnection';
import FavouritesContainer from '../../../../favourites/FavouritesContainer/FavouritesContainer';
import { DevicesContext } from '../../../../ble/context/context';
import useBleDevices from '../../../../ble/useBleDevices/useBleDevices';
import StateContainer from '../../../../state/StateContainer/StateContainer';

const MainContainer = () => {
  const {
    devices,
    currentDevice,
    isConnected,
    isConnecting,
    connectToDevice,
    onNewDevicePaired,
    removeDevice,
    sendColorToCurrentDevice
  } = useBleDevices();

  const [isScanning, setIsScanning] = useState(false);

  // we have connected to a new scanned device
  function onNewDeviceConnected(device: BleDevice) {
    setIsScanning(false);

    onNewDevicePaired(device);
  }

  function onScanPress() {
    setIsScanning(true);
  }

  function onDeviceSelect(device: BleDevice) {
    connectToDevice(device);
  }

  function onColorSelect(color: HSV) {
    sendColorToCurrentDevice(color);
  }

  return (
    <Container>
      <FavouritesContainer>
        <StateContainer onColorSelect={onColorSelect}>
          <DevicesContext.Provider
            value={{
              devices: devices,
              removeDevice: removeDevice
            }}>
            <ContainerHeaderWrapper
              currentDevice={currentDevice}
              onScanPress={onScanPress}
              onDeviceSelect={onDeviceSelect}>
              <Content
                isConnected={isConnected}
                isConnecting={isConnecting}
                currentDevice={currentDevice}
              />
            </ContainerHeaderWrapper>

            {isScanning && (
              <ScanDevicesScreenContainer
                onClose={() => setIsScanning(false)}
                onDeviceConnected={onNewDeviceConnected}
              />
            )}
          </DevicesContext.Provider>
        </StateContainer>
      </FavouritesContainer>
    </Container>
  );
};

//

export default MainContainer;

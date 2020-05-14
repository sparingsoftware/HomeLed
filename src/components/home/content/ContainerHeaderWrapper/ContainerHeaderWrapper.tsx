import React, { useEffect, useRef, useState, useContext } from 'react';
import { Container } from './ContainerHeaderWrapper.styled';
import { BleDevice } from '../../../../ble/useBleConnection/useBleConnection';
import AllDevicesView from '../../header/AllDevicesView/AllDevicesView';
import DimView from '../DimView/DimView';
import Header from '../../header/Header/Header';
import { DevicesContext } from '../../../../ble/context/context';

//

interface Props {
  children: any;
  onScanPress: () => void;
  currentDevice?: BleDevice | null;
  onDeviceSelect: (device: BleDevice) => void;
}
//
const ContainerHeaderWrapper = ({
  children,
  onScanPress,
  currentDevice,
  onDeviceSelect
}: Props) => {
  const { devices } = useContext(DevicesContext);

  const [isDevicesListVisible, setDevicesListVisible] = useState(false);

  function onShowDeviceListPress() {
    if (devices.length > 0) {
      setDevicesListVisible(!isDevicesListVisible);
    }
  }

  function _onScanPress() {
    onScanPress();

    setDevicesListVisible(false);
  }

  function _onDeviceSelect(device: BleDevice) {
    onDeviceSelect(device);

    setDevicesListVisible(false);
  }

  return (
    <Container>
      {children}

      {isDevicesListVisible && <DimView />}

      <AllDevicesView
        isVisible={isDevicesListVisible}
        onDeviceSelect={_onDeviceSelect}
      />

      <Header
        currentDevice={currentDevice}
        onScanPress={_onScanPress}
        onSelectPress={() => onShowDeviceListPress()}
        isListVisible={isDevicesListVisible}
      />
    </Container>
  );
};

//

export default ContainerHeaderWrapper;

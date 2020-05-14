import 'react-native';
import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import ConnectingScreen from './ConnectingScreen';

describe('ConnectingScreen ', () => {
  it('should render device name', () => {
    const { getByText } = render(
      <ConnectingScreen device={{ id: '2', name: 'CoolDevice' }} />
    );

    expect(getByText(/CoolDevice/)).not.toBeNull();
  });
});

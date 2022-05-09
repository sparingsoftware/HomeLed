import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

function isValidFunction(func) {
  return func && typeof func === 'function';
}

// https://github.com/amrlabib/react-native-appstate-hook/issues/17#issuecomment-1083334955
export const useAppState = (settings) => {
  const { onChange, onForeground, onBackground } = settings || {};
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active' && appState !== 'active') {
        isValidFunction(onForeground) && onForeground();
      } else if (
        appState === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        isValidFunction(onBackground) && onBackground();
      }
      setAppState(nextAppState);
      isValidFunction(onChange) && onChange(nextAppState);
    };
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [onChange, onForeground, onBackground, appState]);

  return { appState };
};

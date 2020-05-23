import { createContext } from 'react';
import { HSV } from '../../theme/colors';

interface ContextType {
  currentColor: HSV;
  currentAlpha: number;

  onColorSelect?: (color: HSV) => void;
  onAlphaSelect?: (alpha: number) => void;
}

export const StateContext = createContext<ContextType>({
  currentColor: { h: 0, s: 0, v: 1 },
  currentAlpha: 100
});

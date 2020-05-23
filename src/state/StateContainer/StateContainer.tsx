import React, { useState } from 'react';
import { HSV } from '../../theme/colors';
import { StateContext } from '../context/context';

interface Props {
  children: any;

  onColorSelect?: (color: HSV) => void;
  onAlphaSelect?: (alpha: number) => void;
}

const StateContainer = (props: Props) => {
  const [currentColor, setCurrentColor] = useState<HSV>({ h: 0, s: 0, v: 1 });
  const [currentAlpha, setCurrentAlpha] = useState(100);

  function onColorSelect(color: HSV) {
    setCurrentColor(color);

    props.onColorSelect?.(color);
  }

  function onAlphaSelect(alpha: number) {
    setCurrentAlpha(alpha);

    props.onAlphaSelect?.(alpha);
  }

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentAlpha,
        onColorSelect,
        onAlphaSelect
      }}>
      {props.children}
    </StateContext.Provider>
  );
};

//

export default StateContainer;

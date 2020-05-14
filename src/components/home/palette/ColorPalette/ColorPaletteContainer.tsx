import React, { useEffect, useRef, useState, useContext } from 'react';
import { HSV, hsvToHex } from '../../../../theme/colors';
import { FavouritesContext } from '../../../../favourites/context/context';
import ColorPalette from './ColorPalette';
import transformColor from '../transformColor/transformColor';
import { StateContext } from '../../../../state/context/context';
//

const ColorPaletteContainer = () => {
  const { addToFavourites } = useContext(FavouritesContext);

  const { onColorSelect } = useContext(StateContext);

  const [selectedColor, setSelectedColor] = useState<HSV>({ h: 0, s: 0, v: 0 });
  const [currentAlpha, setCurrentAlpha] = useState(100);

  const { currentColor } = useContext(StateContext);

  //

  // set state color as selected color
  useEffect(() => {
    setSelectedColor(currentColor);
    setCurrentAlpha(currentColor.v * 100);
  }, [currentColor]);

  function onAddColor() {
    addToFavourites?.(selectedColor);
  }

  function onColorSelected(color: HSV) {
    const newColor = transformColor(color, currentAlpha);

    setSelectedColor(newColor);

    onColorSelect?.(newColor);
  }

  function onAlphaSelected(alpha: number) {
    const newColor = {
      ...selectedColor,
      v: alpha / 100
    };

    setCurrentAlpha(alpha);

    setSelectedColor(newColor);

    onColorSelect?.(newColor);
  }

  //

  return (
    <ColorPalette
      currentAlpha={currentAlpha}
      currentColor={currentColor}
      onColorSelected={onColorSelected}
      onAlphaSelected={onAlphaSelected}
      onAddColor={onAddColor}
    />
  );
};

//

export default ColorPaletteContainer;

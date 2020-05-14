import 'react-native';
import React from 'react';
import { render, fireEvent, act } from 'react-native-testing-library';
import ColorPaletteContainer from './ColorPaletteContainer';
import { FavouritesContext } from '../../../../favourites/context/context';
import ColorPalette from './ColorPalette';
import { HSV } from '../../../../theme/colors';
import transformColor from '../transformColor/transformColor';
import { StateContext } from '../../../../state/context/context';

//

describe('ColorPaletteContainer', () => {
  //

  describe('when color and alpha is selected', () => {
    it('should call onColorSelect on context method', () => {
      const { getByType } = renderWrapper();

      const view = getByType(ColorPalette);

      act(() => view.props.onColorSelected(testColor));

      expect(onColorSelectSpy).toBeCalledWith(transformColor(testColor, 100));

      act(() => view.props.onAlphaSelected(35));

      expect(onColorSelectSpy).toBeCalledWith(transformColor(testColor, 35));
    });
  });

  //

  describe('when adding color to favourites', () => {
    it('should call addToFavourites on context method', () => {
      const { getByType } = renderWrapper();

      const view = getByType(ColorPalette);

      act(() => view.props.onColorSelected(testColor));
      act(() => view.props.onAddColor());

      expect(addToFavouritesSpy).toBeCalledWith(transformColor(testColor, 100));

      act(() => view.props.onAlphaSelected(35));
      act(() => view.props.onAddColor());

      expect(addToFavouritesSpy).toBeCalledWith(transformColor(testColor, 35));
    });
  });

  //

  describe('when currentColor from store is changed', () => {
    describe('and then alpha is changed', () => {
      it('should call onColorSelect on context method with new color', () => {
        const { getByType, rerenderWithNewColor } = renderWrapper();

        rerenderWithNewColor(changedTestColor);

        const view = getByType(ColorPalette);

        act(() => view.props.onAlphaSelected(35));

        expect(onColorSelectSpy).toBeCalledWith({
          ...changedTestColor,
          v: 0.35
        });
      });
    });
  });
});

beforeEach(() => jest.clearAllMocks());

//
// SETUP
//

const testColor = {
  h: 0.12,
  s: 0.5,
  v: 1
};

const changedTestColor = {
  h: 0.3,
  s: 0.2,
  v: 0
};

//

const addToFavouritesSpy = jest.fn();
const removeFromFavouritesSpy = jest.fn();
const onColorSelectSpy = jest.fn();

const renderWrapper = () => {
  const comp = (currentColor: HSV) => (
    <FavouritesContext.Provider
      value={{
        favourites: [],
        addToFavourites: addToFavouritesSpy,
        removeFromFavourites: removeFromFavouritesSpy
      }}>
      <StateContext.Provider
        value={{
          currentColor: currentColor,
          currentAlpha: 100,
          onColorSelect: onColorSelectSpy
        }}>
        <ColorPaletteContainer />
      </StateContext.Provider>
    </FavouritesContext.Provider>
  );

  const res = render(comp(testColor));

  return {
    ...res,
    rerenderWithNewColor: (newColor: HSV) => res.rerender(comp(newColor))
  };
};

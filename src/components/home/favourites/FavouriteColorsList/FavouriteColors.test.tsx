import 'react-native';
import React from 'react';
import {
  render,
  fireEvent,
  act,
  waitForElement
} from 'react-native-testing-library';
import { ColorVal } from '../../../../theme/colors';
import { FavouritesContext } from '../../../../favourites/context/context';
import FavouriteColors from './FavouriteColorsList';
import showRemoveAlert from '../../../../alerts/remove-alert/remove-alert';
import { StateContext } from '../../../../state/context/context';

//

describe('FavouriteColors', () => {
  //

  it('should render all favourites from Context', () => {
    const { getByProps } = renderWrapper();

    expect(getByProps({ id: testFavourites[0].id })).toBeTruthy();
    expect(getByProps({ id: testFavourites[1].id })).toBeTruthy();
    expect(getByProps({ id: testFavourites[2].id })).toBeTruthy();
  });

  //

  describe('when favourite is clicked', () => {
    it('should call onColorSelect on Context', () => {
      const { getByProps, onColorSelectMock } = renderWrapper();

      const item = getByProps({ id: testFavourites[0].id });

      fireEvent.press(item);

      expect(onColorSelectMock).toBeCalledWith(testFavourites[0].color);
    });
  });

  //

  describe('when favourite is long pressed', () => {
    it('should show remove alert and call removeFromFavourites on Context', async () => {
      const { getByProps, removeFromFavouritesMock } = renderWrapper();

      const item = getByProps({ id: testFavourites[0].id });

      (showRemoveAlert as jest.Mock).mockImplementation(() =>
        Promise.resolve()
      );

      // there is no fireEvent for longPress :/
      await act(() => item.props.onLongPress(0));

      expect(showRemoveAlert).toBeCalled();

      expect(removeFromFavouritesMock).toBeCalledWith(testFavourites[0].id);
    });
  });
});

beforeEach(() => jest.resetAllMocks());

//
// SETUP
//

jest.mock('../../../../alerts/remove-alert/remove-alert');

const testFavourites: ColorVal[] = [
  {
    id: 0,
    color: {
      h: 50,
      s: 10,
      v: 0
    }
  },
  {
    id: 1,
    color: {
      h: 200,
      s: 50,
      v: 20
    }
  },
  {
    id: 2,
    color: {
      h: 22,
      s: 0,
      v: 100
    }
  }
];

function renderWrapper() {
  const onColorSelectMock = jest.fn();
  const removeFromFavouritesMock = jest.fn();

  jest.useFakeTimers();

  const wrapper = () => (
    <FavouritesContext.Provider
      value={{
        favourites: testFavourites,
        removeFromFavourites: removeFromFavouritesMock
      }}>
      <StateContext.Provider
        value={{
          currentColor: { h: 0, s: 0, v: 0 },
          currentAlpha: 100,
          onColorSelect: onColorSelectMock
        }}>
        <FavouriteColors />
      </StateContext.Provider>
    </FavouritesContext.Provider>
  );

  return {
    ...render(wrapper()),
    onColorSelectMock,
    removeFromFavouritesMock
  };
}

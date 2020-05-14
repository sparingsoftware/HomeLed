import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import useFavourites from './useFavourites';
import { HSV, ColorVal } from '../../theme/colors';

describe('useFavourites', () => {
  //

  it('should return favourites from store', async () => {
    mockStorage(testColors);

    const { result, waitForValueToChange } = renderHook(() => useFavourites());

    await waitForValueToChange(() => result.current.favourites);

    expect(result.current.favourites).toContainEqual(testColors[0]);
    expect(result.current.favourites).toContainEqual(testColors[1]);
  });

  //

  describe('when added new color', () => {
    it('should save new favourites', async () => {
      mockStorage([testColors[0]]);

      const { result, waitForValueToChange } = renderHook(() =>
        useFavourites()
      );

      await waitForValueToChange(() => result.current.favourites);

      expect(result.current.favourites).toContainEqual(testColors[0]);

      act(() => result.current.addToFavourites(testColors[1].color));

      expect(result.current.favourites).toContainEqual(testColors[0]);
      expect(result.current.favourites).toContainEqual(testColors[1]);

      expectStorageSet('Save_Key', testColors);
    });
  });

  //

  describe('when removed color', () => {
    it('should remove favourite color', async () => {
      mockStorage(testColors);

      const { result, waitForValueToChange } = renderHook(() =>
        useFavourites()
      );

      await waitForValueToChange(() => result.current.favourites);

      expect(result.current.favourites).toContainEqual(testColors[0]);
      expect(result.current.favourites).toContainEqual(testColors[1]);

      act(() => result.current.removeFromFavourites(0));

      expect(result.current.favourites).toContainEqual(testColors[1]);

      expectStorageSet('Save_Key', [testColors[1]]);
    });
  });
});

beforeEach(() => jest.resetAllMocks());

//
// SETUP
//

const testColors = [
  {
    color: { h: 2, s: 50, v: 20 },
    id: 0
  },
  {
    color: { h: 23, s: 100, v: 20 },
    id: 1
  }
];

function mockStorage(colors: ColorVal[]) {
  (AsyncStorage.getItem as jest.Mock).mockImplementation(() => {
    return Promise.resolve(JSON.stringify(colors));
  });
}

function expectStorageSet(key: string, data: any) {
  expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(data));
}

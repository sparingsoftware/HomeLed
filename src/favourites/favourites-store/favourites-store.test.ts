import { Store } from './favourites-store';
import AsyncStorage from '@react-native-community/async-storage';

describe('Favourites store ', () => {
  it('should return favourites from store', async () => {
    mockStorage();

    const favs = await Store.getFavourites();

    expect(favs).toContainEqual(testColors[0]);
  });

  //

  it('should save new favourites', () => {
    Store.saveFavourites(testColors);

    expect(AsyncStorage.setItem).toBeCalledWith(
      'Save_Key',
      JSON.stringify(testColors)
    );
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
  }
];

function mockStorage() {
  (AsyncStorage.getItem as jest.Mock).mockImplementation(() => {
    return Promise.resolve(JSON.stringify(testColors));
  });
}

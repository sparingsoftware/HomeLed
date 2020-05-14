import AsyncStorage from '@react-native-community/async-storage';
import { ColorVal } from '../../theme/colors';

const SAVE_KEY = 'Save_Key';

export class Store {
  static async getFavourites(): Promise<ColorVal[]> {
    try {
      const value = (await AsyncStorage.getItem(SAVE_KEY)) || '';

      const favourites = JSON.parse(value);

      return favourites;
    } catch (error) {
      return [];
    }
  }

  //

  static saveFavourites(colors: ColorVal[]) {
    AsyncStorage.setItem(SAVE_KEY, JSON.stringify(colors));
  }
}

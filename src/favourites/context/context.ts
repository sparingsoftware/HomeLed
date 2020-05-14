import { createContext } from 'react';
import { ColorVal, HSV } from 'src/theme/colors';

interface ContextType {
  favourites: ColorVal[];

  addToFavourites?: (color: HSV) => void;
  removeFromFavourites?: (index: number) => void;
}

export const FavouritesContext = createContext<ContextType>({
  favourites: []
});

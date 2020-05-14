import { useEffect, useState } from 'react';
import { Store } from '../favourites-store/favourites-store';
import { HSV, ColorVal } from '../../theme/colors';

//

export default function useFavourites() {
  const [favourites, setFavourites] = useState<ColorVal[]>([]);

  // fetch start favourites
  useEffect(() => {
    Store.getFavourites().then((res) => setFavourites(res));
  }, []);

  // save values
  useEffect(() => {
    Store.saveFavourites(favourites);
  }, [favourites]);

  //

  function addToFavourites(color: HSV) {
    setFavourites([...favourites, { color: color, id: favourites.length }]);
  }

  function removeFromFavourites(id: number) {
    setFavourites(favourites.filter((f) => f.id !== id));
  }

  return {
    favourites,
    addToFavourites,
    removeFromFavourites
  };
}

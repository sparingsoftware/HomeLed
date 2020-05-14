import React from 'react';
import { ColorVal, HSV } from '../../theme/colors';
import useFavourites from '../useFavourites/useFavourites';
import { FavouritesContext } from '../context/context';

interface Props {
  children: any;
}

const FavouritesContainer = (props: Props) => {
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();

  return (
    <FavouritesContext.Provider
      value={{
        favourites: favourites,
        addToFavourites: addToFavourites,
        removeFromFavourites: removeFromFavourites
      }}>
      {props.children}
    </FavouritesContext.Provider>
  );
};

//

export default FavouritesContainer;

import { useCallback, useState, useRef, useEffect } from 'react';

//
// NOT USED !!
//
export default function useItemsShowAnimation(favourites: any[]) {
  const animItemDelay = 20;
  const lastShowItem = useRef(0);
  const [currentShowItem, setCurrentShowItem] = useState(0);

  const newItemShow = useCallback(() => {
    setCurrentShowItem(lastShowItem.current);

    if (favourites.length > lastShowItem.current) {
      lastShowItem.current++;

      setTimeout(() => {
        newItemShow();
      }, animItemDelay);
    }
  }, [favourites]);

  // show items animation
  useEffect(() => {
    newItemShow();
  }, [newItemShow]);

  return {
    currentShowItem
  };
}

import { useRef, useEffect } from 'react';
import { FlatList } from 'react-native';

export default function useNewItemScrollAnimation(favourites: any[]) {
  const listRef = useRef<FlatList<any> | null>(null);
  const favouritesNum = useRef(0);

  useEffect(() => {
    if (favourites.length === favouritesNum.current + 1) {
      favouritesNum.current++;

      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 200);
    } else {
      favouritesNum.current = favourites.length;
    }
  }, [favourites]);

  return listRef;
}

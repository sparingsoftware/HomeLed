import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback
} from 'react';
import {
  Container,
  List,
  DimLine,
  EmptyText
} from './FavouriteColorsList.styled';
import Item from '../Item/Item';
import showRemoveAlert from '../../../../alerts/remove-alert/remove-alert';
import { FavouritesContext } from '../../../../favourites/context/context';
import { HSV, ColorVal } from '../../../../theme/colors';
import useNewItemScrollAnimation from '../useNewItemScrollAnimation/useNewItemScrollAnimation';
import { Animated } from 'react-native';
import { StateContext } from '../../../../state/context/context';

//

const FavouriteColors = () => {
  const { favourites, removeFromFavourites } = useContext(FavouritesContext);

  const store = useContext(StateContext);

  const [size, setSize] = useState({ width: 0, height: 0 });

  const listRef = useNewItemScrollAnimation(favourites);

  const showAnim = useRef(new Animated.Value(0));

  const scrollPosAnim = useRef(new Animated.Value(0)).current;

  // set dynamic base on size width?
  const numColumns = 4;

  const itemStyle = {
    width: size.width / numColumns - 2,
    height: size.width / numColumns - 2
  };

  //

  // Start show animation
  useEffect(() => {
    Animated.spring(showAnim.current, {
      toValue: 1.0,
      useNativeDriver: true
    }).start();
  }, []);

  //

  function onItemPress(color: HSV) {
    store.onColorSelect?.(color);
  }

  function onItemLongPress(id: number) {
    showRemoveAlert().then(() => {
      removeFromFavourites?.(id);
    });
  }

  function onContainerLayout(event: any) {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }

  //

  const showAnimTranslate = showAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0]
  });
  const transform = [{ translateY: showAnimTranslate }];
  const opacity = showAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <Container style={{ transform, opacity }} onLayout={onContainerLayout}>
      <List
        ref={listRef}
        data={favourites}
        renderItem={({ item, index }) => (
          <Item
            style={itemStyle}
            id={item.id}
            color={(item as ColorVal).color}
            onPress={() => onItemPress(favourites[index].color)}
            onLongPress={(idx: number) => onItemLongPress(idx)}
            scrollPosAnim={scrollPosAnim}
            scrollPos={Math.floor(index / numColumns) * itemStyle.height}
          />
        )}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollPosAnim } } }],
          {
            useNativeDriver: true
          }
        )}
      />
      <DimLine />

      {favourites.length === 0 && (
        <EmptyText>{'Add color to favourites'}</EmptyText>
      )}
    </Container>
  );
};

export default FavouriteColors;

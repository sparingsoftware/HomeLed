import { renderHook, act } from '@testing-library/react-hooks';
import { ColorVal } from '../../../../theme/colors';
import useNewItemScrollAnimation from './useNewItemScrollAnimation';

//

jest.useFakeTimers();

describe('useNewItemScrollAnimation', () => {
  describe('when new favourite is inserted', () => {
    it('should scroll to bottom with animation', async () => {
      const { result, rerender } = renderHook(
        ({ favourites }) => useNewItemScrollAnimation(favourites),
        {
          initialProps: { favourites: testFavourites }
        }
      );

      result.current.current = mockList;

      rerender({ favourites: [...testFavourites, testNewFavourite] });

      jest.runAllTimers();

      expect(mockScrollToEnd).toBeCalledTimes(1);
      expect(mockScrollToEnd).toBeCalledWith({ animated: true });
    });
  });

  //

  describe('when loading initial favourites', () => {
    it('should not scroll to bottom', () => {
      const { result } = renderHook(() =>
        useNewItemScrollAnimation(testFavourites)
      );

      jest.runAllTimers();

      result.current.current = mockList;

      expect(mockScrollToEnd).toBeCalledTimes(0);
    });
  });
});

beforeEach(() => jest.clearAllMocks());

//
// SETUP
//

const testFavourites: ColorVal[] = [
  {
    id: 1,
    color: {
      h: 0.4,
      s: 0.1,
      v: 0
    }
  },
  {
    id: 2,
    color: {
      h: 0.7,
      s: 0.3,
      v: 0
    }
  },
  {
    id: 3,
    color: {
      h: 1.0,
      s: 0.1,
      v: 0.3
    }
  }
];

const testNewFavourite: ColorVal = {
  id: 5,
  color: {
    h: 1.0,
    s: 0.1,
    v: 0.3
  }
};

const mockScrollToEnd = jest.fn();

const mockList = {
  scrollToEnd: mockScrollToEnd
};

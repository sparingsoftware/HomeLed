import transformColor from './transformColor';
import { HSV } from '../../../../theme/colors';

//

describe('transformColor', () => {
  testTransform(
    {
      h: 180,
      s: 30,
      v: 0
    },
    50,
    {
      h: 0.5,
      s: 0.3,
      v: 0.5
    }
  );

  //

  testTransform(
    {
      h: 50,
      s: 83,
      v: 0
    },
    12,
    {
      h: 0.139,
      s: 0.83,
      v: 0.12
    }
  );

  //

  testTransform(
    {
      h: -170,
      s: 11,
      v: 0
    },
    100,
    {
      h: 0.528,
      s: 0.11,
      v: 1.0
    }
  );

  //

  testTransform(
    {
      h: -102,
      s: 99,
      v: 0
    },
    0,
    {
      h: 0.717,
      s: 0.99,
      v: 0
    }
  );

  //

  testTransform(
    {
      h: -30,
      s: 2,
      v: 0
    },
    5,
    {
      h: 0.917,
      s: 0.02,
      v: 0.05
    }
  );
});

//
// SETUP
//

function testTransform(color: HSV, alpha: number, result: HSV) {
  it(`for {color:${color}, alpha:${alpha}} should return {color:${result}}`, () => {
    expect(transformColor(color, alpha)).toEqual(result);
  });
}

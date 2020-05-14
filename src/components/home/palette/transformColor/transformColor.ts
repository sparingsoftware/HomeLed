import { HSV } from '../../../../theme/colors';

export default function transformColor(color: HSV, alpha: number) {
  return {
    h: parseFloat(Math.abs(((color.h + 360) % 360) / 360).toFixed(3)),
    s: color.s / 100,
    v: alpha / 100
  };
}

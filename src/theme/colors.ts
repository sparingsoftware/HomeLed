export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface ColorVal {
  color: HSV;
  id: number;
}

//
// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
// @ts-ignore
export function HSVtoRGB(hsv: HSV) {
  const { r, g, b } = rawHSVtoRGB(hsv);

  return `rgb(${r}, ${g}, ${b})`;
}

//

export function rawHSVtoRGB(hsv: HSV) {
  const h = hsv.h;
  const s = hsv.s;
  const v = hsv.v;

  var r = 0,
    g = 0,
    b = 0,
    i,
    f,
    p,
    q,
    t;

  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

//

function singleColorToHex(rgb: number) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
}

export function rgbToHex(r: number, g: number, b: number) {
  var red = singleColorToHex(r);
  var green = singleColorToHex(g);
  var blue = singleColorToHex(b);
  return red + green + blue;
}

export function hsvToHex(hsv: HSV) {
  const { r, g, b } = rawHSVtoRGB(hsv);
  return rgbToHex(r, g, b);
}

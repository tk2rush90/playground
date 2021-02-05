/**
 * destructure hex string
 * @param hex hex string
 */
function destructureHex(hex: string): number[] | void {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return [r, g, b];
  }
}

/**
 * convert hex to hsl
 * @param hex hex string
 */
export function toHSL(hex: string): number[] | void {
  const rgb = destructureHex(hex);

  if (rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number;
    let s: number;
    let l = (max + min) / 2;

    if (max === min) {
      h = 0;
      s = 0;
    } else {
      h = (max + min) / 2;

      const d = max - min;

      if (l > .5) {
        s = d / (2 - max - min);
      } else {
        s = d / (max + min);
      }

      switch (max) {
        case r: {
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        }

        case g: {
          h = (b - r) / d + 2;
          break;
        }

        case b: {
          h = (r - g) / d + 4;
          break;
        }
      }

      h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return [h, s, l];
  }
}

/**
 * return the rgb values from hex
 * @param hex hex string
 */
export function getRGB(hex: string): number[] | void {
  return destructureHex(hex);
}

const PLATE_PADDING = 15;
export const UNIT_1 = 60;
export const UNIT_0_25 = UNIT_1 / 4;

export function keyPosition(x, y) {
  return {
    x: x * UNIT_1 + PLATE_PADDING,
    y: y * UNIT_1 + PLATE_PADDING,
  };
}

export function keySize(w, h) {
  return {
    width: (w * UNIT_1) - 2,  // NOTE: 테두리 두께만큼 빼줌
    height: (h * UNIT_1) - 2,  // NOTE: 테두리 두께만큼 빼줌
  };
}

export function plateSize(w, h) {
  return {
    width: (w * UNIT_1) + PLATE_PADDING * 2,
    height: (h * UNIT_1) + PLATE_PADDING * 2,
  };
}

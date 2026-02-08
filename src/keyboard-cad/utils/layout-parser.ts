import { PLACEHOLDER_SIZE, PADDING } from '../constants';
import type { KeyDefinition, KeyPosition, LayoutJson } from '../types';

/**
 * Calculate the center position of a key in mm
 * From gen_scad.py lines 279-280:
 * x_pos = PADDING + PLACEHOLDER_SIZE * (x + (w - 1) / 2)
 * y_pos = PADDING + PLACEHOLDER_SIZE * (y + (h - 1) / 2)
 */
export function calculateKeyCenter(key: KeyDefinition): { x: number; y: number } {
  const w = key.w ?? 1;
  const h = key.h ?? 1;
  return {
    x: PADDING + PLACEHOLDER_SIZE * (key.x + (w - 1) / 2),
    y: PADDING + PLACEHOLDER_SIZE * (key.y + (h - 1) / 2),
  };
}

/**
 * Check if a key needs a stabilizer
 * From gen_scad.py line 286: if w >= 2 or h >= 2
 */
export function needsStabilizer(key: KeyDefinition): boolean {
  const w = key.w ?? 1;
  const h = key.h ?? 1;
  return w >= 2 || h >= 2;
}

/**
 * Get stabilizer parameters for a key
 * From gen_scad.py lines 287-289:
 * stabilizer_size = 2 if 3 >= longer_size >= 2 else longer_size
 * angle = 0 if w >= 2 else 90
 */
export function getStabilizerParams(key: KeyDefinition): { size: number; angle: number } | null {
  if (!needsStabilizer(key)) return null;
  const w = key.w ?? 1;
  const h = key.h ?? 1;
  const longerSize = Math.max(w, h);
  const size = (longerSize >= 2 && longerSize <= 3) ? 2 : longerSize;
  const angle = w >= 2 ? 0 : 90;
  return { size, angle };
}

/**
 * Parse layout JSON and calculate all key positions
 */
export function parseLayout(layout: LayoutJson): KeyPosition[] {
  return layout.layout.map(key => {
    const center = calculateKeyCenter(key);
    const stab = getStabilizerParams(key);
    return {
      x: center.x,
      y: center.y,
      w: key.w ?? 1,
      h: key.h ?? 1,
      angle: key.a ?? 0,
      needsStabilizer: stab !== null,
      stabilizerSize: stab?.size,
      stabilizerAngle: stab?.angle,
    };
  });
}

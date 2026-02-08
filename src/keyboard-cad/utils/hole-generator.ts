import type { LayoutJson, PartType } from '../types';
import { parseLayout } from './layout-parser';

/**
 * Generate OpenSCAD hole commands for a layout
 * From gen_scad.py get_hole_list function
 */
export function getHoleList(layout: LayoutJson, part: PartType): string {
  const positions = parseLayout(layout);
  const lines: string[] = [];

  for (const pos of positions) {
    // Switch hole - switch_hole(z_angle) exists in both plate and pcb templates
    lines.push(`translate([${pos.x}, ${pos.y}, 0]) switch_hole(${pos.angle});`);

    // Stabilizer if needed
    if (pos.needsStabilizer && pos.stabilizerSize) {
      const stabAngle = pos.angle + (pos.stabilizerAngle ?? 0);
      if (part === 'plate') {
        lines.push(`translate([${pos.x}, ${pos.y}, 0]) plate_mount_stabilizer_hole(${stabAngle}, ${pos.stabilizerSize});`);
      } else if (part === 'pcb') {
        lines.push(`translate([${pos.x}, ${pos.y}, 0]) pcb_mount_stabilizer_hole(${stabAngle}, ${pos.stabilizerSize});`);
      }
    }
  }

  return lines.join('\n');
}

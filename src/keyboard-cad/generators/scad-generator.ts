/**
 * SCAD Generator - Main class for generating OpenSCAD code
 * Ported from gen_scad.py ScadGenerator class (lines 224-261)
 */

import { PLACEHOLDER_SIZE, PADDING } from '../constants';
import type { LayoutJson, PartType, GeneratorOptions } from '../types';
import { getHoleList } from '../utils/hole-generator';
import {
  COMMON_MODULE,
  generatePlateTemplate,
  generatePcbTemplate,
  generateCaseTemplate,
} from '../templates/index';

export interface ScadGeneratorOptions extends GeneratorOptions {
  projection2d?: boolean;
  stabilizerMount?: 'plate' | 'pcb';
}

/**
 * Generator for OpenSCAD code from keyboard layout JSON.
 *
 * Matches Python implementation:
 * - Constructor calculates dimensions (lines 227-228)
 * - generate() method maps part types to templates (lines 251-261)
 */
export class ScadGenerator {
  private layout: LayoutJson;
  private options: ScadGeneratorOptions;

  constructor(layout: LayoutJson, options: ScadGeneratorOptions = {}) {
    this.layout = layout;
    this.options = {
      projection2d: false,
      stabilizerMount: 'plate',
      ...options,
    };
  }

  /**
   * Calculate dimensions in mm
   * From gen_scad.py lines 227-228:
   *   width = layout_json['width'] * PLACEHOLDER_SIZE + 2 * PADDING
   *   height = layout_json['height'] * PLACEHOLDER_SIZE + 2 * PADDING
   */
  getDimensions(): { width: number; height: number } {
    return {
      width: this.layout.width * PLACEHOLDER_SIZE + 2 * PADDING,
      height: this.layout.height * PLACEHOLDER_SIZE + 2 * PADDING,
    };
  }

  /**
   * Generate OpenSCAD code for a part type
   * From gen_scad.py __call__ method lines 251-261
   *
   * Maps part types to their templates:
   * - plate -> PLATE_TEMPLATE with inner_mapping
   * - pcb -> PCB_TEMPLATE with inner_mapping
   * - case -> CASE_TEMPLATE with outer_mapping
   */
  generate(part: PartType): string {
    const dims = this.getDimensions();
    const holes = getHoleList(this.layout, part);

    // From line 235: projection(cut=false) for 2D, empty for 3D
    const projection = this.options.projection2d ? 'projection(cut = true)' : '';

    switch (part) {
      case 'plate':
        return generatePlateTemplate({
          commonModule: COMMON_MODULE,
          projection,
          placeholderSize: PLACEHOLDER_SIZE,
          width: dims.width,
          height: dims.height,
          holes,
        });

      case 'pcb':
        return generatePcbTemplate({
          commonModule: COMMON_MODULE,
          projection,
          placeholderSize: PLACEHOLDER_SIZE,
          width: dims.width,
          height: dims.height,
          holes,
        });

      case 'case':
        return generateCaseTemplate({
          commonModule: COMMON_MODULE,
          width: dims.width,
          height: dims.height,
        });

      default:
        throw new Error(`Unknown part type: ${part}`);
    }
  }
}

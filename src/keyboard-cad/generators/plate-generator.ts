/**
 * Plate Generator - Specialized generator for keyboard plates
 */

import { ScadGenerator, ScadGeneratorOptions } from './scad-generator';
import type { LayoutJson } from '../types';

/**
 * Generator specifically for plate SCAD output.
 * Convenience wrapper around ScadGenerator for plate generation.
 */
export class PlateGenerator extends ScadGenerator {
  constructor(layout: LayoutJson, options?: ScadGeneratorOptions) {
    super(layout, options);
  }

  /**
   * Generate OpenSCAD code for a keyboard plate
   */
  generateScad(): string {
    return this.generate('plate');
  }
}

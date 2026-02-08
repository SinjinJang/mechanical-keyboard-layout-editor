/**
 * Case Generator - Specialized generator for keyboard cases
 */

import { ScadGenerator, ScadGeneratorOptions } from './scad-generator';
import type { LayoutJson } from '../types';

/**
 * Generator specifically for case SCAD output.
 * Convenience wrapper around ScadGenerator for case generation.
 */
export class CaseGenerator extends ScadGenerator {
  constructor(layout: LayoutJson, options?: ScadGeneratorOptions) {
    super(layout, options);
  }

  /**
   * Generate OpenSCAD code for a keyboard case
   */
  generateScad(): string {
    return this.generate('case');
  }
}

/**
 * PCB Generator - Specialized generator for keyboard PCBs
 */

import { ScadGenerator, ScadGeneratorOptions } from './scad-generator';
import type { LayoutJson } from '../types';

/**
 * Generator specifically for PCB SCAD output.
 * Convenience wrapper around ScadGenerator for PCB generation.
 */
export class PcbGenerator extends ScadGenerator {
  constructor(layout: LayoutJson, options?: ScadGeneratorOptions) {
    super(layout, options);
  }

  /**
   * Generate OpenSCAD code for a keyboard PCB
   */
  generateScad(): string {
    return this.generate('pcb');
  }
}

/**
 * Core type definitions for the keyboard CAD generator
 */

export type PartType = 'plate' | 'pcb' | 'case';
export type StabilizerMount = 'plate' | 'pcb';
export type OutputFormat = 'stl' | 'dxf' | 'scad';

/**
 * Key definition matching the layout JSON format
 */
export interface KeyDefinition {
  label?: string;
  x: number;
  y: number;
  w?: number; // width in units, default 1
  h?: number; // height in units, default 1
  a?: number; // rotation angle in degrees, default 0
}

/**
 * Layout JSON structure
 */
export interface LayoutJson {
  width: number;
  height: number;
  layout: KeyDefinition[];
}

/**
 * Options for SCAD generation
 */
export interface GeneratorOptions {
  projection2d?: boolean;
  stabilizerMount?: StabilizerMount;
}

/**
 * Options for rendering output
 */
export interface RenderOptions {
  format: OutputFormat;
  segments?: number;
}

/**
 * Result from rendering operation
 */
export interface RenderResult {
  data: Uint8Array | string;
  format: OutputFormat;
  partType: PartType;
}

/**
 * Processed key position with stabilizer information
 */
export interface KeyPosition {
  x: number;
  y: number;
  w: number;
  h: number;
  angle: number;
  needsStabilizer: boolean;
  stabilizerSize?: number;
  stabilizerAngle?: number;
}

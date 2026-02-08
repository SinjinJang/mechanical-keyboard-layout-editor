/**
 * Core type definitions for the keyboard CAD generator
 */

// Re-export Zod-inferred types for consistency
export type { KeyDefinition, LayoutJson } from './schemas';

export type PartType = 'plate' | 'pcb' | 'case';
export type StabilizerMount = 'plate' | 'pcb';
export type OutputFormat = 'stl' | 'dxf' | 'scad';

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

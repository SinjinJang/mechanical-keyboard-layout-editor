/**
 * keyboard-cad-wasm - OpenSCAD WASM keyboard CAD generator
 *
 * Main library exports
 */

// Constants
export * from './constants';

// Types
export type {
  PartType,
  StabilizerMount,
  OutputFormat,
  KeyDefinition,
  LayoutJson,
  GeneratorOptions,
  RenderOptions,
  RenderResult,
  KeyPosition,
} from './types';

// Schemas and validation
export {
  KeyDefinitionSchema,
  LayoutJsonSchema,
  parseLayoutJson,
  safeParseLayoutJson,
} from './schemas';

// Templates
export {
  COMMON_MODULE,
  generatePlateTemplate,
  generatePcbTemplate,
  generateCaseTemplate,
  type PlateTemplateParams,
  type PcbTemplateParams,
  type CaseTemplateParams,
} from './templates/index';

// Generators
export {
  ScadGenerator,
  PlateGenerator,
  PcbGenerator,
  CaseGenerator,
  type ScadGeneratorOptions,
} from './generators/index';

// WASM Engine
export { OpenScadEngine, type OpenScadEngineOptions } from './wasm/index';

/**
 * OpenSCAD template exports.
 * Entry point for all template modules.
 */

export { COMMON_MODULE } from './common';
export {
  generatePlateTemplate,
  type PlateTemplateParams,
} from './plate';
export {
  generatePcbTemplate,
  type PcbTemplateParams,
} from './pcb';
export {
  generateCaseTemplate,
  type CaseTemplateParams,
} from './case';

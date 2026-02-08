/**
 * Constants extracted from gen_scad.py
 * These values match the Python implementation exactly.
 */

// From line 203-204: Key grid constants
export const PLACEHOLDER_SIZE = 19.05;
export const PADDING = 6;

// From COMMON_MODULE (line 13): OpenSCAD rendering segments
export const SEGMENTS = 30; // $fn value

// From PLATE_TEMPLATE (lines 70-71): Plate geometry
export const PLATE_DEPTH = 1.5;
export const SWITCH_HOLE_SIZE = 14;

// From PCB_TEMPLATE (lines 125-128): PCB geometry
export const PCB_DEPTH = 1.5;
export const PCB_CENTER_HOLE_DIAMETER = 4.1;
export const PCB_PIN_HOLE_DIAMETER = 3;
export const PCB_GRID_SIZE = 1.27;
export const PCB_MARGIN = 2.5; // line 171

// From CASE_TEMPLATE (lines 189-190): Case geometry
export const CASE_MARGIN = 2;
export const CASE_HEIGHT = 10;

// From COMMON_MODULE (lines 34-48): Screw hole geometry
export const SCREW_PADDING = 4;
export const SCREW_HOLE_DIAMETER = 3.2;
export const NUT_DIAMETER = 6.2;
export const CORNER_RADIUS = 3; // line 53
export const BEVEL_CUT_LENGTH = 7; // line 59

// From stabilizer modules (lines 85-86, 98-99): Stabilizer geometry
export const STABILIZER_WIDTH = 9;
export const PLATE_STABILIZER_HEIGHT = 12.5;
export const PCB_STABILIZER_HEIGHT = 14;
export const PLATE_STABILIZER_PADDING = 3.1;

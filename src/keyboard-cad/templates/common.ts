/**
 * Common OpenSCAD modules shared across all templates.
 * Ported from gen_scad.py COMMON_MODULE.
 */

export const COMMON_MODULE = `
\$fn = 30;

module _rounded_cube(dimens, radius) {
    hull() {
        translate([radius, radius]) cylinder(r=radius, h=dimens[2]);
        translate([dimens[0]-radius, radius]) cylinder(r=radius, h=dimens[2]);
        translate([dimens[0]-radius, dimens[1]-radius]) cylinder(r=radius, h=dimens[2]);
        translate([radius, dimens[1]-radius]) cylinder(r=radius, h=dimens[2]);
    }
}

module _half_bevel_cube(dimens, cut_len) {
    hull() {
        x_dimens = [dimens[0]-2*cut_len, dimens[1], dimens[2]];
        translate([cut_len, 0, 0]) cube(x_dimens);

        y_dimens = [dimens[0], dimens[1]-2*cut_len, dimens[2]];
        translate([0, cut_len, 0]) cube(y_dimens);
    }
}

module _screw_hole(screw_height, with_nut) {
    cylinder(d=3.2, h=screw_height);
    if (with_nut) {
        cylinder(d=6.2, h=2);
    };
}

module _screw_holes(dimens, with_nut) {
    padding = 4;
    union() {
        translate([padding, padding, 0]) _screw_hole(dimens[2], with_nut);
        translate([padding, dimens[1]-padding, 0]) _screw_hole(dimens[2], with_nut);
        translate([dimens[0]-padding, padding, 0]) _screw_hole(dimens[2], with_nut);
        translate([dimens[0]-padding, dimens[1]-padding, 0]) _screw_hole(dimens[2], with_nut);
    }
}

module outer_boundary(dimens) {
    difference() {
        _rounded_cube(dimens, 3);
        _screw_holes(dimens, with_nuts);
    }
}

module inner_boundary(dimens, margin) {
    _half_bevel_cube([dimens.x - 2 * margin, dimens.y - 2 * margin, dimens.z], 7);
}

`;

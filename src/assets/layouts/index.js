// Predefined keyboard layouts
import layout1key from './layout-1key.json';
import layout1stSplitLeft from './layout-1st-split-left.json';
import layout1stSplitRight from './layout-1st-split-right.json';
import layout2ndSplitLeftWithMacro from './layout-2nd-split-left-with-macro.json';
import layout2ndSplitRightWithB from './layout-2nd-split-right-with-b.json';
import layoutFull from './layout-full.json';
import layoutGridSplitLeft from './layout-grid-split-left.json';
import layoutGridSplitRight from './layout-grid-split-right.json';
import layoutNavi from './layout-navi.json';
import layoutNumpad from './layout-numpad.json';
import layoutTenkeyless from './layout-tenkeyless.json';
import layoutTest from './layout-test.json';

export {
  layout1key,
  layout1stSplitLeft,
  layout1stSplitRight,
  layout2ndSplitLeftWithMacro,
  layout2ndSplitRightWithB,
  layoutFull,
  layoutGridSplitLeft,
  layoutGridSplitRight,
  layoutNavi,
  layoutNumpad,
  layoutTenkeyless,
  layoutTest,
};

export const PREDEFINED_LAYOUTS = {
  '1key': layout1key,
  '1st-split-left': layout1stSplitLeft,
  '1st-split-right': layout1stSplitRight,
  '2nd-split-left-with-macro': layout2ndSplitLeftWithMacro,
  '2nd-split-right-with-b': layout2ndSplitRightWithB,
  'full': layoutFull,
  'grid-split-left': layoutGridSplitLeft,
  'grid-split-right': layoutGridSplitRight,
  'navi': layoutNavi,
  'numpad': layoutNumpad,
  'tenkeyless': layoutTenkeyless,
  'test': layoutTest,
};

export const LAYOUT_LIST = Object.keys(PREDEFINED_LAYOUTS);

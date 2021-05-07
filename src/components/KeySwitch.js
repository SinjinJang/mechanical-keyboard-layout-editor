import React from 'react';
import Draggable from 'react-draggable';

import * as LayoutUtil from '../utils/LayoutUtil';
import './KeySwitch.css';


const DRAGGABLE_BOUNDS = LayoutUtil.keyPosition(0, 0);

function KeySwitch(props) {
  const { label, x, y, w, h } = props.keyState;
  const handleDrag = (e, ui) => {
    x.set(p => p + (ui.deltaX / LayoutUtil.UNIT_1));
    y.set(p => p + (ui.deltaY / LayoutUtil.UNIT_1));
  }
  return (
    <Draggable
      grid={[LayoutUtil.UNIT_0_25, LayoutUtil.UNIT_0_25]}
      position={LayoutUtil.keyPosition(x.get(), y.get())}
      bounds={DRAGGABLE_BOUNDS}
      onDrag={handleDrag}
    >
      <div
        className='key-switch'
        style={LayoutUtil.keySize(w.get(), h.get())}
      // onClick={this.props.onClick}
      >
        {label.get()}
      </div>
    </Draggable>
  )
}

export default KeySwitch;

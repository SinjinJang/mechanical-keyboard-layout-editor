import React from 'react';
import Draggable from 'react-draggable';

import * as LayoutUtil from '../utils/LayoutUtil';
import './KeySwitch.css';


const DRAGGABLE_BOUNDS = LayoutUtil.keyPosition(0, 0);

function KeySwitch(props) {
  const { label, x, y, w, h } = props.keyState;
  const selectedState = props.selectedState;

  const selectedClassName = selectedState.get() === props.key ? 'key-switch-selected' : '';
  const handleDrag = (e, ui) => {
    x.set(p => p + (ui.deltaX / LayoutUtil.UNIT_1));
    y.set(p => p + (ui.deltaY / LayoutUtil.UNIT_1));
  }
  const handleClick = () => {
    // 키 스위치 클릭 시 선택 및 해제하도록 변경
    selectedState.set(p => (p === props.key) ? -1 : props.key);
  }
  return (
    <Draggable
      grid={[LayoutUtil.UNIT_0_25, LayoutUtil.UNIT_0_25]}
      position={LayoutUtil.keyPosition(x.get(), y.get())}
      bounds={DRAGGABLE_BOUNDS}
      onDrag={handleDrag}
    >
      <div
        className={`key-switch ${selectedClassName}`}
        style={LayoutUtil.keySize(w.get(), h.get())}
        onClick={handleClick}
      >
        {label.get()}
      </div>
    </Draggable>
  )
}

export default KeySwitch;

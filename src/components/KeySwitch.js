import React from 'react';
import Draggable from 'react-draggable';

import * as LayoutUtil from '../utils/LayoutUtil';
import './KeySwitch.css';


function KeySwitch(props) {
  const { label, x, y, w, h } = props.keyState;
  const selectedState = props.selectedState;

  const selectedClassName = selectedState.get() === props.seq ? 'key-switch-selected' : '';
  const handleDrag = (e, ui) => {
    x.set(p => p + (ui.deltaX / LayoutUtil.UNIT_1));
    y.set(p => p + (ui.deltaY / LayoutUtil.UNIT_1));
  };
  const handleClick = () => {
    // 키 스위치 클릭 시 선택 및 해제하도록 변경
    selectedState.set(p => (p === props.seq) ? -1 : props.seq);
  };
  return (
    <Draggable
      grid={[LayoutUtil.UNIT_0_25, LayoutUtil.UNIT_0_25]}
      bounds={{left: LayoutUtil.PLATE_PADDING, top: LayoutUtil.PLATE_PADDING}}
      position={LayoutUtil.keyPosition(x.get(), y.get())}
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
  );
}

export default KeySwitch;

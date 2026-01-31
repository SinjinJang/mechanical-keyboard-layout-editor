import React, { useRef } from 'react';
import Draggable from 'react-draggable';

import { useKeyboardStore } from '../../../store/keyboardStore';
import * as LayoutUtil from '../../../utils/LayoutUtil';
import './KeySwitch.css';


function KeySwitch(props) {
  const { seq, keyData } = props;
  const { label, x, y, w, h, a } = keyData;
  const nodeRef = useRef(null);

  const selectedIndex = useKeyboardStore((state) => state.selectedIndex);
  const setSelectedIndex = useKeyboardStore((state) => state.setSelectedIndex);
  const updateKey = useKeyboardStore((state) => state.updateKey);

  const selectedClassName = selectedIndex === seq ? 'key-switch-selected' : '';

  const handleDrag = (e, ui) => {
    const newX = x + (ui.deltaX / LayoutUtil.UNIT_1);
    const newY = y + (ui.deltaY / LayoutUtil.UNIT_1);
    updateKey(seq, { x: newX, y: newY });
  };

  const handleClick = () => {
    // 키 스위치 클릭 시 선택 및 해제하도록 변경
    setSelectedIndex(selectedIndex === seq ? -1 : seq);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      grid={[LayoutUtil.UNIT_0_25, LayoutUtil.UNIT_0_25]}
      bounds={{ left: LayoutUtil.PLATE_PADDING, top: LayoutUtil.PLATE_PADDING }}
      position={LayoutUtil.keyPosition(x, y)}
      onDrag={handleDrag}
    >
      <div
        ref={nodeRef}
        style={{
          position: 'absolute',
          ...LayoutUtil.keySize(w, h),
        }}
        onClick={handleClick}
      >
        <div
          className={`key-switch ${selectedClassName}`}
          style={{
            width: '100%',
            height: '100%',
            transform: `rotate(${a}deg)`,
            transformOrigin: 'center center'
          }}
        >
          {label}
        </div>
      </div>
    </Draggable>
  );
}

export default KeySwitch;

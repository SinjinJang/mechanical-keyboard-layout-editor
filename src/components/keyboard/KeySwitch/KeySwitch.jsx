import React, { useRef } from 'react';
import Draggable from 'react-draggable';

import { useKeyboardStore } from '../../../store/keyboardStore';
import * as LayoutUtil from '../../../utils/LayoutUtil';
import './KeySwitch.css';


function KeySwitch(props) {
  const { seq, keyData } = props;
  const { label, x, y, w, h, a } = keyData;
  const nodeRef = useRef(null);

  const layout = useKeyboardStore((state) => state.layout);
  const selectedIndices = useKeyboardStore((state) => state.selectedIndices);
  const toggleSelectKey = useKeyboardStore((state) => state.toggleSelectKey);
  const updateKey = useKeyboardStore((state) => state.updateKey);

  const isSelected = selectedIndices.includes(seq);
  const selectedClassName = isSelected ? 'key-switch-selected' : '';

  const handleDrag = (e, ui) => {
    const deltaX = ui.deltaX / LayoutUtil.UNIT_1;
    const deltaY = ui.deltaY / LayoutUtil.UNIT_1;

    if (selectedIndices.length > 1 && isSelected) {
      // Group drag: move all selected keys together
      selectedIndices.forEach(index => {
        const key = layout[index];
        updateKey(index, {
          x: key.x + deltaX,
          y: key.y + deltaY
        });
      });
    } else {
      // Single drag: move only this key
      updateKey(seq, {
        x: x + deltaX,
        y: y + deltaY
      });
    }
  };

  const handleClick = (e) => {
    // Ctrl (Windows/Linux) or Cmd (Mac) for multi-selection
    const multiSelect = e.ctrlKey || e.metaKey;
    toggleSelectKey(seq, multiSelect);
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

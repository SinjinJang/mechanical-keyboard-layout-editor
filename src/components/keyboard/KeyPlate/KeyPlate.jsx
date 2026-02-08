import './KeyPlate.css';
import { useState, useRef } from 'react';

import { useKeyboardStore } from '../../../store/keyboardStore';
import { plateSize, keyPosition, keySize } from '../../../utils/LayoutUtil';
import EditPanel from '../EditPanel';
import KeySwitch from '../KeySwitch';
import FloatingDock from '../../layout/FloatingDock';


function KeyPlate() {
  const layout = useKeyboardStore((state) => state.layout);
  const setSelectedIndices = useKeyboardStore((state) => state.setSelectedIndices);
  const plateSizeInUnit = plateSize(layout, true);

  const [selectionBox, setSelectionBox] = useState(null);
  const plateRef = useRef(null);
  const dragDataRef = useRef(null);

  const handleMouseDown = (e) => {
    // Check if click target is on a key switch or its children
    let target = e.target;
    let isKeySwitch = false;

    while (target && target !== plateRef.current) {
      if (target.classList && (target.classList.contains('key-switch') || target.classList.contains('react-draggable'))) {
        isKeySwitch = true;
        break;
      }
      target = target.parentElement;
    }

    // Only start drag selection if clicking on empty space (not on a key)
    if (!isKeySwitch && plateRef.current) {
      e.preventDefault();
      const rect = plateRef.current.getBoundingClientRect();
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;

      dragDataRef.current = {
        startX,
        startY,
        currentX: startX,
        currentY: startY
      };

      setSelectionBox({
        startX,
        startY,
        currentX: startX,
        currentY: startY,
      });

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleMouseMove = (e) => {
    if (dragDataRef.current && plateRef.current) {
      const rect = plateRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      // Update ref for handleMouseUp to access latest values
      dragDataRef.current.currentX = currentX;
      dragDataRef.current.currentY = currentY;

      // Update state for visual feedback
      setSelectionBox({
        startX: dragDataRef.current.startX,
        startY: dragDataRef.current.startY,
        currentX,
        currentY,
      });
    }
  };

  const handleMouseUp = () => {
    if (dragDataRef.current) {
      const { startX, startY, currentX, currentY } = dragDataRef.current;
      const minX = Math.min(startX, currentX);
      const maxX = Math.max(startX, currentX);
      const minY = Math.min(startY, currentY);
      const maxY = Math.max(startY, currentY);

      // Find keys that overlap with selection box (partial overlap allowed)
      const selectedIndices = [];
      layout.forEach((key, index) => {
        const pos = keyPosition(key.x, key.y);
        const size = keySize(key.w, key.h);

        const keyLeft = pos.x;
        const keyRight = pos.x + size.width;
        const keyTop = pos.y;
        const keyBottom = pos.y + size.height;

        // Check if key overlaps with selection box
        if (keyRight > minX && keyLeft < maxX && keyBottom > minY && keyTop < maxY) {
          selectedIndices.push(index);
        }
      });

      setSelectedIndices(selectedIndices);
    }

    // Clean up
    setSelectionBox(null);
    dragDataRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const getSelectionBoxStyle = () => {
    if (!selectionBox) return null;

    const { startX, startY, currentX, currentY } = selectionBox;
    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);

    return {
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      border: '1px solid rgba(208, 211, 218, 0.5)',
      backgroundColor: 'rgba(208, 211, 218, 0.08)',
      pointerEvents: 'none',
      zIndex: 1000,
    };
  };

  return (
    <div className='key-plate-wrapper'>
      <div className='plate-section'>
        <div className='key-plate-info'>
          <span>{layout.length} keys &middot; {plateSizeInUnit.width}U &times; {plateSizeInUnit.height}U</span>
        </div>
        <div
          ref={plateRef}
          className='key-plate'
          style={plateSize(layout)}
          onMouseDown={handleMouseDown}
        >
          {layout.map((key, index) =>
            <KeySwitch
              key={index}
              seq={index}
              keyData={key}
            />
          )}
          {selectionBox && <div style={getSelectionBoxStyle()} />}
        </div>
      </div>
      <EditPanel />
      <FloatingDock />
    </div>
  );
}

export default KeyPlate;

import React from 'react';
import Draggable from 'react-draggable';

import * as global from '../global';
import './KeySwitch.css';


class KeySwitch extends React.Component {
  render() {

    const { label, x, y, w, h, isSelected } = this.props;
    const position = {
      x: x * global.UNIT_1 + global.PLATE_PADDING,
      y: y * global.UNIT_1 + global.PLATE_PADDING,
    };
    const bounds = {
      left: global.PLATE_PADDING,
      top: global.PLATE_PADDING,
    };
    const style = {
      width: (w * global.UNIT_1) - 2,  // NOTE: 테두리 두께만큼 빼줌
      height: (h * global.UNIT_1) - 2,  // NOTE: 테두리 두께만큼 빼줌
      fontWeight: isSelected ? 'bold' : 'normal',
    };
    return (
      <Draggable
        grid={[global.UNIT_0_25, global.UNIT_0_25]}
        onDrag={this.props.onDrag}
        position={position}
        bounds={bounds}
      >
        <div
          className='key-switch'
          style={style}
          onClick={this.props.onClick}
        >
          {label}
        </div>
      </Draggable>
    )
  }
}

export default KeySwitch;

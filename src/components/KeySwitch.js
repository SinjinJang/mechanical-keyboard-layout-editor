import React from 'react';
import Draggable from 'react-draggable';

import * as LayoutUtil from '../utils/LayoutUtil';
import './KeySwitch.css';


class KeySwitch extends React.Component {
  constructor(props) {
    super(props);
    this.bounds = { ...LayoutUtil.keyPosition(0, 0) };
  }

  render() {
    const { label, x, y, w, h, isSelected } = this.props;
    const position = { ...LayoutUtil.keyPosition(x, y) };

    const style = {
      ...LayoutUtil.keySize(w, h),
      fontWeight: isSelected ? 'bold' : 'normal',
    };
    return (
      <Draggable
        grid={[LayoutUtil.UNIT_0_25, LayoutUtil.UNIT_0_25]}
        onDrag={this.props.onDrag}
        position={position}
        bounds={this.bounds}
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

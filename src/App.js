import './App.css';
import React from 'react';
import Draggable from 'react-draggable';

// 기본 1U 스위치의 크기 정의 (px 단위)
const UNIT_1 = 60;
const UNIT_0_25 = UNIT_1 / 4;

class KeySwitch extends React.Component {
  render() {
    const position = {
      x: this.props.x * UNIT_1,
      y: this.props.y * UNIT_1,
    };
    const style = {
      width: (this.props.w * UNIT_1) - 2,  // NOTE: 테두리 두께만큼 빼줌
      height: (this.props.h * UNIT_1) - 2,  // NOTE: 테두리 두께만큼 빼줌
    };
    return (
      <Draggable
        grid={[UNIT_0_25, UNIT_0_25]}
        onDrag={this.props.handleDrag}
        position={position}
      >
        <div className='key-switch' style={style}>
          {this.props.label}
        </div>
      </Draggable>
    )
  }
}

class EditPanel extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onAddSwitchClick}>Add Switch
        </button>
        <label>
          Key Label:
          <input type='text' name='key_label' />
        </label>
        <label>
          Width:
          <select name='key_width'>
            <option value='1'>1U</option>
            <option value='1.25'>1.25U</option>
            <option value='1.5'>1.5U</option>
            <option value='1.75'>1.75U</option>
            <option value='2'>2U</option>
            <option value='2.5'>2.25U</option>
            <option value='2.75'>2.75U</option>
          </select>
        </label>
        <label>
          Height:
          <select name='key_height'>
            <option value='1'>1U</option>
            <option value='2'>2U</option>
          </select>
        </label>
      </div>
    )
  }
}

class KeyPlate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 2 + 1,
      height: 5.25 + 1,
      layout: {
        'Print Screen': { 'x': 0, 'y': 0, 'w': 1, 'h': 1 },
        'Scroll Lock': { 'x': 1, 'y': 0, 'w': 1, 'h': 1 },
        'Pause': { 'x': 2, 'y': 0, 'w': 1, 'h': 1 },

        'Insert': { 'x': 0, 'y': 1.25, 'w': 1, 'h': 1 },
        'Home': { 'x': 1, 'y': 1.25, 'w': 1, 'h': 1 },
        'Page Up': { 'x': 2, 'y': 1.25, 'w': 1, 'h': 1 },

        'Delete': { 'x': 0, 'y': 2.25, 'w': 1, 'h': 1 },
        'End': { 'x': 1, 'y': 2.25, 'w': 1, 'h': 1 },
        'Page Down': { 'x': 2, 'y': 2.25, 'w': 1, 'h': 1 },

        'Up': { 'x': 1, 'y': 4.25, 'w': 1, 'h': 1 },

        'Left': { 'x': 0, 'y': 5.25, 'w': 1, 'h': 1 },
        'Down': { 'x': 1, 'y': 5.25, 'w': 1, 'h': 1 },
        'Right': { 'x': 2, 'y': 5.25, 'w': 1, 'h': 1 },
      }
    };
  }

  handleAddSwitch() {
    const newLayout = { ...this.state.layout };
    const newKeyName = 'Key ' + Object.keys(newLayout).length;
    newLayout[newKeyName] = {
      'x': this.state.width,
      'y': this.state.height - 1,
      'w': 1,
      'h': 1,
    };

    const newSize = this.resizePlate(newLayout);
    this.setState({ layout: newLayout, ...newSize });
  }

  handleDrag(e, ui) {
    // 키 스위치의 좌표 값을 갱신
    const keyName = ui.node.textContent;
    const newLayout = { ...this.state.layout };
    const keyObj = newLayout[keyName];
    keyObj.x += (ui.deltaX / UNIT_1);
    keyObj.y += (ui.deltaY / UNIT_1);

    const newSize = this.resizePlate(newLayout);
    this.setState({ layout: newLayout, ...newSize });
  };

  // 스위치 판의 넓이 및 높이를 다시 계산한다.
  resizePlate(newLayout) {
    let newWidth = -1;
    let newHeight = -1;
    for (const [_, val] of Object.entries(newLayout)) {
      const end = val.x + val.w;
      newWidth = (end > newWidth) ? end : newWidth;
      const bottom = val.y + val.h;
      newHeight = (bottom > newHeight) ? bottom : newHeight;
    }

    return { width: newWidth, height: newHeight };
  };

  render() {
    const MARGIN_PLATE = 30;
    const style = {
      width: (this.state.width * UNIT_1) + MARGIN_PLATE,
      height: (this.state.height * UNIT_1) + MARGIN_PLATE,
    };
    const styleInner = {
      width: (this.state.width * UNIT_1),
      height: (this.state.height * UNIT_1),
    };

    // 키 스위치 구성
    const keys = []
    for (const [key, val] of Object.entries(this.state.layout)) {
      keys.push(
        <KeySwitch
          key={key}
          label={key}
          x={val.x} y={val.y}
          w={val.w} h={val.h}
          handleDrag={(e, ui) => this.handleDrag(e, ui)}
        />
      )
    }

    return (
      <div>
        <EditPanel
          onAddSwitchClick={() => this.handleAddSwitch()}
        />
        <div className="key-plate-outer" style={style}>
          <div className="key-plate-inner" style={styleInner}>
            {keys}
          </div>
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <KeyPlate />
    </div>
  );
}

export default App;

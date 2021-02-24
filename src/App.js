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
      layout: [
        { 'key': 'Print Screen', 'x': 0, 'y': 0, 'w': 1, 'h': 1 },
        { 'key': 'Scroll Lock', 'x': 1, 'y': 0, 'w': 1, 'h': 1 },
        { 'key': 'Pause', 'x': 2, 'y': 0, 'w': 1, 'h': 1 },

        { 'key': 'Insert', 'x': 0, 'y': 1.25, 'w': 1, 'h': 1 },
        { 'key': 'Home', 'x': 1, 'y': 1.25, 'w': 1, 'h': 1 },
        { 'key': 'Page Up', 'x': 2, 'y': 1.25, 'w': 1, 'h': 1 },

        { 'key': 'Delete', 'x': 0, 'y': 2.25, 'w': 1, 'h': 1 },
        { 'key': 'End', 'x': 1, 'y': 2.25, 'w': 1, 'h': 1 },
        { 'key': 'Page Down', 'x': 2, 'y': 2.25, 'w': 1, 'h': 1 },

        { 'key': 'Up', 'x': 1, 'y': 4.25, 'w': 1, 'h': 1 },

        { 'key': 'Left', 'x': 0, 'y': 5.25, 'w': 1, 'h': 1 },
        { 'key': 'Down', 'x': 1, 'y': 5.25, 'w': 1, 'h': 1 },
        { 'key': 'Right', 'x': 2, 'y': 5.25, 'w': 1, 'h': 1 }
      ]
    };
  }

  handleAddSwitch() {
    const layout = this.state.layout.slice();
    layout.push({
      'key': '',
      'x': this.state.width,
      'y': this.state.height - 1,
      'w': 1,
      'h': 1,
    })

    // 스위치 판의 넓이 및 높이 재계산
    const endKey = layout.reduce((prev, curr) => {
      return prev.x > curr.x ? prev : curr;
    });
    const bottomKey = layout.reduce((prev, curr) => {
      return prev.y > curr.y ? prev : curr;
    })

    this.setState({
      width: endKey.x + endKey.w,
      hegith: bottomKey.y + bottomKey.h,
      layout: layout
    });
  }

  handleDrag = (e, ui) => {
    // 키 스위치의 좌표 값을 갱신
    const keyName = ui.node.textContent;
    const layout = this.state.layout.slice();
    for (const keyObj of layout) {
      if (keyObj.key === keyName) {
        keyObj.x += (ui.deltaX / UNIT_1);
        keyObj.y += (ui.deltaY / UNIT_1);
        break;
      }
    }
    this.setState({
      layout: layout
    });
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
    for (const [idx, val] of this.state.layout.entries()) {
      keys.push(
        <KeySwitch
          key={idx + '-' + val.key}
          label={val.key}
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

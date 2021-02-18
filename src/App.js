import './App.css';
import React from 'react';

// 기본 1U 스위치의 크기 정의 (px 단위)
const UNIT_1 = 50;

class KeySwitch extends React.Component {
  render() {
    const style = {
      left: (this.props.x * UNIT_1),
      top: (this.props.y * UNIT_1),
      width: (this.props.w * UNIT_1) - 2,  // NOTE: 테두리 두께만큼 빼줌
      height: (this.props.h * UNIT_1) - 2,  // NOTE: 테두리 두께만큼 빼줌
    };
    return (
      <div className="key-switch" style={style}>
        {this.props.label}
      </div>
    )
  }
}

class EditPanel extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onAddSwitchClick}>Add Switch
        </button>
      </div>
    )
  }
}

class KeyPlate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 2 + 1,  // TODO: 가장 오른쪽 키의 x + w 계산
      height: 5.25 + 1,  // TODO: 가장 아래쪽 키의 y + h 계산
      layout: [
        { 'key': 'Print Screen', 'x': 0, 'y': 0 },
        { 'key': 'Scroll Lock', 'x': 1, 'y': 0 },
        { 'key': 'Pause', 'x': 2, 'y': 0 },

        { 'key': 'Ins', 'x': 0, 'y': 1.25 },
        { 'key': 'Home', 'x': 1, 'y': 1.25 },
        { 'key': 'Page Up', 'x': 2, 'y': 1.25 },

        { 'key': 'Delete', 'x': 0, 'y': 2.25 },
        { 'key': 'End', 'x': 1, 'y': 2.25 },
        { 'key': 'Page Down', 'x': 2, 'y': 2.25 },

        { 'key': 'Up', 'x': 1, 'y': 4.25 },

        { 'key': 'Left', 'x': 0, 'y': 5.25 },
        { 'key': 'Down', 'x': 1, 'y': 5.25 },
        { 'key': 'Right', 'x': 2, 'y': 5.25 }
      ]
    };
  }

  handleAddSwitch() {
    const layout = this.state.layout.slice();
    layout.push({
      'key': '',
      'x': this.state.width,
      'y': this.state.height - 1,
    })
    this.setState({ layout: layout });
  }

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
          w={val.w !== undefined ? val.w : 1}
          h={val.h !== undefined ? val.h : 1}
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

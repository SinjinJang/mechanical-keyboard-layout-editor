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

class KeyPlate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 2+1.75,  // TODO: 가장 오른쪽 키의 x + w 계산
      height: 2+1,  // TODO: 가장 아래쪽 키의 y + h 계산
      layout: []
    };
  }

  handleAddSwitch(e) {
    console.log('handleAddSwitch');
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
    return (
      <div className="key-plate-outer" style={style}>
        <div className="key-plate-inner" style={styleInner}>
          <KeySwitch label="a" x="0" y="0" w="1" h="1" />
          <KeySwitch label="b" x="1" y="0" w="1" h="1" />
          <KeySwitch label="c" x="2" y="0" w="1.25" h="1" />
          <KeySwitch label="d" x="0" y="1" w="1" h="1" />
          <KeySwitch label="e" x="1" y="1" w="1" h="1" />
          <KeySwitch label="f" x="2" y="1" w="1.5" h="1" />
          <KeySwitch label="g" x="0" y="2" w="1" h="1" />
          <KeySwitch label="h" x="1" y="2" w="1" h="1" />
          <KeySwitch label="i" x="2" y="2" w="1.75" h="1" />
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

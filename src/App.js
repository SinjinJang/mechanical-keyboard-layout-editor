import './App.css';
import React from 'react';
import Draggable from 'react-draggable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
        onDrag={this.props.onDrag}
        position={position}
      >
        <div
          className='key-switch'
          style={style}
          onClick={this.props.onClick}
        >
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
        <Form.Group controlId='keyLabel'>
          <Form.Label>Key Label</Form.Label>
          <Form.Control type='text' name='key_label'
            value={this.props.selectedKey}
            onChange={this.props.onLabelChange}
          />
        </Form.Group>
        <Form.Group controlId='width'>
          <Form.Label>Width</Form.Label>
          <Form.Control as='select' name='key_width'
            value={this.props.selectedAttrs?.w}
            onChange={this.props.onSizeChange}
          >
            <option value='1'>1U</option>
            <option value='1.25'>1.25U</option>
            <option value='1.5'>1.5U</option>
            <option value='1.75'>1.75U</option>
            <option value='2'>2U</option>
            <option value='2.5'>2.25U</option>
            <option value='2.75'>2.75U</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='height'>
          <Form.Label>Height</Form.Label>
          <Form.Control as='select' name='key_height'
            value={this.props.selectedAttrs?.h}
            onChange={this.props.onSizeChange}
          >
            <option value='1'>1U</option>
            <option value='2'>2U</option>
          </Form.Control>
        </Form.Group>
        <Button
          variant='outline-primary'
          onClick={this.props.onAddSwitchClick}
        >
          Add Switch
        </Button>{' '}
        <Button
          variant='outline-secondary'
          download='layout.json'
          href={`data:text/json; charset=utf-8,${this.props.onDownloadClick()}`}
        >
          Download
        </Button>
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
      },
      selectedKey: '',
    };
  }

  handleAddSwitch() {
    const newLayout = { ...this.state.layout };
    const newKeyLabel = 'Key ' + Object.keys(newLayout).length;
    newLayout[newKeyLabel] = {
      'x': this.state.width,
      'y': this.state.height - 1,
      'w': 1,
      'h': 1,
    };

    const newSize = this.resizePlate(newLayout);
    this.setState({ layout: newLayout, ...newSize });
  }

  handleLabelChange(e) {
    const newLayout = { ...this.state.layout };
    const selectedKey = this.state.selectedKey;

    // layout 객체에서 키 라벨을 변경하여 저장
    const attrs = newLayout[selectedKey];
    delete newLayout[selectedKey];
    newLayout[e.target.value] = attrs;

    this.setState({
      layout: newLayout,
      selectedKey: e.target.value,
    });
  }

  handleSizeChange(e) {
    const newLayout = { ...this.state.layout };
    const selectedKey = this.state.selectedKey;

    // 넓이 또는 높이 크기 변경
    const attrs = newLayout[selectedKey];
    if (e.target.id === 'width') {
      attrs.w = e.target.value;
    } else if (e.target.id === 'height') {
      attrs.h = e.target.value;
    } else {
      console.log('>>>>> undefined id: ' + e.target.id);
      return;
    }

    const newSize = this.resizePlate(newLayout);
    this.setState({
      ...newSize,
      layout: newLayout,
    });
  }

  handleSwitchDrag(e, ui) {
    // 키 스위치의 좌표 값을 갱신
    const keyLabel = ui.node.textContent;
    const newLayout = { ...this.state.layout };
    const keyObj = newLayout[keyLabel];
    keyObj.x += (ui.deltaX / UNIT_1);
    keyObj.y += (ui.deltaY / UNIT_1);

    const newSize = this.resizePlate(newLayout);
    this.setState({ layout: newLayout, ...newSize });
  };

  handleSwitchClick(keyLabel) {
    this.setState({ selectedKey: keyLabel });
  }

  handleDownloadClick() {
    return JSON.stringify(this.state.layout);
  }

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
    const styleInner = {
      width: (this.state.width * UNIT_1),
      height: (this.state.height * UNIT_1),
    };
    const styleOuter = {
      width: styleInner.width + MARGIN_PLATE,
      height: styleInner.height + MARGIN_PLATE,
    };

    // 키 스위치 구성
    const keys = []
    for (const [keyLabel, attrs] of Object.entries(this.state.layout)) {
      keys.push(
        <KeySwitch
          key={keyLabel}
          label={keyLabel}
          x={attrs.x} y={attrs.y}
          w={attrs.w} h={attrs.h}
          onDrag={(e, ui) => this.handleSwitchDrag(e, ui)}
          onClick={(e) => this.handleSwitchClick(keyLabel)}
        />
      )
    }

    return (
      <div>
        <EditPanel
          selectedKey={this.state.selectedKey}
          selectedAttrs={this.state.layout[this.state.selectedKey]}
          onAddSwitchClick={() => this.handleAddSwitch()}
          onSizeChange={(e) => this.handleSizeChange(e)}
          onLabelChange={(e) => this.handleLabelChange(e)}
          onDownloadClick={() => this.handleDownloadClick()}
        />
        <div className="key-plate-outer" style={styleOuter}>
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

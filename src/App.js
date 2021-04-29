import './App.css';
import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import * as global from './global';
import KeySwitch from './components/KeySwitch';

import plus_icon from './images/add_circle_outline_black_24dp.svg';
import minus_icon from './images/remove_circle_outline_black_24dp.svg';


class EditPanel extends React.Component {
  render() {
    return (
      <div>
        <div className='editpanel__container'>
          <Form.Group controlId='uploadLayout' className='editpanel__item'>
            <Form.Label>Layout File to Upload</Form.Label>
            <Form.File id='layoutFile'
              type='file' accept='.json'
              onChange={this.props.onLayoutFileChange}
            />
          </Form.Group>
          <Button
            className='editpanel__item'
            variant='outline-secondary'
            download='layout.json'
            href={`data:text/json; charset=utf-8,${this.props.onDownloadClick()}`}
          >
            Download Layout
          </Button>
          <Button
            className='editpanel__item'
            variant='outline-success'
            onClick={() => alert('TODO: generate 3D/2D model')}
          >
            Generate 3D/2D Model
          </Button>
        </div>
        <div className='editpanel__container'>
          <Form.Group controlId='keyLabel' className='editpanel__item'>
            <Form.Label>Key Label</Form.Label>
            <Form.Control type='text' name='key_label'
              value={this.props.selectedKey}
              onChange={this.props.onLabelChange}
            />
          </Form.Group>
          <Form.Group controlId='width' className='editpanel__item'>
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
              <option value='2.25'>2.25U</option>
              <option value='2.75'>2.75U</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='height' className='editpanel__item'>
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
            className='editpanel__item'
            variant='outline-light'
          >
            <img
              className='editpanel__imageicon'
              alt='Add New Switch'
              src={plus_icon}
              onClick={this.props.onAddSwitchClick} />
          </Button>
          <Button
            className='editpanel__item'
            variant='outline-light'
          >
            <img
              className='editpanel__imageicon'
              alt='Remove Selected Switch'
              src={minus_icon}
              onClick={this.props.onRemoveSwitchClick} />
          </Button>
        </div>
      </div>
    )
  }
}

class KeyPlate extends React.Component {

  constructor(props) {
    super(props);

    const defaultLayout = {
      'New Key': { 'x': 0, 'y': 0, 'w': 1, 'h': 1 },
    };
    const defaultSize = this.resizePlate(defaultLayout);
    this.state = {
      selectedKey: null,
      layout: defaultLayout,
      ...defaultSize,
    };
  }

  /**
   * 새로 추가할 중복되지 않은 이름의 키 라벨을 생성해준다.
   * 
   * @returns 신규 추가될 키 라벨
   */
  newKeyLabel() {
    const { layout } = this.state;
    let seq = Object.keys(layout).length;
    let label;
    do {
      label = 'Key ' + (seq++);
    } while (label in layout);
    return label;
  }

  handleAddSwitch() {
    const newLayout = { ...this.state.layout };
    newLayout[this.newKeyLabel()] = {
      'x': this.state.width,  // right end 배치
      'y': Math.max(this.state.height - 1, 0),  // bottom align 배치
      'w': 1,
      'h': 1,
    };

    const newSize = this.resizePlate(newLayout);
    this.setState({ layout: newLayout, ...newSize });
  }

  handleRemoveSwitch() {
    const newLayout = { ...this.state.layout };
    delete newLayout[this.state.selectedKey];
    const newSize = this.resizePlate(newLayout);
    this.setState({
      selectedKey: null,
      selectedAttrs: null,
      layout: newLayout,
      ...newSize,
    });
  }

  handleLabelChange(e) {
    const newLayout = { ...this.state.layout };
    const selectedKey = this.state.selectedKey;

    // 예외 처리: 선택된 키가 없다면 입력 내용은 무시함.
    if (selectedKey == null) {
      return;
    }

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

    // 예외 처리: 선택된 키가 없다면 입력 내용은 무시함.
    if (selectedKey == null) {
      return;
    }

    // 넓이 또는 높이 크기 변경
    const attrs = newLayout[selectedKey];
    const newValue = Number(e.target.value);
    if (e.target.id === 'width') {
      attrs.w = newValue;
    } else if (e.target.id === 'height') {
      attrs.h = newValue;
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
    keyObj.x += (ui.deltaX / global.UNIT_1);
    keyObj.y += (ui.deltaY / global.UNIT_1);

    const newSize = this.resizePlate(newLayout);
    this.setState({ layout: newLayout, ...newSize });
  };

  handleSwitchClick(keyLabel) {
    this.setState({ selectedKey: keyLabel });
  }

  handleDownloadClick() {
    return JSON.stringify(this.state.layout);
  }

  handleLayoutFileChange(e) {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onloadend = () => {
      const layoutObj = JSON.parse(reader.result);

      // 불러온 layout 파일에서 키의 width, height 속성이 없을 경우 1로 설정
      Object.entries(layoutObj.layout).map(([_, v]) => {
        v.w = ('w' in v) ? v.w : 1;
        v.h = ('h' in v) ? v.h : 1;
      });

      this.setState({
        width: layoutObj.width,
        height: layoutObj.height,
        layout: layoutObj.layout,
        selectedKey: '',
      });
    }
  }

  // 스위치 판의 넓이 및 높이를 다시 계산한다.
  resizePlate(newLayout) {
    let newWidth = 0;
    let newHeight = 0;
    for (const [_, val] of Object.entries(newLayout)) {
      const end = val.x + val.w;
      newWidth = (end > newWidth) ? end : newWidth;
      const bottom = val.y + val.h;
      newHeight = (bottom > newHeight) ? bottom : newHeight;
    }

    return { width: newWidth, height: newHeight };
  };

  render() {
    const stylePlate = {
      width: (this.state.width * global.UNIT_1) + global.PLATE_PADDING * 2,
      height: (this.state.height * global.UNIT_1) + global.PLATE_PADDING * 2,
    };
    const { selectedKey, layout } = this.state;

    // 키 스위치 구성
    const keys = []
    for (const [keyLabel, attrs] of Object.entries(layout)) {
      keys.push(
        <KeySwitch
          key={keyLabel}
          label={keyLabel}
          x={attrs.x} y={attrs.y}
          w={attrs.w} h={attrs.h}
          isSelected={keyLabel === selectedKey}
          onDrag={(e, ui) => this.handleSwitchDrag(e, ui)}
          onClick={(e) => this.handleSwitchClick(keyLabel)}
        />
      )
    }

    return (
      <div>
        <EditPanel
          selectedKey={selectedKey}
          selectedAttrs={layout[selectedKey]}
          onAddSwitchClick={() => this.handleAddSwitch()}
          onRemoveSwitchClick={() => this.handleRemoveSwitch()}
          onSizeChange={(e) => this.handleSizeChange(e)}
          onLabelChange={(e) => this.handleLabelChange(e)}
          onDownloadClick={() => this.handleDownloadClick()}
          onLayoutFileChange={(e) => this.handleLayoutFileChange(e)}
        />
        <div className='key-plate' style={stylePlate}>
          {keys}
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <h1>Mechanical Keyboard Layout Editor</h1>
      <KeyPlate />
    </div>
  );
}

export default App;

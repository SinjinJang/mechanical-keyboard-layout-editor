import './App.css';
import React from 'react';
import { useState } from '@hookstate/core';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import * as LayoutUtil from './utils/LayoutUtil';
import KeySwitch from './components/KeySwitch';
import Footer from './components/Footer';

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


// /**
//  * 새로 추가할 중복되지 않은 이름의 키 라벨을 생성해준다.
//  * 
//  * @returns 신규 추가될 키 라벨
//  */
// newKeyLabel() {
//   const { layout } = this.state;
//   let seq = Object.keys(layout).length;
//   let label;
//   do {
//     label = 'Key ' + (seq++);
//   } while (label in layout);
//   return label;
// }

// handleAddSwitch() {
//   const newLayout = { ...this.state.layout };
//   newLayout[this.newKeyLabel()] = {
//     'x': this.state.width,  // right end 배치
//     'y': Math.max(this.state.height - 1, 0),  // bottom align 배치
//     'w': 1,
//     'h': 1,
//   };

//   const newSize = this.resizePlate(newLayout);
//   this.setState({ layout: newLayout, ...newSize });
// }

// handleRemoveSwitch() {
//   const newLayout = { ...this.state.layout };
//   delete newLayout[this.state.selectedKey];
//   const newSize = this.resizePlate(newLayout);
//   this.setState({
//     selectedKey: null,
//     selectedAttrs: null,
//     layout: newLayout,
//     ...newSize,
//   });
// }

// handleLabelChange(e) {
//   const newLayout = { ...this.state.layout };
//   const selectedKey = this.state.selectedKey;

//   // 예외 처리: 선택된 키가 없다면 입력 내용은 무시함.
//   if (selectedKey == null) {
//     return;
//   }

//   // layout 객체에서 키 라벨을 변경하여 저장
//   const attrs = newLayout[selectedKey];
//   delete newLayout[selectedKey];
//   newLayout[e.target.value] = attrs;

//   this.setState({
//     layout: newLayout,
//     selectedKey: e.target.value,
//   });
// }

// handleSizeChange(e) {
//   const newLayout = { ...this.state.layout };
//   const selectedKey = this.state.selectedKey;

//   // 예외 처리: 선택된 키가 없다면 입력 내용은 무시함.
//   if (selectedKey == null) {
//     return;
//   }

//   // 넓이 또는 높이 크기 변경
//   const attrs = newLayout[selectedKey];
//   const newValue = Number(e.target.value);
//   if (e.target.id === 'width') {
//     attrs.w = newValue;
//   } else if (e.target.id === 'height') {
//     attrs.h = newValue;
//   } else {
//     console.log('>>>>> undefined id: ' + e.target.id);
//     return;
//   }

//   const newSize = this.resizePlate(newLayout);
//   this.setState({
//     ...newSize,
//     layout: newLayout,
//   });
// }


// handleSwitchClick(keyLabel) {
//   this.setState({ selectedKey: keyLabel });
// }

// handleDownloadClick() {
//   return JSON.stringify(this.state.layout);
// }

// handleLayoutFileChange(e) {
//   const reader = new FileReader();
//   reader.readAsBinaryString(e.target.files[0]);
//   reader.onloadend = () => {
//     const layoutObj = JSON.parse(reader.result);

//     // 불러온 layout 파일에서 키의 width, height 속성이 없을 경우 1로 설정
//     Object.entries(layoutObj.layout).map(([_, v]) => {
//       v.w = ('w' in v) ? v.w : 1;
//       v.h = ('h' in v) ? v.h : 1;
//     });

//     this.setState({
//       width: layoutObj.width,
//       height: layoutObj.height,
//       layout: layoutObj.layout,
//       selectedKey: '',
//     });
//   }
// }

function KeyPlate() {
  const layoutState = useState([
    { label: 'Key 1', w: 1, h: 1, x: 0, y: 0 },
  ]);

  return (
    <div>
      {/*
      <EditPanel
        selectedKey={selectedKey}
        selectedAttrs={layout[selectedKey]}
        onAddSwitchClick={() => this.handleAddSwitch()}
        onRemoveSwitchClick={() => this.handleRemoveSwitch()}
        onSizeChange={(e) => this.handleSizeChange(e)}
        onLabelChange={(e) => this.handleLabelChange(e)}
        onDownloadClick={() => this.handleDownloadClick()}
        onLayoutFileChange={(e) => this.handleLayoutFileChange(e)}
      /> */}
      <div
        className='key-plate'
        style={LayoutUtil.plateSize(layoutState.get())}>
        {layoutState.map(keyState =>
          <KeySwitch
            key={keyState.label.get()}
            keyState={keyState}
          />
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Mechanical Keyboard Layout Editor</h1>
      <KeyPlate />
      <Footer />
    </div>
  );
}

export default App;

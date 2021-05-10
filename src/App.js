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


function EditPanel(props) {
  const { layoutState, selectedState } = props;
  const handleLayoutFileChange = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onloadend = () => {
      const layoutObj = JSON.parse(reader.result);

      // 불러온 layout 파일에서 키의 width, height 속성이 없을 경우 1로 설정
      Object.entries(layoutObj.layout).map(([_, v]) => {
        v.w = ('w' in v) ? v.w : 1;
        v.h = ('h' in v) ? v.h : 1;
      });

      layoutState.set(layoutObj.layout);
      selectedState.set(-1);
    }
  };

  const handleDownloadClick = () => {
    return 'data:text/json; charset=utf-8,' + JSON.stringify({
      ...LayoutUtil.plateSize(layoutState.get(), true),
      layout: layoutState.get()
    });
  };

  const handleLabelChange = (e) => {
    // 예외 처리: 선택된 키가 없다면 입력 내용은 무시함.
    if (selectedState.get() === -1) {
      return;
    }

    layoutState[selectedState.get()].label.set(e.target.value);
  }

  const handleSizeChange = (e) => {
    // 예외 처리: 선택된 키가 없다면 입력 내용은 무시함.
    if (selectedState.get() === -1) {
      return;
    }

    // 넓이 또는 높이 크기 변경
    const newValue = Number(e.target.value);
    if (e.target.id === 'width') {
      layoutState[selectedState.get()].w.set(newValue);
    } else if (e.target.id === 'height') {
      layoutState[selectedState.get()].h.set(newValue);
    } else {
      console.log('>>>>> undefined id: ' + e.target.id);
      return;
    }
  }

  return (
    <div>
      <div className='editpanel__container'>
        <Form.Group controlId='uploadLayout' className='editpanel__item'>
          <Form.Label>Layout File to Upload</Form.Label>
          <Form.File id='layoutFile'
            type='file' accept='.json'
            onChange={handleLayoutFileChange}
          />
        </Form.Group>
        <Button
          className='editpanel__item'
          variant='outline-secondary'
          download='layout.json'
          href={handleDownloadClick()}
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
            value={selectedState.get() === -1 ? '' : layoutState[selectedState.get()].label.get()}
            onChange={handleLabelChange}
          />
        </Form.Group>
        <Form.Group controlId='width' className='editpanel__item'>
          <Form.Label>Width</Form.Label>
          <Form.Control as='select' name='key_width'
            value={selectedState.get() === -1 ? '1' : layoutState[selectedState.get()].w.get()}
            onChange={handleSizeChange}
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
            value={selectedState.get() === -1 ? '1' : layoutState[selectedState.get()].h.get()}
            onChange={handleSizeChange}
          >
            <option value='1'>1U</option>
            <option value='2'>2U</option>
          </Form.Control>
        </Form.Group>
        {/*
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
        </Button> */}
      </div>
    </div>
  )
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






// handleSwitchClick(keyLabel) {
//   this.setState({ selectedKey: keyLabel });
// }

function KeyPlate() {
  const layoutState = useState([
    { label: 'Key 1', w: 1, h: 1, x: 0, y: 0 },
  ]);
  const selectedState = useState(-1);

  return (
    <div>
      <EditPanel
        layoutState={layoutState}
        selectedState={selectedState}
      // onAddSwitchClick={() => this.handleAddSwitch()}
      // onRemoveSwitchClick={() => this.handleRemoveSwitch()}
      />
      <div
        className='key-plate'
        style={LayoutUtil.plateSize(layoutState.get())}>
        {layoutState.map((keyState, index) =>
          <KeySwitch
            key={index}
            seq={index}
            keyState={keyState}
            selectedState={selectedState}
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

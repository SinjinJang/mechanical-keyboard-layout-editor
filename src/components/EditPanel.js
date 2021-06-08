import './EditPanel.css';

import { useState, none } from '@hookstate/core';
import { Button, IconButton, FormControl, InputLabel, TextField, Select, MenuItem, CircularProgress } from '@material-ui/core';
import { AddBox, IndeterminateCheckBox } from '@material-ui/icons';

import FileSaver from 'file-saver';

import { plateSize, makeLayoutObj } from '../utils/LayoutUtil';
import EditPanelGenerateDialog from './EditPanelGenerateDialog';


function EditPanel(props) {
  const { layoutState, selectedState } = props;
  const loadingState = useState(false);
  const generateDialogState = useState({ open: false, fmt: '' });

  const handleUploadClick = (e) => {
    e.preventDefault();

    const handleOnChange = (e1) => {
      const reader = new FileReader();
      reader.readAsBinaryString(e1.target.files[0]);
      reader.onloadend = () => {
        const layoutObj = JSON.parse(reader.result);

        // 불러온 layout 파일에서 키의 width, height 속성이 없을 경우 1로 설정
        Object.entries(layoutObj.layout).map(([_, v]) => {
          v.w = ('w' in v) ? v.w : 1;
          v.h = ('h' in v) ? v.h : 1;
        });

        layoutState.set(layoutObj.layout);
        selectedState.set(-1);
      };
    };

    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', '.json');
    fileSelector.onchange = handleOnChange;
    fileSelector.click();
  };

  const handleDownloadClick = () => {
    const data = JSON.stringify(makeLayoutObj(layoutState.get()));
    FileSaver.saveAs(
      new Blob([data], { type: 'text/json; charset=utf-8' }),
      'layout.json'
    );
  };

  const handleGenerateModelClick = (fmt) => {
    if (loadingState.get()) {
      console.log('prevent duplicated click!');
      return;
    }

    generateDialogState.set({ open: true, fmt: fmt });
  };

  const handleLabelChange = (e) => {
    // 예외 처리: 선택된 키가 없다면 입력 내용은 무시함.
    if (selectedState.get() === -1) {
      return;
    }

    layoutState[selectedState.get()].label.set(e.target.value);
  };

  const handleSizeChange = (e) => {
    // 예외 처리: 선택된 키가 없다면 입력 내용은 무시함.
    if (selectedState.get() === -1) {
      return;
    }
    // 예외 처리: 키가 선택된 상태에서 크기 없음 선택 불가
    if (e.target.value === '') {
      return;
    }

    // 넓이 또는 높이 크기 변경
    const newValue = Number(e.target.value);
    if (e.target.id === 'selected-key-width') {
      layoutState[selectedState.get()].w.set(newValue);
    } else if (e.target.id === 'selected-key-height') {
      layoutState[selectedState.get()].h.set(newValue);
    } else {
      console.log('>>>>> undefined id: ' + e.target.id);
      return;
    }
  };

  const handleAddSwitch = () => {
    const { width, height } = plateSize(layoutState.get(), true);
    layoutState.merge([{
      'label': 'New Key',
      'x': width,  // right end 배치
      'y': Math.max(height - 1, 0),  // bottom align 배치
      'w': 1,
      'h': 1,
    }]);
  };

  const handleRemoveSwitch = () => {
    // 예외 처리: 선택된 키가 없다면 동작 무시함.
    if (selectedState.get() === -1) {
      return;
    }

    layoutState[selectedState.get()].set(none);
    selectedState.set(-1);
  };

  return (
    <div className='editpanel'>
      {loadingState.get() ? <div className='loading'><CircularProgress /></div> : ''}
      <EditPanelGenerateDialog
        dialogState={generateDialogState}
        layoutState={layoutState}
      />
      <div className='editpanel__container'>
        <Button
          className='editpanel__item'
          variant='outlined'
          color='primary'
          onClick={handleUploadClick}
        >
          Upload Layout
        </Button>
        <Button
          className='editpanel__item'
          variant='outlined'
          color='primary'
          onClick={handleDownloadClick}
        >
          Download Layout
        </Button>
        <Button
          className='editpanel__item'
          variant='outlined'
          color='primary'
          onClick={() => handleGenerateModelClick('stl')}
        >
          Generate STL (3D)
        </Button>
        <Button
          className='editpanel__item'
          variant='outlined'
          color='primary'
          onClick={() => handleGenerateModelClick('dxf')}
        >
          Generate DXF (2D)
        </Button>
      </div>
      <div className='editpanel__container'>
        <FormControl className='editpanel__item'>
          <TextField
            id='selected-key-label'
            label='Key Label'
            value={selectedState.get() === -1 ? '' : layoutState[selectedState.get()].label.get()}
            onChange={handleLabelChange}
          />
        </FormControl>
        <FormControl className='editpanel__item'>
          <InputLabel htmlFor='select-key-width'>Width</InputLabel>
          <Select
            native
            id='selected-key-width'
            label='Width'
            value={selectedState.get() === -1 ? '' : layoutState[selectedState.get()].w.get()}
            onChange={handleSizeChange}
          >
            <option value=''></option>
            <option value='1'>1U</option>
            <option value='1.25'>1.25U</option>
            <option value='1.5'>1.5U</option>
            <option value='1.75'>1.75U</option>
            <option value='2'>2U</option>
            <option value='2.25'>2.25U</option>
            <option value='2.75'>2.75U</option>
            <option value='6'>6U</option>
            <option value='6.25'>6.25U</option>
            <option value='6.5'>6.5U</option>
            <option value='7'>7U</option>
          </Select>
        </FormControl>
        <FormControl className='editpanel__item'>
          <InputLabel htmlFor='select-key-height'>Height</InputLabel>
          <Select
            native
            id='selected-key-height'
            label='Height'
            value={selectedState.get() === -1 ? '' : layoutState[selectedState.get()].h.get()}
            onChange={handleSizeChange}
          >
            <option value=''></option>
            <option value='1'>1U</option>
            <option value='2'>2U</option>
          </Select>
        </FormControl>
        <IconButton
          className='editpanel__item editpanel__imageicon'
          alt='Add New Switch'
          onClick={handleAddSwitch}
        >
          <AddBox />
        </IconButton>
        <IconButton
          className='editpanel__item editpanel__imageicon'
          alt='Remove Selected Switch'
          onClick={handleRemoveSwitch}
        >
          <IndeterminateCheckBox />
        </IconButton>
      </div>
    </div>
  );
}

export default EditPanel;

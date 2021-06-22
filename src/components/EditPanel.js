import './HorizontalBar.css';
import './EditPanel.css';

import { none } from '@hookstate/core';
import { IconButton, FormControl, InputLabel, TextField, Select } from '@material-ui/core';
import { AddBox, IndeterminateCheckBox } from '@material-ui/icons';

import { plateSize } from '../utils/LayoutUtil';


function EditPanel(props) {
  const { layoutState, selectedState } = props;

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
      <div className='hbar__container'>
        <FormControl className='hbar__item'>
          <TextField
            id='selected-key-label'
            label='Key Label'
            value={selectedState.get() === -1 ? '' : layoutState[selectedState.get()].label.get()}
            onChange={handleLabelChange}
          />
        </FormControl>
        <FormControl className='hbar__item'>
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
        <FormControl className='hbar__item'>
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
          className='hbar__item editpanel__imageicon'
          alt='Add New Switch'
          onClick={handleAddSwitch}
        >
          <AddBox />
        </IconButton>
        <IconButton
          className='hbar__item editpanel__imageicon'
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

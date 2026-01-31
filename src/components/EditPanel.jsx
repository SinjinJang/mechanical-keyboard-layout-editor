import './HorizontalBar.css';
import './EditPanel.css';

import { none } from '@hookstate/core';
import { IconButton, FormControl, InputLabel, TextField, Select } from '@mui/material';
import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';

import { plateSize } from '../utils/LayoutUtil';


function EditPanel(props) {
  const { layoutState, selectedState } = props;

  const handleLabelChange = (e) => {
    if (selectedState.get() === -1) {
      return;
    }

    layoutState[selectedState.get()].label.set(e.target.value);
  };

  const handleSizeChange = (e) => {
    if (selectedState.get() === -1) {
      return;
    }
    if (e.target.value === '') {
      return;
    }

    const newValue = Number(e.target.value);
    const roundValue = Math.round(newValue * 100) / 100;
    if (e.target.id === 'selected-key-width') {
      layoutState[selectedState.get()].w.set(roundValue);
    } else if (e.target.id === 'selected-key-height') {
      layoutState[selectedState.get()].h.set(roundValue);
    } else if (e.target.id === 'selected-key-angle') {
      let angle = newValue;
      if (angle < -90) angle = -90;
      if (angle > 90) angle = 90;
      layoutState[selectedState.get()].a.set(angle);
    } else {
      console.log('>>>>> undefined id: ' + e.target.id);
      return;
    }
  };

  const handleAddSwitch = () => {
    const { width, height } = plateSize(layoutState.get(), true);
    layoutState.merge([{
      'label': 'New Key',
      'x': width,
      'y': Math.max(height - 1, 0),
      'w': 1,
      'h': 1,
      'a': 0,
    }]);
  };

  const handleRemoveSwitch = () => {
    if (selectedState.get() === -1) {
      return;
    }

    layoutState[selectedState.get()].set(none);
    selectedState.set(-1);
  };

  return (
    <div className='editpanel'>
      <div className='hbar__container'>
        <FormControl className='hbar__item' variant="standard">
          <TextField
            id='selected-key-label'
            label='Key Label'
            variant="standard"
            value={selectedState.get() === -1 ? '' : layoutState[selectedState.get()].label.get()}
            onChange={handleLabelChange}
          />
        </FormControl>
        <FormControl className='hbar__item' variant="standard">
          <InputLabel htmlFor='select-key-width'>Width</InputLabel>
          <Select
            native
            variant="standard"
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
        <FormControl className='hbar__item' variant="standard">
          <InputLabel htmlFor='select-key-height'>Height</InputLabel>
          <Select
            native
            variant="standard"
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
        <FormControl className='hbar__item' variant="standard">
          <TextField
            id='selected-key-angle'
            label='Angle'
            type='number'
            variant="standard"
            slotProps={{ htmlInput: { min: -90, max: 90 } }}
            value={selectedState.get() === -1 ? '' : layoutState[selectedState.get()].a.get()}
            onChange={handleSizeChange}
          />
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

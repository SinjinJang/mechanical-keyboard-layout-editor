import './HorizontalBar.css';
import './EditPanel.css';

import { IconButton, FormControl, InputLabel, TextField, Select } from '@mui/material';
import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';

import { useKeyboardStore } from '../store/keyboardStore';
import { plateSize } from '../utils/LayoutUtil';
import { ANGLE_LIMITS, DEFAULT_KEY } from '../utils/constants';


function EditPanel() {
  const layout = useKeyboardStore((state) => state.layout);
  const selectedIndex = useKeyboardStore((state) => state.selectedIndex);
  const updateKey = useKeyboardStore((state) => state.updateKey);
  const addKey = useKeyboardStore((state) => state.addKey);
  const removeKey = useKeyboardStore((state) => state.removeKey);
  const setSelectedIndex = useKeyboardStore((state) => state.setSelectedIndex);

  const selectedKey = selectedIndex >= 0 ? layout[selectedIndex] : null;

  const handleLabelChange = (e) => {
    if (selectedIndex === -1) {
      return;
    }
    updateKey(selectedIndex, { label: e.target.value });
  };

  const handleSizeChange = (e) => {
    if (selectedIndex === -1) {
      return;
    }
    if (e.target.value === '') {
      return;
    }

    const newValue = Number(e.target.value);
    const roundValue = Math.round(newValue * 100) / 100;
    if (e.target.id === 'selected-key-width') {
      updateKey(selectedIndex, { w: roundValue });
    } else if (e.target.id === 'selected-key-height') {
      updateKey(selectedIndex, { h: roundValue });
    } else if (e.target.id === 'selected-key-angle') {
      let angle = newValue;
      if (angle < ANGLE_LIMITS.MIN) angle = ANGLE_LIMITS.MIN;
      if (angle > ANGLE_LIMITS.MAX) angle = ANGLE_LIMITS.MAX;
      updateKey(selectedIndex, { a: angle });
    } else {
      console.log('>>>>> undefined id: ' + e.target.id);
      return;
    }
  };

  const handleAddSwitch = () => {
    const { width, height } = plateSize(layout, true);
    addKey({
      ...DEFAULT_KEY,
      x: width,
      y: Math.max(height - 1, 0),
    });
  };

  const handleRemoveSwitch = () => {
    if (selectedIndex === -1) {
      return;
    }
    removeKey(selectedIndex);
  };

  return (
    <div className='editpanel'>
      <div className='hbar__container'>
        <FormControl className='hbar__item' variant="standard">
          <TextField
            id='selected-key-label'
            label='Key Label'
            variant="standard"
            value={selectedKey ? selectedKey.label : ''}
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
            value={selectedKey ? selectedKey.w : ''}
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
            value={selectedKey ? selectedKey.h : ''}
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
            slotProps={{ htmlInput: { min: ANGLE_LIMITS.MIN, max: ANGLE_LIMITS.MAX } }}
            value={selectedKey ? selectedKey.a : ''}
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

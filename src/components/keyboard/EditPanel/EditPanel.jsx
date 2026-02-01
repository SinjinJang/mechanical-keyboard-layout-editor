import '../../HorizontalBar.css';
import './EditPanel.css';

import { FormControl, InputLabel, TextField, Select, MenuItem } from '@mui/material';

import { useKeyboardStore } from '../../../store/keyboardStore';
import { ANGLE_LIMITS } from '../../../utils/constants';


function EditPanel() {
  const selectedIndices = useKeyboardStore((state) => state.selectedIndices);
  const updateKey = useKeyboardStore((state) => state.updateKey);
  const layout = useKeyboardStore((state) => state.layout);

  const isDisabled = selectedIndices.length !== 1;
  const selectedKey = !isDisabled ? layout[selectedIndices[0]] : null;

  const handleLabelChange = (e) => {
    updateKey(selectedIndices[0], { label: e.target.value });
  };

  const handleSizeChange = (e) => {
    if (e.target.value === '') return;

    const newValue = Number(e.target.value);
    const roundValue = Math.round(newValue * 100) / 100;
    if (e.target.id === 'selected-key-width') {
      updateKey(selectedIndices[0], { w: roundValue });
    } else if (e.target.id === 'selected-key-height') {
      updateKey(selectedIndices[0], { h: roundValue });
    } else if (e.target.id === 'selected-key-angle') {
      const angle = Math.max(ANGLE_LIMITS.MIN, Math.min(ANGLE_LIMITS.MAX, newValue));
      updateKey(selectedIndices[0], { a: angle });
    }
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
            disabled={isDisabled}
            placeholder={selectedIndices.length > 1 ? `${selectedIndices.length} keys selected` : ''}
          />
        </FormControl>
        <FormControl className='hbar__item' variant="standard">
          <InputLabel htmlFor='select-key-width'>Width</InputLabel>
          <Select
            variant="standard"
            id='selected-key-width'
            label='Width'
            value={selectedKey ? selectedKey.w : ''}
            onChange={(e) => handleSizeChange({ target: { id: 'selected-key-width', value: e.target.value } })}
            disabled={isDisabled}
          >
            <MenuItem value=''>-</MenuItem>
            <MenuItem value={1}>1U</MenuItem>
            <MenuItem value={1.25}>1.25U</MenuItem>
            <MenuItem value={1.5}>1.5U</MenuItem>
            <MenuItem value={1.75}>1.75U</MenuItem>
            <MenuItem value={2}>2U</MenuItem>
            <MenuItem value={2.25}>2.25U</MenuItem>
            <MenuItem value={2.75}>2.75U</MenuItem>
            <MenuItem value={6}>6U</MenuItem>
            <MenuItem value={6.25}>6.25U</MenuItem>
            <MenuItem value={6.5}>6.5U</MenuItem>
            <MenuItem value={7}>7U</MenuItem>
          </Select>
        </FormControl>
        <FormControl className='hbar__item' variant="standard">
          <InputLabel htmlFor='select-key-height'>Height</InputLabel>
          <Select
            variant="standard"
            id='selected-key-height'
            label='Height'
            value={selectedKey ? selectedKey.h : ''}
            onChange={(e) => handleSizeChange({ target: { id: 'selected-key-height', value: e.target.value } })}
            disabled={isDisabled}
          >
            <MenuItem value=''>-</MenuItem>
            <MenuItem value={1}>1U</MenuItem>
            <MenuItem value={2}>2U</MenuItem>
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
            disabled={isDisabled}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default EditPanel;

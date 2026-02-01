import { useState } from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

function generateDefaultFilename() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const timestamp = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('');
  return `layout-${timestamp}`;
}

export default function DownloadDialog({ open, onClose, onConfirm }) {
  const [filename, setFilename] = useState('');

  const handleOpen = () => {
    setFilename(generateDefaultFilename());
  };

  const handleConfirm = () => {
    const name = filename.trim() || generateDefaultFilename();
    const finalName = name.endsWith('.json') ? name : `${name}.json`;
    onConfirm(finalName);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionProps={{ onEnter: handleOpen }}
    >
      <DialogTitle>Download Layout</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="File Name"
          fullWidth
          variant="standard"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          onKeyDown={handleKeyDown}
          slotProps={{
            input: {
              endAdornment: <span style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>.json</span>,
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Download</Button>
      </DialogActions>
    </Dialog>
  );
}

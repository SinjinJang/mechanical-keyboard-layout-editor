import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { useUIStore } from '../../../store/uiStore';


export default function PredefinedDialog(props) {
  const { onSelect } = props;
  const layoutListDialog = useUIStore((state) => state.layoutListDialog);
  const setLayoutListDialog = useUIStore((state) => state.setLayoutListDialog);

  const handleClose = () => {
    setLayoutListDialog({ ...layoutListDialog, open: false });
  };

  const handleListItemClick = (value) => {
    onSelect(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={layoutListDialog.open}>
      <DialogTitle id="simple-dialog-title">Choose Predefined Layout</DialogTitle>
      <List>
        {layoutListDialog.predefinedList.map((layout, idx) => (
          <ListItemButton onClick={() => handleListItemClick(layout)} key={idx}>
            <ListItemText primary={layout} />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
}

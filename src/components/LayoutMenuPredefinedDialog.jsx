import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


export default function LayoutMenuPredefinedDialog(props) {
  const { dialogState, onSelect } = props;

  const handleClose = () => {
    dialogState.open.set(false);
  };

  const handleListItemClick = (value) => {
    onSelect(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={dialogState.open.get()}>
      <DialogTitle id="simple-dialog-title">Choose Predefined Layout</DialogTitle>
      <List>
        {dialogState.predefinedList.get().map((layout, idx) => (
          <ListItemButton onClick={() => handleListItemClick(layout)} key={idx}>
            <ListItemText primary={layout} />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
}

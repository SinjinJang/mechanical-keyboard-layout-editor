import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


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
          <ListItem button onClick={() => handleListItemClick(layout)} key={idx}>
            <ListItemText primary={layout} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

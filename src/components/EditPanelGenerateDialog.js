import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function EditPanelGenerateDialog(props) {
  const { openState, onConfirm } = props;

  const handleClose = () => {
    openState.set(false);
  }

  const handleConfirmClick = () => {
    // TODO: 이메일 유효성 체크

    handleClose();
    onConfirm('test@email.com');
  };

  return (
    <div>
      <Dialog open={openState.get()} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Generate Model</DialogTitle>
        <DialogContent>
          <DialogContentText>
            생성된 모델 파일을 받으실 이메일 주소를 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmClick} color="primary">
            Generate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
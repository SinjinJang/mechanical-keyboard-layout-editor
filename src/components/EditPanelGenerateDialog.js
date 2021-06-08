import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';
import { makeLayoutObj } from '../utils/LayoutUtil';

export default function EditPanelGenerateDialog(props) {
  const { dialogState: { open, fmt }, layoutState } = props;

  const handleClose = () => {
    open.set(false);
  }

  const handleConfirmClick = async () => {
    // TODO: 이메일 유효성 체크

    const host = 'https://diy-mechanical-keyboard.herokuapp.com';
    const { data } = await axios.post(
      host + `/model/plate/${fmt.get()}`,
      makeLayoutObj(layoutState.get())
    );
    console.log(data);

    handleClose();
  };

  return (
    <div>
      <Dialog open={open.get()} onClose={handleClose} aria-labelledby="form-dialog-title">
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
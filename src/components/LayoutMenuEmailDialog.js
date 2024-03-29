import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { useState } from '@hookstate/core';


export default function LayoutMenuEmailDialog(props) {
  const { openState, onConfirm } = props;
  const emailState = useState('');
  const validState = useState(false);

  const handleClose = () => {
    openState.set(false);
  }

  const handleChange = (e) => {
    const inputEmail = e.target.value;

    // 이메일 유효성 체크
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    validState.set(re.test(String(inputEmail).toLowerCase()));
    emailState.set(validState.get() ? inputEmail : '');
  }

  const handleConfirmClick = () => {
    if (validState.get()) {
      handleClose();
      onConfirm(emailState.get());
    }
  };

  return (
    <div>
      <Dialog open={openState.get()} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Generate Model</DialogTitle>
        <DialogContent>
          <Typography>
            생성된 모델 파일을 받으실 이메일 주소를 입력해주세요.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={handleChange}
          />
          {validState.get() ? '' : <DialogContentText>유효하지 않은 이메일입니다.</DialogContentText>}
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
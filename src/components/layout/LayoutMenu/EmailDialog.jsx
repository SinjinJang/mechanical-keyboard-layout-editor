import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { useUIStore } from '../../../store/uiStore';


export default function EmailDialog(props) {
  const { onConfirm } = props;
  const emailDialog = useUIStore((state) => state.emailDialog);
  const setEmailDialog = useUIStore((state) => state.setEmailDialog);

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleClose = () => {
    setEmailDialog({ ...emailDialog, open: false });
  }

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(String(inputEmail).toLowerCase());
    setIsValid(valid);
    setEmail(valid ? inputEmail : '');
  }

  const handleConfirmClick = () => {
    if (isValid) {
      handleClose();
      onConfirm(email);
    }
  };

  return (
    <div>
      <Dialog open={emailDialog.open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            variant="standard"
            onChange={handleChange}
          />
          {isValid ? '' : <DialogContentText>유효하지 않은 이메일입니다.</DialogContentText>}
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

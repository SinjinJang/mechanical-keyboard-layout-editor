import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@material-ui/icons/Info';

export default function AboutDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ position: 'fixed', right: '5px', top: '5px' }}>
        <IconButton variant='outlined' color='default' onClick={handleClickOpen}>
          <InfoIcon />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='about-dialog-title'
        aria-describedby='about-dialog-description'
      >
        <DialogTitle id='about-dialog-title'>About This App</DialogTitle>
        <DialogContent>
          <DialogContentText id='about-dialog-description'>
            Mechanical Keyboard Layout Editor은 기계식 키보드를 DIY로 제작하기 위해
            키 스위치를 사용자가 원하는 대로 배치하고 이를 3D 프린터로 출력할 수 있도록
            STL 형식의 3D 모델링 파일을 생성해줍니다.
          </DialogContentText>
          <DialogContentText id='about-dialog-description'>
            현재는 키 스위치를 꽂을 수 있는 상판(plate)의 3D 모델링 파일을 생성해주며,
            PCB 용도의 하판도 생성을 할수 있도록 고려 중입니다.
            키 스위치 및 키캡은 기성품을 구매하여 조립이 필요하며 Cherry MX, Kailh 스위치 등이 호환됩니다.
          </DialogContentText>
          <DialogContentText id='about-dialog-description'>
            사용자가 디자인한 키 레이아웃 및 모델링의 소유권은 모두 이를 디자인한 사용자에게 있습니다.
            레이아웃 설정을 서버로 전송하여 3D 모델링 작업을 수행하지만 어떠한 정보도 기록하지 않습니다.
          </DialogContentText>
          <DialogContentText id='about-dialog-description'>
            또한, 생성된 3D 모델링 파일로 출력 시 발생할 수 있는 모든 문제는 사용자에게 책임이 있습니다.
            제가 참고한 키 스위치 및 스테빌라이저에 맞도록 설계가 되었으므로 다른 부품과는 호환에 문제가 있을 수 있습니다.
          </DialogContentText>
          <DialogContentText id='about-dialog-description'>
            발견하신 이슈 및 개선 사항, 또는 문의 사항이 있으시면,&nbsp;
            <a href='https://github.com/SinjinJang/mechanical-keyboard-layout-editor' target='_blank'>GitHub issue</a>
            &nbsp;혹은&nbsp;
            <a href='mailto:sinjin.jang0.gmail.com'>e-mail</a>로 알려주세요.
          </DialogContentText>
          <DialogContentText id='about-dialog-description'>
            <p>알고 있는 이슈 사항:</p>
            <ul>
              <li>높이가 2U인 키 스위치의 스테빌라이저 홀 없음</li>
              <li>PCB-mount 스테빌라이저에서 plate-mount 스테빌라이저로 변경 예정</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

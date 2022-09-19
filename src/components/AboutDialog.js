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
  const [open, setOpen] = React.useState(true);

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
            키 스위치를 사용자가 원하는 대로 배치하고 이를 3D프린터(또는 CNC조각기)로 출력할 수 있도록
            STL 형식의 3D 모델링 또는 DXF 형식의 2D 모델링 파일을 생성해줍니다.
          </DialogContentText>
          <DialogContentText id='about-dialog-description'>
            생성되는 모델링 파일의 종류는
            1) 키 스위치를 꽂을 수 있는 보강판
            2) PCB 용도의 하판
            3) 케이스
            입니다.
            키 스위치, 스테빌라이저 및 키캡은 기성품을 구매하여 조립이 필요하며 Cherry MX, Kailh 스위치 등이 호환됩니다.
          </DialogContentText>
          <DialogContentText id='about-dialog-description'>
            사용자가 디자인한 키 레이아웃 및 모델링의 소유권은 모두 이를 디자인한 사용자에게 있습니다.
            또한, 생성된 3D 모델링 파일로 출력 시 발생할 수 있는 모든 문제는 사용자에게 책임이 있습니다.
            제가 참고한 키 스위치 및 스테빌라이저에 맞도록 설계가 되었으므로 다른 부품과는 호환이 되지 않을 수 있습니다.
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
              <li>2022/09/19: <u>무료 서버 사용으로 인한 제약 사항</u>
                <ul>
                  <li>도면 생성 서버의 사용 가능 시간은 <b>19:00~23:00</b> 입니다</li>
                  <li>많은 키들을 배치하실 경우 <b>도면 생성이 오래</b> 걸립니다. (layout-full 기준 약 40분)</li>
                  <li>위 사용 시간 및 도면 생성 시간을 참고하여 사용하시기 바랍니다</li>
                </ul>
              </li>
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

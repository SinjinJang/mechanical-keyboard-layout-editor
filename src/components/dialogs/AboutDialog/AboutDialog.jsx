import React from 'react';
import '../../common/AnnouncementBanner/AnnouncementBanner.css';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';

export default function AboutDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} sx={{ color: '#b0b3ba' }}>
        <InfoIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='about-dialog-title'
        aria-describedby='about-dialog-description'
        maxWidth="sm"
        fullWidth
        className="about-dialog"
      >
        <DialogTitle id='about-dialog-title'>About This App</DialogTitle>
        <DialogContent>
          <DialogContentText component='div' id='about-dialog-description'>
            <p style={{ marginTop: 0 }}>
              기계식 키보드를 DIY로 제작하기 위한 레이아웃 에디터입니다.
            </p>

            <strong>주요 기능</strong>
            <ul style={{ marginTop: '8px', marginBottom: '16px' }}>
              <li>키 스위치를 원하는 대로 배치</li>
              <li>3D프린터 또는 CNC조각기용 모델링 파일 생성</li>
              <li>STL (3D) / DXF (2D) 형식 지원</li>
            </ul>

            <strong>생성 가능한 모델</strong>
            <ul style={{ marginTop: '8px', marginBottom: '16px' }}>
              <li>키 스위치용 보강판</li>
              <li>PCB 용도의 하판</li>
              <li>케이스</li>
            </ul>

            <strong>호환 부품</strong>
            <ul style={{ marginTop: '8px', marginBottom: '16px' }}>
              <li>Cherry MX, Kailh 스위치 등 호환</li>
              <li>키 스위치, 스테빌라이저, 키캡은 별도 구매 필요</li>
            </ul>

            <strong>주의사항</strong>
            <ul style={{ marginTop: '8px', marginBottom: '16px' }}>
              <li>디자인한 레이아웃 및 모델링의 소유권은 사용자에게 있습니다</li>
              <li>출력 시 발생하는 문제는 사용자 책임입니다</li>
              <li>참고한 부품 규격 외 다른 부품과는 호환되지 않을 수 있습니다</li>
            </ul>

            <strong>문의</strong>
            <ul style={{ marginTop: '8px', marginBottom: '0' }}>
              <li><a href='https://github.com/SinjinJang/mechanical-keyboard-layout-editor' target='_blank' rel='noreferrer'>GitHub Issue</a></li>
              <li><a href='mailto:sinjin.jang0@gmail.com'>E-mail</a></li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button onClick={handleClose} variant="contained" color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

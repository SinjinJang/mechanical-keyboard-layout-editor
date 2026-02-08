import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { ANNOUNCEMENTS } from './announcements';
import './AnnouncementBanner.css';

const STORAGE_KEY = 'mkle_dismissed_announcements';

const getSeverityIcon = (severity) => {
  const iconStyle = { verticalAlign: 'middle', marginRight: '8px' };
  switch (severity) {
    case 'error':
      return <ErrorIcon sx={{ ...iconStyle, color: '#f44336' }} />;
    case 'warning':
      return <WarningIcon sx={{ ...iconStyle, color: '#ff9800' }} />;
    case 'success':
      return <CheckCircleIcon sx={{ ...iconStyle, color: '#4caf50' }} />;
    case 'info':
    default:
      return <InfoIcon sx={{ ...iconStyle, color: '#2196f3' }} />;
  }
};

const AnnouncementBanner = () => {
  const [dismissedIds, setDismissedIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const activeAnnouncements = ANNOUNCEMENTS.filter(
    (announcement) => !dismissedIds.includes(announcement.id)
  );

  // 버튼 클릭 시 전체 공지 또는 읽지 않은 공지만 표시
  const displayAnnouncements = showAll ? ANNOUNCEMENTS : activeAnnouncements;
  const currentAnnouncement = displayAnnouncements[currentIndex];
  const unreadCount = activeAnnouncements.length;

  useEffect(() => {
    // Load dismissed announcements from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    const dismissed = stored ? JSON.parse(stored) : [];
    setDismissedIds(dismissed);
    setInitialized(true);
  }, []);

  useEffect(() => {
    // Auto-open if there are unread announcements (only on first load)
    if (initialized && activeAnnouncements.length > 0) {
      setShowAll(false);
      setCurrentIndex(0);
      setOpen(true);
    }
  }, [initialized]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDontShowAgain = () => {
    if (!currentAnnouncement) return;

    // Add current announcement ID to dismissed list
    const newDismissedIds = [...dismissedIds, currentAnnouncement.id];
    setDismissedIds(newDismissedIds);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDismissedIds));

    // Move to next or close
    const remainingAnnouncements = displayAnnouncements.filter(
      (a) => !newDismissedIds.includes(a.id)
    );

    if (remainingAnnouncements.length === 0 || currentIndex >= displayAnnouncements.length - 1) {
      setCurrentIndex(0);
      if (!showAll) {
        setOpen(false);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < displayAnnouncements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleOpenAnnouncements = () => {
    // 읽지 않은 공지가 있으면 그것만 표시, 없으면 전체 표시
    if (activeAnnouncements.length > 0) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
    setCurrentIndex(0);
    setOpen(true);
  };

  const isCurrentDismissed = currentAnnouncement && dismissedIds.includes(currentAnnouncement.id);

  return (
    <>
      {/* Notification button */}
      <Tooltip title="공지사항">
        <IconButton
          onClick={handleOpenAnnouncements}
          sx={{ color: '#b0b3ba' }}
        >
          <Badge badgeContent={unreadCount} color="error" max={9}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Announcement Dialog */}
      <Dialog
        open={open && displayAnnouncements.length > 0}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        className="announcement-dialog"
      >
        {currentAnnouncement && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              {getSeverityIcon(currentAnnouncement.severity)}
              {currentAnnouncement.title}
              {displayAnnouncements.length > 1 && (
                <span style={{ fontSize: '0.8rem', marginLeft: '8px', opacity: 0.7 }}>
                  ({currentIndex + 1}/{displayAnnouncements.length})
                </span>
              )}
            </DialogTitle>
            <DialogContent>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                {currentAnnouncement.content.map((item, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
              {!isCurrentDismissed ? (
                <Button onClick={handleDontShowAgain} color="inherit" size="small">
                  다시 보지 않기
                </Button>
              ) : (
                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>읽음</span>
              )}
              <div>
                {displayAnnouncements.length > 1 && (
                  <>
                    <Button onClick={handleNext} disabled={currentIndex >= displayAnnouncements.length - 1}>
                      이전
                    </Button>
                    <Button onClick={handlePrev} disabled={currentIndex === 0}>
                      다음
                    </Button>
                  </>
                )}
                <Button onClick={handleClose} variant="contained" color="primary">
                  닫기
                </Button>
              </div>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default AnnouncementBanner;

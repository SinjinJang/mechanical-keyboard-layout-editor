import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ANNOUNCEMENTS } from './announcements';
import './AnnouncementBanner.css';

const STORAGE_KEY = 'mkle_dismissed_announcements';

const AnnouncementBanner = () => {
  const [dismissedIds, setDismissedIds] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Load dismissed announcements from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    const dismissed = stored ? JSON.parse(stored) : [];
    setDismissedIds(dismissed);

    // Find the first non-dismissed announcement
    const activeAnnouncement = ANNOUNCEMENTS.find(
      (announcement) => !dismissed.includes(announcement.id)
    );
    setCurrentAnnouncement(activeAnnouncement);
  }, []);

  const handleDismiss = () => {
    if (!currentAnnouncement) return;

    // Add current announcement ID to dismissed list
    const newDismissedIds = [...dismissedIds, currentAnnouncement.id];
    setDismissedIds(newDismissedIds);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDismissedIds));

    // Find next non-dismissed announcement
    const nextAnnouncement = ANNOUNCEMENTS.find(
      (announcement) => !newDismissedIds.includes(announcement.id)
    );
    setCurrentAnnouncement(nextAnnouncement);
    setExpanded(false);
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  if (!currentAnnouncement) {
    return null;
  }

  return (
    <Collapse in={!!currentAnnouncement}>
      <div className="announcement-banner">
        <Alert
          severity={currentAnnouncement.severity}
          action={
            <>
              <IconButton
                aria-label="expand"
                color="inherit"
                size="small"
                onClick={handleToggleExpand}
              >
                {expanded ? <ExpandLessIcon fontSize="inherit" /> : <ExpandMoreIcon fontSize="inherit" />}
              </IconButton>
              {currentAnnouncement.dismissible && (
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleDismiss}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )}
            </>
          }
        >
          <div onClick={handleToggleExpand} style={{ cursor: 'pointer' }}>
            <AlertTitle>{currentAnnouncement.title}</AlertTitle>
          </div>
          <Collapse in={expanded}>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              {currentAnnouncement.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Collapse>
        </Alert>
      </div>
    </Collapse>
  );
};

export default AnnouncementBanner;

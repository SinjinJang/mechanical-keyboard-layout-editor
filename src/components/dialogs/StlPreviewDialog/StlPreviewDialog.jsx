import './StlPreviewDialog.css';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Close, Download, Palette } from '@mui/icons-material';
import FileSaver from 'file-saver';

import { useThreeScene } from '../../../hooks/useThreeScene';

const MODEL_COLORS = [
  { name: 'Gray', value: '#808080' },
  { name: 'Orange', value: '#ff5533' },
  { name: 'Blue', value: '#4a90d9' },
  { name: 'Green', value: '#4caf50' },
  { name: 'Purple', value: '#9c27b0' },
];

function StlPreviewDialog({ open, onClose, stlData, partType = 'plate', filename }) {
  const { containerRef, loading, modelColor, setModelColor } = useThreeScene({
    open,
    stlData,
  });

  const handleDownload = () => {
    if (stlData) {
      const resolvedFilename = filename || `keyboard-${partType}.stl`;
      const blob = new Blob([stlData], { type: 'model/stl' });
      FileSaver.saveAs(blob, resolvedFilename);
    }
  };

  const handleColorChange = (event, newColor) => {
    if (newColor !== null) {
      setModelColor(newColor);
    }
  };

  const partLabel = partType.charAt(0).toUpperCase() + partType.slice(1);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: '80vh',
          maxHeight: '800px',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>3D Preview - {partLabel}</span>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 0,
          position: 'relative',
          backgroundColor: '#1a1a2e',
          overflow: 'hidden',
        }}
      >
        {loading && (
          <div className="stl-loading-overlay">
            <CircularProgress />
            <span>Loading 3D model...</span>
          </div>
        )}
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        <div className="stl-color-picker">
          <Palette sx={{ mr: 1, color: 'rgba(255,255,255,0.7)' }} />
          <ToggleButtonGroup
            value={modelColor}
            exclusive
            onChange={handleColorChange}
            size="small"
          >
            {MODEL_COLORS.map((color) => (
              <ToggleButton
                key={color.value}
                value={color.value}
                sx={{
                  width: 28,
                  height: 28,
                  minWidth: 28,
                  backgroundColor: color.value,
                  '&:hover': {
                    backgroundColor: color.value,
                    opacity: 0.8,
                  },
                  '&.Mui-selected': {
                    backgroundColor: color.value,
                    border: '2px solid white',
                    '&:hover': {
                      backgroundColor: color.value,
                    },
                  },
                }}
              />
            ))}
          </ToggleButtonGroup>
        </div>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleDownload}
        >
          Download {partLabel} STL
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StlPreviewDialog;

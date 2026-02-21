import './ModelGeneratorDialog.css';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { Close, Download, Visibility } from '@mui/icons-material';
import { useCadGenerator } from '../../../hooks/useCadGenerator';
import StlPreviewDialog from '../StlPreviewDialog';

function ModelGeneratorDialog({ open, onClose, layout }) {
  const [partType, setPartType] = useState('plate');
  const [format, setFormat] = useState('stl');
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewStlData, setPreviewStlData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const { isGenerating, progress, error, generateModel, generatePreview } = useCadGenerator();

  const handlePartTypeChange = (event, newValue) => {
    if (newValue !== null) {
      setPartType(newValue);
    }
  };

  const handleFormatChange = (event, newValue) => {
    if (newValue !== null) {
      setFormat(newValue);
    }
  };

  const handlePreview = async () => {
    try {
      const data = await generatePreview(layout, partType);
      if (data) {
        setPreviewStlData(data);
        setPreviewDialogOpen(true);
      }
    } catch (err) {
      console.error('Preview generation failed:', err);
    }
  };

  const handleGenerate = async () => {
    try {
      const success = await generateModel(layout, format, partType);
      if (success) {
        setSnackbar({
          open: true,
          message: `${partType.charAt(0).toUpperCase() + partType.slice(1)} ${format.toUpperCase()} downloaded successfully!`,
          severity: 'success',
        });
      }
    } catch (err) {
      console.error('Generation failed:', err);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePreviewDialogClose = () => {
    setPreviewDialogOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1e1e2e',
            color: '#fff',
            minWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Generate Model</span>
          <IconButton onClick={onClose} size="small" sx={{ color: '#fff' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="model-generator-section">
            <Typography className="model-generator-section-label">Part Type</Typography>
            <ToggleButtonGroup
              value={partType}
              exclusive
              onChange={handlePartTypeChange}
              fullWidth
              sx={{
                '& .MuiToggleButton-root': {
                  color: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="plate">Plate</ToggleButton>
              <ToggleButton value="case">Case</ToggleButton>
              <ToggleButton value="pcb">PCB</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className="model-generator-section">
            <Typography className="model-generator-section-label">Format</Typography>
            <ToggleButtonGroup
              value={format}
              exclusive
              onChange={handleFormatChange}
              fullWidth
              sx={{
                '& .MuiToggleButton-root': {
                  color: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="stl">STL (3D)</ToggleButton>
              <ToggleButton value="dxf">DXF (2D)</ToggleButton>
            </ToggleButtonGroup>
          </div>

          {isGenerating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {progress}
              </Typography>
            </div>
          )}

          {error && (
            <Alert severity="error" sx={{ marginTop: '16px' }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Visibility />}
            onClick={handlePreview}
            disabled={isGenerating}
          >
            3D Preview
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            Generate & Download
          </Button>
        </DialogActions>
      </Dialog>

      <StlPreviewDialog
        open={previewDialogOpen}
        onClose={handlePreviewDialogClose}
        stlData={previewStlData}
        partType={partType}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ModelGeneratorDialog;

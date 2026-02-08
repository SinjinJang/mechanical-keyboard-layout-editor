import '../../HorizontalBar.css';
import './LayoutMenu.css';

import { useState } from 'react';
import { Button, CircularProgress, Snackbar, Alert } from '@mui/material';

import FileSaver from 'file-saver';

import { useKeyboardStore } from '../../../store/keyboardStore';
import { useUIStore } from '../../../store/uiStore';
import PredefinedDialog from './PredefinedDialog';
import DownloadDialog from './DownloadDialog';
import { plateSize } from '../../../utils/LayoutUtil';
import { useCadGenerator } from '../../../hooks/useCadGenerator';
import { PREDEFINED_LAYOUTS, LAYOUT_LIST } from '../../../assets/layouts';

function _makeLayoutObj(layout, fmt = '', email_to = '') {
  return {
    ...plateSize(layout, true),
    layout: layout,
    fmt: fmt,
    email_to: email_to,
  };
}

function LayoutMenu() {
  const layout = useKeyboardStore((state) => state.layout);
  const setLayout = useKeyboardStore((state) => state.setLayout);
  const setSelectedIndices = useKeyboardStore((state) => state.setSelectedIndices);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);

  const loading = useUIStore((state) => state.loading);
  const setLoading = useUIStore((state) => state.setLoading);
  const layoutListDialog = useUIStore((state) => state.layoutListDialog);
  const setLayoutListDialog = useUIStore((state) => state.setLayoutListDialog);

  const { isGenerating, progress, error, generateSTL, generateDXF } = useCadGenerator();

  // Snackbar state for progress/error messages
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handlePredefinedClick = () => {
    setLayoutListDialog({ ...layoutListDialog, predefinedList: LAYOUT_LIST, open: true });
  };

  const handlePredefinedLayoutSelect = (layoutName) => {
    const selectedLayout = PREDEFINED_LAYOUTS[layoutName];
    if (selectedLayout) {
      const layoutWithRotation = selectedLayout.layout.map(key => ({
        ...key,
        a: key.a !== undefined ? key.a : 0
      }));
      setSelectedIndices([]);
      setLayout(layoutWithRotation);
    }
    setLayoutListDialog({ ...layoutListDialog, open: false });
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    const handleOnChange = (e1) => {
      const reader = new FileReader();
      reader.readAsBinaryString(e1.target.files[0]);
      reader.onloadend = () => {
        const { layout: uploadedLayout } = JSON.parse(reader.result);
        const layoutWithRotation = uploadedLayout.map(key => ({
          ...key,
          a: key.a !== undefined ? key.a : 0
        }));
        setSelectedIndices([]);
        setLayout(layoutWithRotation);
      };
    };
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', '.json');
    fileSelector.onchange = handleOnChange;
    fileSelector.click();
  };

  const handleDownloadClick = () => {
    setDownloadDialogOpen(true);
  };

  const handleDownloadConfirm = (filename) => {
    const data = JSON.stringify(_makeLayoutObj(layout));
    FileSaver.saveAs(
      new Blob([data], { type: 'text/json; charset=utf-8' }),
      filename
    );
  };

  const handleGenerateModelClick = async (fmt) => {
    if (isGenerating || loading) {
      console.log('prevent duplicated click!');
      return;
    }

    setSnackbar({ open: true, message: 'Starting generation...', severity: 'info' });

    try {
      let success;
      if (fmt === 'stl') {
        success = await generateSTL(layout);
      } else {
        success = await generateDXF(layout);
      }

      if (success) {
        setSnackbar({ open: true, message: 'File generated successfully!', severity: 'success' });
      } else if (error) {
        setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: `Error: ${err.message}`, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className='layoutmenu'>
      {(loading || isGenerating) ? (
        <div className='loading'>
          <CircularProgress />
          {progress && <div className='loading-text'>{progress}</div>}
        </div>
      ) : ''}
      <PredefinedDialog
        onSelect={handlePredefinedLayoutSelect}
      />
      <DownloadDialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        onConfirm={handleDownloadConfirm}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <div className='hbar__container'>
        <Button className='hbar__item' variant='outlined' color='primary' onClick={handlePredefinedClick}>
          Predefined Layout
        </Button>
        <Button className='hbar__item' variant='outlined' color='primary' onClick={handleUploadClick}>
          Upload Layout
        </Button>
        <Button className='hbar__item' variant='outlined' color='primary' onClick={handleDownloadClick}>
          Download Layout
        </Button>
        <Button
          className='hbar__item'
          variant='contained'
          color='primary'
          onClick={() => handleGenerateModelClick('stl')}
          disabled={isGenerating}
        >
          Generate STL (3D)
        </Button>
        <Button
          className='hbar__item'
          variant='contained'
          color='primary'
          onClick={() => handleGenerateModelClick('dxf')}
          disabled={isGenerating}
        >
          Generate DXF (2D)
        </Button>
      </div>
    </div>
  );
}

export default LayoutMenu;

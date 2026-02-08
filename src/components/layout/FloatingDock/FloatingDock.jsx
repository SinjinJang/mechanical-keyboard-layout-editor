import './FloatingDock.css';

import { useState } from 'react';
import { IconButton, Tooltip, CircularProgress, Snackbar, Alert } from '@mui/material';
import {
  Dashboard,
  FileUpload,
  FileDownload,
  ViewInAr,
  Architecture,
  Add,
  Remove,
  Visibility
} from '@mui/icons-material';

import FileSaver from 'file-saver';

import { useKeyboardStore } from '../../../store/keyboardStore';
import { useUIStore } from '../../../store/uiStore';
import PredefinedDialog from '../LayoutMenu/PredefinedDialog';
import DownloadDialog from '../LayoutMenu/DownloadDialog';
import StlPreviewDialog from '../../dialogs/StlPreviewDialog';
import { plateSize } from '../../../utils/LayoutUtil';
import { useCadGenerator } from '../../../hooks/useCadGenerator';
import { PREDEFINED_LAYOUTS, LAYOUT_LIST } from '../../../assets/layouts';
import { DEFAULT_KEY } from '../../../utils/constants';

function _makeLayoutObj(layout, fmt = '', email_to = '') {
  return {
    ...plateSize(layout, true),
    layout: layout,
    fmt: fmt,
    email_to: email_to,
  };
}

function FloatingDock() {
  const layout = useKeyboardStore((state) => state.layout);
  const setLayout = useKeyboardStore((state) => state.setLayout);
  const selectedIndices = useKeyboardStore((state) => state.selectedIndices);
  const setSelectedIndices = useKeyboardStore((state) => state.setSelectedIndices);
  const addKey = useKeyboardStore((state) => state.addKey);
  const removeKeys = useKeyboardStore((state) => state.removeKeys);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);

  const loading = useUIStore((state) => state.loading);
  const layoutListDialog = useUIStore((state) => state.layoutListDialog);
  const setLayoutListDialog = useUIStore((state) => state.setLayoutListDialog);

  const { isGenerating, progress, error, generateSTL, generateDXF, generatePreview } = useCadGenerator();

  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewStlData, setPreviewStlData] = useState(null);

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

  const handlePreviewClick = async () => {
    if (isGenerating || loading) {
      console.log('prevent duplicated click!');
      return;
    }

    setSnackbar({ open: true, message: 'Generating 3D preview...', severity: 'info' });

    try {
      const stlData = await generatePreview(layout);
      if (stlData) {
        setPreviewStlData(stlData);
        setPreviewDialogOpen(true);
        setSnackbar({ open: false, message: '', severity: 'info' });
      } else if (error) {
        setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: `Error: ${err.message}`, severity: 'error' });
    }
  };

  const handleClosePreviewDialog = () => {
    setPreviewDialogOpen(false);
  };

  const handleAddSwitch = () => {
    const { width, height } = plateSize(layout, true);
    addKey({
      ...DEFAULT_KEY,
      x: width,
      y: Math.max(height - 1, 0),
    });
  };

  const handleRemoveSwitch = () => {
    if (selectedIndices.length === 0) return;
    removeKeys(selectedIndices);
  };

  const dockItems = [
    // File group
    { icon: <Dashboard />, tooltip: 'Predefined Layout', onClick: handlePredefinedClick, group: 'file' },
    { icon: <FileUpload />, tooltip: 'Upload Layout', onClick: handleUploadClick, group: 'file' },
    { icon: <FileDownload />, tooltip: 'Download Layout', onClick: handleDownloadClick, group: 'file' },
    // Generate group
    { icon: <Visibility />, tooltip: '3D Preview', onClick: handlePreviewClick, disabled: isGenerating, group: 'generate' },
    { icon: <ViewInAr />, tooltip: 'Generate STL (3D)', onClick: () => handleGenerateModelClick('stl'), disabled: isGenerating, group: 'generate' },
    { icon: <Architecture />, tooltip: 'Generate DXF (2D)', onClick: () => handleGenerateModelClick('dxf'), disabled: isGenerating, group: 'generate' },
    // Edit group
    { icon: <Add />, tooltip: 'Add Key', onClick: handleAddSwitch, group: 'edit' },
    { icon: <Remove />, tooltip: 'Remove Key', onClick: handleRemoveSwitch, disabled: selectedIndices.length === 0, group: 'edit' },
  ];

  const renderDockItems = () => {
    const groups = ['file', 'generate', 'edit'];
    return groups.map((group, groupIndex) => (
      <div key={group} className="dock-group">
        {dockItems
          .filter(item => item.group === group)
          .map((item, index) => (
            <Tooltip key={index} title={item.tooltip} placement="top" arrow>
              <span>
                <IconButton
                  className="dock-item"
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  {item.icon}
                </IconButton>
              </span>
            </Tooltip>
          ))}
        {groupIndex < groups.length - 1 && <div className="dock-divider" />}
      </div>
    ));
  };

  return (
    <>
      {(loading || isGenerating) && (
        <div className='loading-overlay'>
          <CircularProgress />
          {progress && <div className='loading-text'>{progress}</div>}
        </div>
      )}
      <PredefinedDialog onSelect={handlePredefinedLayoutSelect} />
      <DownloadDialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        onConfirm={handleDownloadConfirm}
      />
      <StlPreviewDialog
        open={previewDialogOpen}
        onClose={handleClosePreviewDialog}
        stlData={previewStlData}
        filename="keyboard-plate.stl"
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: '100px !important' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <div className="floating-dock">
        {renderDockItems()}
      </div>
    </>
  );
}

export default FloatingDock;

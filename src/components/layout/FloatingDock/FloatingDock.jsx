import './FloatingDock.css';

import { useState } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import {
  Dashboard,
  FileUpload,
  FileDownload,
  ViewInAr,
  Add,
  Remove
} from '@mui/icons-material';

import { useKeyboardStore } from '../../../store/keyboardStore';
import { useUIStore } from '../../../store/uiStore';
import { useLayoutActions } from '../../../hooks/useLayoutActions';
import PredefinedDialog from '../LayoutMenu/PredefinedDialog';
import DownloadDialog from '../LayoutMenu/DownloadDialog';
import ModelGeneratorDialog from '../../dialogs/ModelGeneratorDialog/ModelGeneratorDialog';
import { plateSize } from '../../../utils/LayoutUtil';
import { DEFAULT_KEY } from '../../../utils/constants';

function FloatingDock() {
  const selectedIndices = useKeyboardStore((state) => state.selectedIndices);
  const addKey = useKeyboardStore((state) => state.addKey);
  const removeKeys = useKeyboardStore((state) => state.removeKeys);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);

  const loading = useUIStore((state) => state.loading);

  const [modelDialogOpen, setModelDialogOpen] = useState(false);

  const {
    layout,
    handlePredefinedClick,
    handlePredefinedLayoutSelect,
    handleUploadClick,
    handleDownloadConfirm,
  } = useLayoutActions();

  const handleDownloadClick = () => {
    setDownloadDialogOpen(true);
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
    { icon: <ViewInAr />, tooltip: 'Generate Model', onClick: () => setModelDialogOpen(true), group: 'generate' },
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
      {loading && (
        <div className='loading-overlay'>
          <CircularProgress />
        </div>
      )}
      <PredefinedDialog onSelect={handlePredefinedLayoutSelect} />
      <DownloadDialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        onConfirm={handleDownloadConfirm}
      />
      <ModelGeneratorDialog
        open={modelDialogOpen}
        onClose={() => setModelDialogOpen(false)}
        layout={layout}
      />
      <div className="floating-dock">
        {renderDockItems()}
      </div>
    </>
  );
}

export default FloatingDock;

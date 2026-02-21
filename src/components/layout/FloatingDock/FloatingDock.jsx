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

import FileSaver from 'file-saver';

import { useKeyboardStore } from '../../../store/keyboardStore';
import { useUIStore } from '../../../store/uiStore';
import PredefinedDialog from '../LayoutMenu/PredefinedDialog';
import DownloadDialog from '../LayoutMenu/DownloadDialog';
import ModelGeneratorDialog from '../../dialogs/ModelGeneratorDialog/ModelGeneratorDialog';
import { plateSize } from '../../../utils/LayoutUtil';
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

  const [modelDialogOpen, setModelDialogOpen] = useState(false);

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

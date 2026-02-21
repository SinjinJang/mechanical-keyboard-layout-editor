import '../../HorizontalBar.css';
import './LayoutMenu.css';

import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

import FileSaver from 'file-saver';

import { useKeyboardStore } from '../../../store/keyboardStore';
import { useUIStore } from '../../../store/uiStore';
import PredefinedDialog from './PredefinedDialog';
import DownloadDialog from './DownloadDialog';
import ModelGeneratorDialog from '../../dialogs/ModelGeneratorDialog/ModelGeneratorDialog';
import { plateSize } from '../../../utils/LayoutUtil';
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

  return (
    <div className='layoutmenu'>
      {loading ? (
        <div className='loading'>
          <CircularProgress />
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
      <ModelGeneratorDialog
        open={modelDialogOpen}
        onClose={() => setModelDialogOpen(false)}
        layout={layout}
      />
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
          onClick={() => setModelDialogOpen(true)}
        >
          Generate Model
        </Button>
      </div>
    </div>
  );
}

export default LayoutMenu;

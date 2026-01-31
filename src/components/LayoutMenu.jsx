import './HorizontalBar.css';
import './LayoutMenu.css';

import { Button, CircularProgress } from '@mui/material';

import axios from 'axios';
import FileSaver from 'file-saver';

import { useKeyboardStore } from '../store/keyboardStore';
import { useUIStore } from '../store/uiStore';
import LayoutMenuEmailDialog from './LayoutMenuEmailDialog';
import LayoutMenuPredefinedDialog from './LayoutMenuPredefinedDialog';
import { plateSize } from '../utils/LayoutUtil';
import { API_HOST } from '../utils/constants';

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
  const setSelectedIndex = useKeyboardStore((state) => state.setSelectedIndex);

  const loading = useUIStore((state) => state.loading);
  const setLoading = useUIStore((state) => state.setLoading);
  const emailDialog = useUIStore((state) => state.emailDialog);
  const setEmailDialog = useUIStore((state) => state.setEmailDialog);
  const layoutListDialog = useUIStore((state) => state.layoutListDialog);
  const setLayoutListDialog = useUIStore((state) => state.setLayoutListDialog);

  const handlePredefinedClick = async () => {
    setLoading(true);
    const { data: { result } } = await axios.get(`${API_HOST}/layouts`);
    setLayoutListDialog({ ...layoutListDialog, predefinedList: result, open: true });
    setLoading(false);
  };

  const handlePredefinedLayoutSelect = async (fname) => {
    setLoading(true);
    const { data: { result } } = await axios.get(`${API_HOST}/layouts/${fname}`);
    const layoutWithRotation = result.layout.map(key => ({
      ...key,
      a: key.a !== undefined ? key.a : 0
    }));
    setSelectedIndex(-1);
    setLayout(layoutWithRotation);
    setLayoutListDialog({ ...layoutListDialog, open: false });
    setLoading(false);
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
        setSelectedIndex(-1);
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
    const data = JSON.stringify(_makeLayoutObj(layout));
    FileSaver.saveAs(
      new Blob([data], { type: 'text/json; charset=utf-8' }),
      'layout.json'
    );
  };

  const handleGenerateModelClick = (fmt) => {
    if (loading) {
      console.log('prevent duplicated click!');
      return;
    }
    setEmailDialog({ fmt, open: true });
  };

  const handleConfirmEmailClick = async (email) => {
    setLoading(true);
    const { data } = await axios.post(
      `${API_HOST}/modeling`,
      _makeLayoutObj(layout, emailDialog.fmt, email)
    );
    console.log(data);
    setLoading(false);
  };

  return (
    <div className='layoutmenu'>
      {loading ? <div className='loading'><CircularProgress /></div> : ''}
      <LayoutMenuEmailDialog
        onConfirm={handleConfirmEmailClick}
      />
      <LayoutMenuPredefinedDialog
        onSelect={handlePredefinedLayoutSelect}
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
        <Button className='hbar__item' variant='contained' color='primary' onClick={() => handleGenerateModelClick('stl')}>
          Generate STL (3D)
        </Button>
        <Button className='hbar__item' variant='contained' color='primary' onClick={() => handleGenerateModelClick('dxf')}>
          Generate DXF (2D)
        </Button>
      </div>
    </div>
  );
}

export default LayoutMenu;

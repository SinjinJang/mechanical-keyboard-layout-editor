import './HorizontalBar.css';
import './LayoutMenu.css';

import { useState } from '@hookstate/core';
import { Button, CircularProgress } from '@material-ui/core';

import axios from 'axios';
import FileSaver from 'file-saver';

import LayoutMenuEmailDialog from './LayoutMenuEmailDialog';
import LayoutMenuPredefinedDialog from './LayoutMenuPredefinedDialog';
import { plateSize } from '../utils/LayoutUtil';


const HOST = 'http://sinjin.iptime.org:7000';

function _makeLayoutObj(layout, email_to = '') {
  return {
    ...plateSize(layout, true),
    layout: layout,
    email_to: email_to,
  };
}

function LayoutMenu(props) {
  const { layoutState, selectedState } = props;
  const loadingState = useState(false);

  const emailDialogState = useState({
    open: false,
    fmt: '',
  });

  const layoutListDialogState = useState({
    open: false,
    predefinedList: [],
  });

  const handlePredefinedClick = async () => {
    loadingState.set(true);

    const { data: { result } } = await axios.get(`${HOST}/layout`);
    layoutListDialogState.predefinedList.set(result);
    layoutListDialogState.open.set(true);

    loadingState.set(false);
  };

  const handlePredefinedLayoutSelect = async (fname) => {
    loadingState.set(true);

    const { data: { result } } = await axios.get(`${HOST}/layout/${fname}`);
    selectedState.set(-1);
    layoutState.set(result.layout);
    layoutListDialogState.open.set(false);

    loadingState.set(false);
  };

  const handleUploadClick = (e) => {
    e.preventDefault();

    const handleOnChange = (e1) => {
      const reader = new FileReader();
      reader.readAsBinaryString(e1.target.files[0]);
      reader.onloadend = () => {
        const { layout } = JSON.parse(reader.result);
        selectedState.set(-1);
        layoutState.set(layout);
      };
    };

    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', '.json');
    fileSelector.onchange = handleOnChange;
    fileSelector.click();
  };

  const handleDownloadClick = () => {
    const data = JSON.stringify(_makeLayoutObj(layoutState.get()));
    FileSaver.saveAs(
      new Blob([data], { type: 'text/json; charset=utf-8' }),
      'layout.json'
    );
  };

  const handleGenerateModelClick = (fmt) => {
    if (loadingState.get()) {
      console.log('prevent duplicated click!');
      return;
    }

    emailDialogState.fmt.set(fmt);
    emailDialogState.open.set(true);
  };

  const handleConfirmEmailClick = async (email) => {
    loadingState.set(true);

    const { data } = await axios.post(
      `${HOST}/model/all/${emailDialogState.fmt.get()}`,
      _makeLayoutObj(layoutState.get(), email)
    );
    console.log(data);

    loadingState.set(false);
  };

  return (
    <div className='layoutmenu'>
      {loadingState.get() ? <div className='loading'><CircularProgress /></div> : ''}
      <LayoutMenuEmailDialog
        openState={emailDialogState.open}
        onConfirm={handleConfirmEmailClick}
      />
      <LayoutMenuPredefinedDialog
        dialogState={layoutListDialogState}
        onSelect={handlePredefinedLayoutSelect}
      />
      <div className='hbar__container'>
        <Button
          className='hbar__item'
          variant='outlined'
          color='primary'
          onClick={handlePredefinedClick}
        >
          Predefined Layout
        </Button>
        <Button
          className='hbar__item'
          variant='outlined'
          color='primary'
          onClick={handleUploadClick}
        >
          Upload Layout
        </Button>
        <Button
          className='hbar__item'
          variant='outlined'
          color='primary'
          onClick={handleDownloadClick}
        >
          Download Layout
        </Button>
        <Button
          className='hbar__item'
          variant='contained'
          color='primary'
          onClick={() => handleGenerateModelClick('stl')}
        >
          Generate STL (3D)
        </Button>
        <Button
          className='hbar__item'
          variant='contained'
          color='primary'
          onClick={() => handleGenerateModelClick('dxf')}
        >
          Generate DXF (2D)
        </Button>
      </div>
    </div>
  );
}

export default LayoutMenu;

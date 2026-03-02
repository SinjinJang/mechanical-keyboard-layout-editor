import FileSaver from 'file-saver';

import { useKeyboardStore } from '../store/keyboardStore';
import { useUIStore } from '../store/uiStore';
import { makeLayoutObj } from '../utils/LayoutUtil';
import { PREDEFINED_LAYOUTS, LAYOUT_LIST } from '../assets/layouts';

function normalizeRotation(key) {
  return { ...key, a: key.a !== undefined ? key.a : 0 };
}

export function useLayoutActions() {
  const layout = useKeyboardStore((state) => state.layout);
  const setLayout = useKeyboardStore((state) => state.setLayout);
  const setSelectedIndices = useKeyboardStore((state) => state.setSelectedIndices);

  const layoutListDialog = useUIStore((state) => state.layoutListDialog);
  const setLayoutListDialog = useUIStore((state) => state.setLayoutListDialog);

  const handlePredefinedClick = () => {
    setLayoutListDialog({ ...layoutListDialog, predefinedList: LAYOUT_LIST, open: true });
  };

  const handlePredefinedLayoutSelect = (layoutName) => {
    const selectedLayout = PREDEFINED_LAYOUTS[layoutName];
    if (selectedLayout) {
      setSelectedIndices([]);
      setLayout(selectedLayout.layout.map(normalizeRotation));
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
        setSelectedIndices([]);
        setLayout(uploadedLayout.map(normalizeRotation));
      };
    };
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', '.json');
    fileSelector.onchange = handleOnChange;
    fileSelector.click();
  };

  const handleDownloadConfirm = (filename) => {
    const data = JSON.stringify(makeLayoutObj(layout));
    FileSaver.saveAs(
      new Blob([data], { type: 'text/json; charset=utf-8' }),
      filename
    );
  };

  return {
    layout,
    handlePredefinedClick,
    handlePredefinedLayoutSelect,
    handleUploadClick,
    handleDownloadConfirm,
  };
}

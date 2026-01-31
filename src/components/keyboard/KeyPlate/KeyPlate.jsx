import './KeyPlate.css';

import { useKeyboardStore } from '../../../store/keyboardStore';
import { plateSize } from '../../../utils/LayoutUtil';
import EditPanel from '../EditPanel';
import KeySwitch from '../KeySwitch';
import LayoutMenu from '../../layout/LayoutMenu';


function KeyPlate() {
  const layout = useKeyboardStore((state) => state.layout);
  const plateSizeInUnit = plateSize(layout, true);

  return (
    <div>
      <LayoutMenu />
      <EditPanel />
      <div
        className='key-plate'
        style={plateSize(layout)}>
        {layout.map((key, index) =>
          <KeySwitch
            key={index}
            seq={index}
            keyData={key}
          />
        )}
      </div>
      <div className='key-plate-info'>
        {layout.length} keys on {plateSizeInUnit.width}U x {plateSizeInUnit.height}U
      </div>
    </div >
  );
}

export default KeyPlate;

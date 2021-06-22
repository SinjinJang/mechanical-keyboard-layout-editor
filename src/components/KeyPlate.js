import './KeyPlate.css';

import { useState } from '@hookstate/core';

import { plateSize } from '../utils/LayoutUtil';
import EditPanel from './EditPanel';
import KeySwitch from './KeySwitch';
import LayoutMenu from './LayoutMenu';


function KeyPlate() {
  const layoutState = useState([
    { label: 'New Key', w: 1, h: 1, x: 0, y: 0 },
  ]);
  const selectedState = useState(-1);

  return (
    <div>
      <LayoutMenu
        layoutState={layoutState}
        selectedState={selectedState}
      />
      <EditPanel
        layoutState={layoutState}
        selectedState={selectedState}
      />
      <div
        className='key-plate'
        style={plateSize(layoutState.get())}>
        {layoutState.map((keyState, index) =>
          <KeySwitch
            key={index}
            seq={index}
            keyState={keyState}
            selectedState={selectedState}
          />
        )}
      </div>
    </div>
  );
}

export default KeyPlate;

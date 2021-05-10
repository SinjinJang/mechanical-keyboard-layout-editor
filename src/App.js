import './App.css';
import React from 'react';
import { useState } from '@hookstate/core';

import * as LayoutUtil from './utils/LayoutUtil';
import EditPanel from './components/EditPanel';
import KeySwitch from './components/KeySwitch';
import Footer from './components/Footer';


function KeyPlate() {
  const layoutState = useState([
    { label: 'Key 1', w: 1, h: 1, x: 0, y: 0 },
  ]);
  const selectedState = useState(-1);

  return (
    <div>
      <EditPanel
        layoutState={layoutState}
        selectedState={selectedState}
      />
      <div
        className='key-plate'
        style={LayoutUtil.plateSize(layoutState.get())}>
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
  )
}

function App() {
  return (
    <div className="App">
      <h1>Mechanical Keyboard Layout Editor</h1>
      <KeyPlate />
      <Footer />
    </div>
  );
}

export default App;

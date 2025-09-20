import React from 'react';
import { render } from '@testing-library/react';
import { useState } from '@hookstate/core';
import KeySwitch from './KeySwitch';

test('KeySwitch renders with rotation property', () => {
  // Create a mock key state with rotation property
  const mockKeyState = useState({
    label: 'Test Key',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    a: 45  // 45 degree rotation
  });
  
  const mockSelectedState = useState(-1);
  
  const { container } = render(
    <KeySwitch
      seq={0}
      keyState={mockKeyState}
      selectedState={mockSelectedState}
    />
  );
  
  // Check that the key switch is rendered with rotation transform
  const keyElement = container.querySelector('.key-switch');
  expect(keyElement).toBeInTheDocument();
  expect(keyElement.style.transform).toBe('rotate(45deg)');
  expect(keyElement.style.transformOrigin).toBe('center center');
});

test('KeySwitch renders with default rotation (0 degrees)', () => {
  // Create a mock key state with default rotation
  const mockKeyState = useState({
    label: 'Test Key',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    a: 0  // 0 degree rotation (default)
  });
  
  const mockSelectedState = useState(-1);
  
  const { container } = render(
    <KeySwitch
      seq={0}
      keyState={mockKeyState}
      selectedState={mockSelectedState}
    />
  );
  
  // Check that the key switch is rendered with no rotation
  const keyElement = container.querySelector('.key-switch');
  expect(keyElement).toBeInTheDocument();
  expect(keyElement.style.transform).toBe('rotate(0deg)');
});
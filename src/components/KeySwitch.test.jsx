import React from 'react';
import { render } from '@testing-library/react';
import { hookstate, useHookstate } from '@hookstate/core';
import KeySwitch from './KeySwitch';

function TestKeySwitch({ initialState, seq }) {
  const keyState = useHookstate(initialState);
  const selectedState = useHookstate(-1);
  return (
    <KeySwitch seq={seq} keyState={keyState} selectedState={selectedState} />
  );
}

test('KeySwitch renders with rotation property', () => {
  const { container } = render(
    <TestKeySwitch
      initialState={{ label: 'Test Key', x: 0, y: 0, w: 1, h: 1, a: 45 }}
      seq={0}
    />
  );

  const keyElement = container.querySelector('.key-switch');
  expect(keyElement).toBeInTheDocument();
  expect(keyElement.style.transform).toBe('rotate(45deg)');
  expect(keyElement.style.transformOrigin).toBe('center center');
});

test('KeySwitch renders with default rotation (0 degrees)', () => {
  const { container } = render(
    <TestKeySwitch
      initialState={{ label: 'Test Key', x: 0, y: 0, w: 1, h: 1, a: 0 }}
      seq={0}
    />
  );

  const keyElement = container.querySelector('.key-switch');
  expect(keyElement).toBeInTheDocument();
  expect(keyElement.style.transform).toBe('rotate(0deg)');
});

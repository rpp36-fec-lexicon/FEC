import React from 'react';
import App from '../client/src/App.jsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'

test('dummy test to check if jest works', () => {
    expect(true).toBe(true);
  });

test('renders react component', () => {
  render(<App />);
  const divElement = screen.getByText('Atelier');
  expect(divElement).toBeInTheDocument();
});
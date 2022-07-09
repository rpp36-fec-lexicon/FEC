import React from 'react';
<<<<<<< HEAD
import App from './App.jsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

test('dummy test to check if jest works', () => {
  expect(true).toBe(true);
});

test('renders word Atelier', () => {
  render(<App />);
  const divElement = screen.getByText('Atelier');
  expect(divElement).toBeInTheDocument();
});

=======
// import App from './App.jsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'

test('dummy test to check if jest works', async () => {
    expect(true).toBe(true);
  });

// test('renders word Atelier', () => {
//   render(<App />);
//   const divElement = screen.getByText('Atelier');
//   expect(divElement).toBeInTheDocument();
// });
// /*
>>>>>>> dab1d051fe6516e33f2ff2adaea2ee1ed9c3f5eb

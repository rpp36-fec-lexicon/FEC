import React from 'react';
import App from './App.jsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'

test('dummy test to check if jest works', () => {
    expect(true).toBe(true);
  });

test('renders word Atelier', () => {
  render(<App />);
  const divElement = screen.getByText('Atelier');
  expect(divElement).toBeInTheDocument();
});
/*
TESTING REQUIREMENTS
-------------------------------
Unit Tests for server and client code using Jest
Code Coverage reports for unit tests
Aim for 70-80% coverage
Aim for 1 End-to-End test for each widget
Consider adding Browser Integration tests with Jest + React-Testing-Library/Enzyme
  for your React Components (probably not enzyme unless you are using a lower version of react)
*/
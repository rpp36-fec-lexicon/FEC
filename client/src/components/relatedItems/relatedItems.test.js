import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import RelatedAndOutfit from './index.jsx';
import Related from './components/Related.jsx';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'

describe('Related Products', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('Testing main entry (Index) of Related Products component', ()=>{
    it('should find headers to both "related products" and "your outfit"', async () => {
      render(<RelatedAndOutfit />);
      expect(screen.getByText("Related Products:")).toBeInTheDocument();
      expect(screen.getByText("Your Outfit:")).toBeInTheDocument();
    });
  })

  describe('Testing Related Products component', ()=>{
    it('counts the number of divs created by Related class component', async () => {
      act(() => {
        ReactDOM.createRoot(temporarySandBox).render(<Related />);
      });
      let renderedInfo = temporarySandBox.querySelector('div');
      expect(renderedInfo.childNodes.length).toBe(2);
    });
  })

})

/*
// TESTING REQUIREMENTS
// -------------------------------
// Unit Tests for server and client code using Jest
// Code Coverage reports for unit tests
// Aim for 70-80% coverage
// Aim for 1 End-to-End test for each widget
// Consider adding Browser Integration tests with Jest + React-Testing-Library/Enzyme
//   for your React Components (probably not enzyme unless you are using a lower version of react)
// */
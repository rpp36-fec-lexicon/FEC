import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import ShortReviewBody from './ShortReviewBody.jsx';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'

describe('ShortReviewBody', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('ShortReviewBody Component', ()=>{
    it('should render all of the review body received as props', async () => {
      render(<ShortReviewBody reviewBody={'this is the short review body'}/>);
      expect(screen.getByText('this is the short review body')).toBeInTheDocument();
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
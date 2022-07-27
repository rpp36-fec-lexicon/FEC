import React from 'react';
import ReactDOM from 'react-dom/client';
import RatingBreakdown from './RatingBreakdown.jsx';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('RatingBreakdown', () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('RatingBreakdown', () => {
    const ratings = {
      "1": "1",
      "2": "1",
      "3": "1",
      "4": "1",
      "5": "1"
    };


  })
})

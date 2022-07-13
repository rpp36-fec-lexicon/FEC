import React from 'react';
import ReactDOM from 'react-dom/client';
import MoreReviews from '../Reviews/MoreReviews.jsx';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ReviewItem', () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  // describe('ReviewItem', () => {
  //   it('should ', async => {

  //   });
  // });
});
import React from 'react';
import ReactDOM from 'react-dom/client';
import MoreReviews from '../Reviews/MoreReviews.jsx';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('MoreReviews', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('MoreReviews Component', ()=>{
    render(<MoreReviews />);
    const buttonEle = screen.getByText('MORE REVIEWS');

    it('should render the button with "MORE REVIEWS" text', async () => {
      expect(buttonEle).toBeInTheDocument();
    });
  })
})


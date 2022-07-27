import React from 'react';
import ReactDOM from 'react-dom/client';
import SellerResponse from './SellerResponse.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('SellerResponse', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('SellerResponse Component', ()=>{
    const response = 'Thank you for your feedback, we will pass this to our production team.';

    it('should render the seller response to the review', async() => {
      render(<SellerResponse response={response}/>);
      const message = screen.getByText('Thank you for your feedback, we will pass this to our production team.');
      expect(message).toBeInTheDocument();
    })
  });
});




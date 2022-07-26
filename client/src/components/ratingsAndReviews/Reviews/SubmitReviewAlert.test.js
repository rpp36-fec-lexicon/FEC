import React from 'react';
import ReactDOM from 'react-dom/client';
import SubmitReviewAlert from './SubmitReviewAlert.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('SubmitReviewAlert', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('SubmitReviewAlert Component', ()=>{
    const errors = ['recommend', 'review summary', 'review body', 'email'];

    it('should render the alert which includes the fields that have not been filled', async() => {
      render(<SubmitReviewAlert errors={errors}/>);
      const alert = screen.getByText('You must enter the following: recommend, review summary, review body, email');
      expect(alert).toBeInTheDocument();
    })

  })
})

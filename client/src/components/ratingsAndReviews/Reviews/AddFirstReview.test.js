import React from 'react';
import ReactDOM from 'react-dom/client';
import AddFirstReview from './AddFirstReview.jsx';
import userEvent from '@testing-library/user-event';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('AddFirstReview', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('AddFirstReview Component', ()=>{

    it('should have a "BE THE FIRST TO ADD A REVIEW!" button', async() => {
      render(<AddFirstReview />);
      const buttonEle = screen.getByRole('button', {name: 'BE THE FIRST TO ADD A REVIEW!'});
      expect(buttonEle).toBeInTheDocument();
    });

    it('should invoke "showReviewModalFunc" function when clicked', async () => {
      const mockFunc = jest.fn();
      render(<AddFirstReview showReviewModalFunc={mockFunc}/>);
      const buttonEle = screen.getByRole('button', {name: 'BE THE FIRST TO ADD A REVIEW!'});
      await userEvent.click(buttonEle);
      expect(mockFunc).toHaveBeenCalled();
    });
  })
})

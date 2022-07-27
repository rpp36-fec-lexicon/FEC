import React from 'react';
import ReactDOM from 'react-dom/client';
import AddAnotherReview from './AddAnotherReview.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('AddAnotherReview', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('AddAnotherReview Component', ()=>{

    it('should have a "ADD A REVIEW  +" button', async () => {
      render(<AddAnotherReview />);
      const buttonEle = screen.getByRole('button', {name: 'ADD A REVIEW  +'});
      expect(buttonEle).toBeInTheDocument();
    });

    it('should invoke "showReviewModalFunc" when clicked', async() => {
      const mockFunc = jest.fn();
      render(<AddAnotherReview showReviewModalFunc={mockFunc} />);
      const buttonEle = screen.getByRole('button', name: {'ADD A REVIEW  +'});
      await userEvent.click(buttonEle);
      expect(mockFunc).toHaveBeenCalled();
    })
  })
})

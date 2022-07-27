import React from 'react';
import ReactDOM from 'react-dom/client';
import MoreReviews from './MoreReviews.jsx';
import userEvent from '@testing-library/user-event';

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

    it('should have a "More Review" button', async() => {
      render(<MoreReviews />);
      const buttonEle = screen.getByRole('button', {name: 'MORE REVIEWS'});
      expect(buttonEle).toBeInTheDocument();
    });

    it('should invoke "showMoreReviewsFunc" function when clicked', async () => {
      const mockFunc = jest.fn();
      render(<MoreReviews showMoreReviewsFunc={mockFunc}/>);
      const buttonEle = screen.getByRole('button', {name: 'MORE REVIEWS'});
      await userEvent.click(buttonEle);
      expect(mockFunc).toHaveBeenCalled();
    });
  })
})


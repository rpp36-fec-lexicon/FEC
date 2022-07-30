import React from 'react';
import ReactDOM from 'react-dom/client';
import StarReviewIcon from './StarReviewIcon.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('StarReviewIcon', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('StarReviewIcon Component', ()=>{
    it('should render a star icon', async() => {
      render(<StarReviewIcon />);
      const star = screen.getByTestId('starIcon');
      expect(star).toBeInTheDocument();
    })

    it('should invoke "clickFillStarFunc" when user clicks on a star', async() => {
      const mockFunc = jest.fn();
      render(<StarReviewIcon clickFillStarFunc={mockFunc}/>);
      const star = screen.getByTestId('starIcon');
      await userEvent.click(star);
      expect(mockFunc).toHaveBeenCalled();
    })

  })
})

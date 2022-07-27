import React from 'react';
import ReactDOM from 'react-dom/client';
import ReviewItem from './ReviewItem.jsx';
import userEvent from '@testing-library/user-event';
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

  describe('ReviewItem', () => {
    const review = {
      "review_id": 1275188,
      "rating": 5,
      "summary": "I love it!",
      "recommend": false,
      "response": null,
      "body": "- If the reviewer recommends buying the product, the text “I recommend this product” and a checkmark icon will     display below the review. This is going to be the review that is longer than 250 characters just to see if the conditional   rendering functionality works",
      "date": "2022-06-07T00:00:00.000Z",
      "reviewer_name": "test",
      "helpfulness": 89,
      "photos": []
    };

    it('should render review summary from the review received as props', async() => {

      render(<ReviewItem review={review}/>);
      const summaryTextEle = screen.getByText('I love it!');
      expect(summaryTextEle).toBeInTheDocument();
    });

    it('should increase helpfulness count by 1 when Yes is clicked', async() => {
      render(<ReviewItem review={review}/>)
      let helpfulnessCountEle;
      //Before Yes Click
      helpfulnessCountEle = screen.getByText(`(${review.helpfulness})`);
      expect(helpfulnessCountEle).toBeInTheDocument();

      //After yes Click
      const yesClickEle = screen.getByText('Yes');
      await userEvent.click(yesClickEle);
      helpfulnessCountEle = screen.getByText(`(${review.helpfulness + 1})`);
      expect(helpfulnessCountEle).toBeInTheDocument();
    })
  });
});

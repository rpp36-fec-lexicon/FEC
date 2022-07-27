import React from 'react';
import ReactDOM from 'react-dom/client';
import ReviewsHeading from './ReviewsHeading.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('ReviewsHeading', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('ReviewsHeading Component', ()=>{
    const reviews = [
      {
        "review_id": 1254662,
        "rating": 3,
        "summary": "Aliquid perspiciatis similique nobis animi laudantium porro aliquam eligendi.",
        "recommend": true,
        "response": null,
        "body": "Est est exercitationem ut quos nihil eaque quaerat. Quam explicabo voluptatum ipsam voluptatibus explicabo. Similique      quibusdam dolorum culpa expedita nobis et nam dicta. Accusantium voluptatibus autem est provident doloribus tempore.",
        "date": "2021-08-18T00:00:00.000Z",
        "reviewer_name": "Fritz_Klocko44",
        "helpfulness": 21,
        "photos": [
          {
            "id": 2454046,
            "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
          }
        ]
      },
      {
        "review_id": 1275188,
        "rating": 5,
        "summary": "love it",
        "recommend": false,
        "response": "\"Totam non ex ut magni.\"",
        "body": "- If the reviewer recommends buying the product, the text “I recommend this product” and a checkmark icon will     display below the review. This is going to be the review that is longer than 250 characters just to see if the conditional   rendering functionality works",
        "date": "2022-06-07T00:00:00.000Z",
        "reviewer_name": "test",
        "helpfulness": 89,
        "photos": []
      },
      {
        "review_id": 1275236,
        "rating": 4,
        "summary": "Good quality",
        "recommend": true,
        "response": null,
        "body": "the quality is good, might need some more colors, great",
        "date": "2022-09-09T00:00:00.000Z",
        "reviewer_name": "ssss",
        "helpfulness": 12,
        "photos": []
      },
    ];

    it('should render how many reviews there are in the heading', async() => {
      render(<ReviewsHeading reviews={reviews}/>);
      const heading = screen.getByText('3 reviews, sorted by', {exact: false});
      expect(heading).toBeInTheDocument();
    })

  });
});

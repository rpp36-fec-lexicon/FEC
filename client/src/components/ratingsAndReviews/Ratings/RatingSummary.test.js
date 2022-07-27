import React from 'react';
import ReactDOM from 'react-dom/client';
import RatingSummary from './RatingSummary.jsx';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('RatingSummary', () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('RatingSummary', () => {
    const metaData = {
      "product_id": "71697",
      "ratings": {
        "1": "1",
        "2": "1",
        "3": "1",
        "4": "1",
        "5": "1"
      },
      "recommended": {
        "false": "2",
        "true": "8"
      },
      "characteristics": {
        "Fit": {
          "id": 240582,
          "value": "3.0869565217391304"
        },
        "Length": {
          "id": 240583,
          "value": "3.0434782608695652"
        },
        "Comfort": {
          "id": 240584,
          "value": "3.0434782608695652"
        },
        "Quality": {
          "id": 240585,
          "value": "3.2608695652173913"
        }
      }
    };

    const ratings = metaData.ratings;
    let totalNumberOfRatings = 0;
    let totalRatings = 0;
    let rating;
    for (var key in ratings) {
      totalNumberOfRatings += parseInt(ratings[key]);
      totalRatings += (parseInt(key) * parseInt(ratings[key]));
    }

    rating = totalRatings / totalNumberOfRatings;
    rating = Math.round(10 * rating) / 10;


    it('should render average rating', async() => {
      render(<RatingSummary metaData={metaData} rating={rating}/>);
      const ratingEle = screen.getByText('3');
      expect(ratingEle).toBeInTheDocument();
    });
  })
});
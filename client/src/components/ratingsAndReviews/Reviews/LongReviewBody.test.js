import React from 'react';
import ReactDOM from 'react-dom/client';
import LongReviewBody from './LongReviewBody.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('LongReviewBody', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('LongReviewBody Component', ()=>{
    const fullReviewBody = 'Here is another review that is longer than 250 characters. I love this product, I totally would recommend this product to all of my friends and family and in-laws and I would even buy it in all of the other colors and wear it on every day of the week. I would also buy it as gifts for my mom and aunties and sisters and I will buy it for my girlfriends\' birthdays as well.';
    const first250Chars = 'Here is another review that is longer than 250 characters. I love this product, I totally would recommend this product to all of my friends and family and in-laws and I would even buy it in all of the other colors and wear it on every day of the week';


    it('should render the first 250 characters first then render full review when "Show More" is clicked', async () => {
      render(<LongReviewBody reviewBody={fullReviewBody}/>);
      let reviewTextEle;

      //Upon componentDidMount
      reviewTextEle = screen.getByText(first250Chars);
      expect(reviewTextEle).toBeInTheDocument();

      //After clicking "Show More"
      await userEvent.click(screen.getByText('Show more'));
      reviewTextEle = screen.getByText(fullReviewBody);
      expect(reviewTextEle).toBeInTheDocument();
    });
  })
})

import React from 'react';
import ReactDOM from 'react-dom/client';
import ReviewModal from './ReviewModal.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('ReviewModal', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('ReviewModal Component', ()=>{
    const metaData = {
      "product_id": "71697",
      "ratings": {
        "1": "3",
        "2": "1",
        "3": "6",
        "4": "6",
        "5": "13"
      },
      "recommended": {
        "false": "5",
        "true": "24"
      },
      "characteristics": {
        "Size": {
          "id": 240582,
          "value": "1"
        },
        "Width": {
          "id": 240582,
          "value": "1"
        },
        "Fit": {
          "id": 240582,
          "value": "1"
        },
        "Length": {
          "id": 240583,
          "value": "4.5"
        },
        "Comfort": {
          "id": 240584,
          "value": "3.2"
        },
        "Quality": {
          "id": 240585,
          "value": "2.0"
        }
      }
    };


    it('should render "Write Your Review" heading', async() => {
      render(<ReviewModal metaData={metaData}/>);
      const heading = screen.getByText('Write Your Review');
      expect(heading).toBeInTheDocument();
    })



  });
});

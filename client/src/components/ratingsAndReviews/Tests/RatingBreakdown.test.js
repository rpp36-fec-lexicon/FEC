import React from 'react';
import ReactDOM from 'react-dom/client';
import RatingBreakdown from '../Ratings/RatingBreakdown.jsx';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('RatingBreakdown', () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('RatingBreakdown', () => {
    const ratings = {
      "1": "1",
      "2": "1",
      "3": "1",
      "4": "1",
      "5": "1"
    };

    it('should render 5 rating labels', async() => {
      render(<RatingBreakdown ratings={ratings}/>);
      expect(screen.getByLabelText('5 stars')).toBeInTheDocument();
      expect(screen.getByLabelText('4 stars')).toBeInTheDocument();
      expect(screen.getByLabelText('3 stars')).toBeInTheDocument();
      expect(screen.getByLabelText('2 stars')).toBeInTheDocument();
      expect(screen.getByLabelText('1 stars')).toBeInTheDocument();
    });

    it('should render 5 rating progress bars', async() => {
      render(<RatingBreakdown ratings={ratings}/>);
      expect(screen.getByTestId('5stars')).toBeInTheDocument();
      expect(screen.getByTestId('4stars')).toBeInTheDocument();
      expect(screen.getByTestId('3stars')).toBeInTheDocument();
      expect(screen.getByTestId('2stars')).toBeInTheDocument();
      expect(screen.getByTestId('1stars')).toBeInTheDocument();
    })
  })
})

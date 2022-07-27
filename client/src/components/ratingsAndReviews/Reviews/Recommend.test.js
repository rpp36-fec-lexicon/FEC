import React from 'react';
import ReactDOM from 'react-dom/client';
import Recommend from './Recommend.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Recommend', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('Recommend Component', ()=>{

    it('should render the text "I recommend this product"', async () => {
      render(<Recommend />);
      const recommendEle = screen.getByText('I recommend this product', {exact: false});
      expect(recommendEle).toBeInTheDocument();
    })
  })
})

import React from 'react';
import ReactDOM from 'react-dom/client';
import Characteristic from './Characteristic.jsx';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Characteristic', () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('Characteristic Component', () => {
    const characteristic = ['Fit', {id: 240661, value: 2.5}, 'Too small', 'Too large'];
    it('should render characteristic title', async() => {
      render(<Characteristic characteristic={characteristic}/>);
      const title = screen.getByText('Fit');
      expect(title).toBeInTheDocument();
    });
  })
})

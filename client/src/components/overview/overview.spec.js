/**
 * Jest testing environment below
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import mockData from './mockData.js';
import ProductOverview from './ProductOverview.jsx';
import ProductDescription from './information/ProductDescription.jsx';
import Checkout from './checkout/Checkout.jsx';

describe('Product Overview', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('Testing main entry of ProductOverview component', () => {
    it('should find headers in Product Overview', () => {
      render(<ProductOverview productInfo={mockData.productInfo} defaultStyle={mockData.styleList.results[0]} styleList={mockData.styleList.results} rating={3.9}/>);
      configure({ testIdAttribute: 'id'});
      waitFor(() => screen.getByTestId('overviewHead'));
      expect(screen.getByTestId('overviewHead')).toHaveTextContent('Product Overview!');
    });

    it('should render checkout component', () => {
      act(() => {
        render(<Checkout id={mockData.styleList.results[0].style_id} skus={mockData.styleList.results[0].skus}/>, temporarySandBox);
      });
      expect(temporarySandBox).not.toBeNull();
      expect(screen.getAllByRole('option').length).toBe(8);
      expect(screen.getByRole('option', {name: '-'})).toBeInTheDocument();
    });

    // test('should handle click on size and update quantity options', () => {
    //   act(() => {
    //     render(<Checkout id={mockData.styleList.results[0].style_id} skus={mockData.styleList.results[0].skus}/>, temporarySandBox);
    //   });
    //   configure({ testIdAttribute: 'id'});
    //   let options = screen.getAllByTestId('size');
    //   // fireEvent.change(options, {target: {value: 'XS'}});
    //   // userEvent.selectOptions(options, ['XS']);

    //   expect(screen.getByTestId('XS').selected).toBe(true);
    //   expect(screen.getByTestId('S').selected).toBe(false);
    //   expect(screen.getByTestId('M').selected).toBe(false);
    //   expect(options[3].selected).toBeFalsy();
    //   expect(options[4].selected).toBeFalsy();
    //   expect(options[5].selected).toBeFalsy();
    // });
  });
});

/*
// TESTING REQUIREMENTS
// -------------------------------
// Unit Tests for server and client code using Jest
// Code Coverage reports for unit tests
// Aim for 70-80% coverage
// Aim for 1 End-to-End test for each widget
// Consider adding Browser Integration tests with Jest + React-Testing-Library/Enzyme
//   for your React Components (probably not enzyme unless you are using a lower version of react)
// */
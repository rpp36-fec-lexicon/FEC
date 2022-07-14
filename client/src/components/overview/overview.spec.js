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
import SelectStyle from './information/SelectStyle.jsx';

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

    it('should handle click on size and update quantity options', () => {
      act(() => {
        render(<Checkout id={mockData.styleList.results[0].style_id} skus={mockData.styleList.results[0].skus}/>, temporarySandBox);
      });
      configure({ testIdAttribute: 'id'});
      let dropdown = screen.getByTestId('size');
      expect(dropdown.value).toBe('Select Size');
      fireEvent.change(dropdown, {target: {value: 'XS'}});
      expect(dropdown.value).toBe('XS');
      let quantity = screen.getByTestId('quant');
      expect(quantity.length).toBe(8);
    });

    it('change product data if a different style was picked', () => {
      let state = {
        selectedStyle: undefined
      };
      // var changeStyle(id) {
      //   state.selectedStyle = mockData.styleList.find((element) => element.style_id === id);
      // }
      act(() => {
        render(<SelectStyle styles={mockData.styleList.results} selectedStyle={mockData.styleList.results[0]}/>);
      });
      expect(screen.getByRole('heading', {name: 'Style > Forest Green & Black'})).toBeInTheDocument();
      configure({testIdAttribute: 'name'});
      const newStyle = screen.getByTestId('Desert Brown & Tan');
      expect(newStyle).toBeInTheDocument();
      // fireEvent.click(newStyle);
      // expect(screen.getByRole('heading', {name: 'Style > Desert Brown & Tan'})).toBeInTheDocument();
    });
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

// Product Description : Test if Null (So colon disappears)
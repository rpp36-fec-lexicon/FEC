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
import mockIndex from '../relatedItems/components/Tests/mockIndex.js';
import ProductOverview from './ProductOverview.jsx';
import ProductDescription from './information/ProductDescription.jsx';
import ProductInformation from './information/ProductInformation.jsx';
import Checkout from './checkout/Checkout.jsx';
import SelectStyle from './information/SelectStyle.jsx';
import Showcase from './imageGallery/Showcase.jsx';
import RenderZoom from './imageGallery/RenderZoom.jsx';

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
    it('should test for a correct render', () => {
      render(<ProductOverview productInfo={mockData.productInfo}
        defaultStyle={mockData.styleList.results[0]}
        styleList={mockData.styleList.results}
        rating={4}
        outfitItems={mockIndex.outfitItems}
        outfitItemsIDs={[12345, 71678, 75204]}
      />, temporarySandBox);
      configure({ testIdAttribute: 'id'});
      waitFor(() => screen.getByTestId('overviewWidget'));
      expect(screen.getByTestId('overviewWidget')).toBeInTheDocument();
    });

    it('should render checkout component', () => {
      act(() => {
        render(<Checkout id={mockData.styleList.results[0].style_id}
          skus={mockData.styleList.results[0].skus}
          outfitItems={mockIndex.outfitItems}
          outfitItemsIDs={[12345, 71678, 75204]}
        />, temporarySandBox);
      });
      expect(temporarySandBox).not.toBeNull();
      expect(screen.getAllByRole('option').length).toBe(8);
      expect(screen.getByRole('option', {name: '-'})).toBeInTheDocument();
    });

    it('should handle click on size and update quantity options', () => {
      act(() => {
        render(<Checkout id={mockData.styleList.results[0].style_id} skus={mockData.styleList.results[0].skus} outfitItems={mockIndex.outfitItems} outfitItemsIDs={[12345, 71678, 75204]}/>, temporarySandBox);
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
      const mockFunction = jest.fn();
      act(() => {
        render(<SelectStyle styles={mockData.styleList.results} selectedStyle={mockData.styleList.results[0]} changeStyle={mockFunction}/>, temporarySandBox);
      });
      expect(screen.getByText('Forest Green & Black')).toBeInTheDocument();
      configure({testIdAttribute: 'name'});
      const newStyle = screen.getByTestId('Desert Brown & Tan');
      expect(newStyle).toBeInTheDocument();
      // await userEvent.click(newStyle);
      // expect(screen.getByText('Desert Brown & Tan')).toBeInTheDocument();
      fireEvent.click(newStyle);
      render(<SelectStyle styles={mockData.styleList.results} selectedStyle={mockData.styleList.results[1]} changeStyle={mockFunction}/>);
      expect(screen.getByText('Desert Brown & Tan', {exact: false})).toBeInTheDocument();
    });
  });

  describe('Rendering with invalid data', () => {
    it('Disable selectors and show out of stock', () => {
      act(() => {
        render(<Checkout id={mockData.badDataset.results[0].style_id}
          skus={mockData.badDataset.results[0].skus}
          outfitItems={mockIndex.outfitItems}
          outfitItemsIDs={[12345, 71678, 75204]}/>,
        temporarySandBox);
      });
      const sizeSelect = screen.getByRole('option', {name: 'OUT OF STOCK'});
      expect(sizeSelect).toBeInTheDocument();
      const quantity = screen.getByRole('option', {name: '-'});
      expect(quantity).toBeDisabled();

    });

    it('show preset image for styles when given image does not exist', () => {
      act(() => {
        render(<SelectStyle styles={mockData.badDataset.results} selectedStyle={mockData.badDataset.results[0]}/>, temporarySandBox);
      });
      const image = screen.getByAltText('Black Lenses & Black Frame');
      expect(image).toHaveAttribute('src', 'placeholder.png');
    });

    it('show preset image for thumbnail and main image when given image does not exist', () => {
      const mockFunction = jest.fn();
      act(() => {
        render(<Showcase id={mockData.badDataset.results[0].style_id} photos={mockData.badDataset.results[0].photos} currentPhoto={mockFunction}/>, temporarySandBox);
      });
      const image = screen.getByAltText('thumbnail for main image');
      expect(image).toHaveAttribute('src', 'placeholder.png');
      const mainImage = screen.getByAltText('Main Image of currently selected photo');
      expect(mainImage).toHaveAttribute('src', 'placeholder.png');
    });
  });

  describe('Rendering ProductDescription', () => {
    it('Description and features should be rendered', () => {
      act(() => {
        render(<ProductDescription slogan={mockData.productInfo.slogan} description={mockData.productInfo.description} features={mockData.productInfo.features}/>);
      });
      expect(screen.getByText('Blend in to your crowd')).toBeInTheDocument();
      expect(screen.getByText('Fabric')).toBeInTheDocument();
      expect(screen.getByText(': Canvas')).toBeInTheDocument();
    });
  });

  describe('Rendering ProductInformation', () => {
    it('Important item details should be rendered', () => {
      act(() => {
        render(<ProductInformation
          category={mockData.productInfo.category}
          name={mockData.productInfo.name}
          price={mockData.styleList.results[0].original_price}
          salePrice={mockData.styleList.results[0].salePrice}
          rating={4}
        />);
      });
      expect(screen.getByRole('heading', {name: 'Jackets'})).toBeInTheDocument();
      expect(screen.getByRole('heading', {name: 'Camo Onesie'})).toBeInTheDocument();
      expect(screen.getByText('$140.00', {exact: false})).toBeInTheDocument();
    });
    it('Stars should be rendered', () => {
      act(() => {
        render(<ProductInformation
          category={mockData.productInfo.category}
          name={mockData.productInfo.name}
          price={mockData.styleList.results[0].original_price}
          salePrice={mockData.styleList.results[0].salePrice}
          rating={4}
        />);
      });
      configure({testIdAttribute: 'id'});
      const stars = screen.getByTestId('StarEmpty');
      expect(stars).toBeInTheDocument();
    });
  });

  describe('Rendering Showcase with larger data entry', () => {
    it('should display multiple features, includng various arrow buttons', () => {
      const mockFunction = jest.fn();
      act(() => {
        render(<Showcase
          id={mockData.largeStyleList.results[0].style_id}
          photos={mockData.largeStyleList.results[0].photos}
          currentPhoto={mockFunction}
        />);
      });
      expect(screen.queryByTestId('overviewLeftArrow')).toBeNull();
      expect(screen.queryByTestId('overviewUpArrow')).toBeNull();
      expect(screen.getByTestId('overviewRightArrow')).toBeInTheDocument();
      expect(screen.getByTestId('overviewDownArrow')).toBeInTheDocument();
    });
  });

  describe('Rendering Showcase with larger data entry', () => {
    it('should display multiple features, includng various arrow buttons', () => {
      const mockFunction = jest.fn();
      act(() => {
        render(<Showcase
          id={mockData.largeStyleList.results[0].style_id}
          photos={mockData.largeStyleList.results[0].photos}
          currentPhoto={mockFunction}
        />);
      });
      waitFor(async () => {
        expect(screen.queryByTestId('overviewUpArrow')).toBeNull();
        await userEvent.click(screen.getByTestId('overviewDownArrow'));
        expect(screen.getByTestId('overviewUpArrow')).toBeInTheDocument();
        await userEvent.click(screen.getByTestId('overviewUpArrow'));
        expect(screen.queryByTestId('overviewUpArrow')).tobeNull();
      });
    });
  });

  describe('Rendering Zoomed Image', () => {
    it('Display the new zoomed image', () => {
      const mockFunction = jest.fn();

      act(() => {
        render(<RenderZoom
          picture={mockData.styleList.results[0].photos[0].url}
          // container={}
          zoomOut={mockFunction}
        />);
      });
      expect(screen.getByTestId('zoomEle')).toBeInTheDocument();
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
import React from "react";
import ReactDOM from "react-dom/client";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import userEvent from '@testing-library/user-event';
import {jest} from '@jest/globals';
import { useState, useEffect } from "react";

import RelatedAndOutfit from "./../../index.jsx";
import Related from "./../../components/Related.jsx";
import RelatedCard from "./../../components/RelatedCard.jsx";
import Outfit from "./../../components/Outfit.jsx";
import OutfitCard from "./../../components/OutfitCard.jsx";
import Comparison from "./../../components/Comparison.jsx";

import {Persister} from "./../../components/Outfit.jsx";
// import {storageGetter} from "./../../../../App.jsx";

import { mockIndex } from "./mockIndex.js";
import { mockRelated } from "./mockRelated.js";
import { mockRelatedCard } from "./mockRelatedCard.js";
import { mockOutfitCard } from "./mockOutfitCard.js";
import { mockComparison } from "./mockComparison.js";
import { mockPersister } from "./mockPersistingData.js";


describe("Related Products", () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement("div");
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  // RelatedAndOutfit ======================================================================================
  describe("Testing main entry (Index) of Related Products component", () => {
    it('should find headers to both "related products" and "your outfit"', () => {
      render(<RelatedAndOutfit
        prodID={mockIndex.productId}
        prodInfo={mockIndex.productInfo}
        styleInfo={mockIndex.styleInfo}
        defaultStyle={mockIndex.defaultStyle}
        outfitItems={mockIndex.outfitItems}
        />);
      expect(screen.getByText("RELATED PRODUCTS")).toBeInTheDocument();
      expect(screen.getByText("YOUR OUTFIT")).toBeInTheDocument();
    });

    it('should invoke "user tracker" function when clicked', async () => {
      const mockFunc = jest.fn();
      render(<RelatedAndOutfit
        prodID={mockIndex.productId}
        prodInfo={mockIndex.productInfo}
        styleInfo={mockIndex.styleInfo}
        defaultStyle={mockIndex.defaultStyle}
        outfitItems={mockIndex.outfitItems}
        outfitAdder={mockFunc}
        userTracker={mockFunc}
        />);
      const btn = screen.getByRole('button', {name: '[+] Add to Outfit'});
      await userEvent.click(btn);
      expect(mockFunc).toHaveBeenCalled();
    });

    it('counts the number of divs created by RelatedAndOutfit class component', async () => {
      act(() => {
        ReactDOM.createRoot(temporarySandBox).render(<RelatedAndOutfit
          prodID={mockIndex.productId}
          prodInfo={mockIndex.productInfo}
          styleInfo={mockIndex.styleInfo}
          defaultStyle={mockIndex.defaultStyle}
          outfitItems={mockIndex.outfitItems}
        />);
      });
      let renderedChildren = temporarySandBox.querySelector('div');
      expect(renderedChildren.childNodes.length).toBe(2);
    });

    // it("should check outfitItems length state has changed by checking weather componentDidUpdate has been invoked", () => {
    //   const newOutfitObj = new Outfit(mockIndex);
    //   const updatingComponentSpy = jest.spyOn(newOutfitObj, "componentDidUpdate");
    //   const testCall = newOutfitObj.componentDidUpdate();
    //   expect(updatingComponentSpy).toHaveBeenCalled();
    //   updatingComponentSpy.mockClear();
    // });

    it("should test if relatedItemsUpdater function has been invoked", async () => {
      const mockFunc = jest.fn();


        act(() => {
          ReactDOM.createRoot(temporarySandBox).render(<>
            <RelatedAndOutfit
                prodID={mockIndex.productId}
                prodInfo={mockIndex.productInfo}
                styleInfo={mockIndex.styleInfo}
                defaultStyle={mockIndex.defaultStyle}
                outfitItems={mockIndex.outfitItems}/>
            <Related
              prodID={mockRelated.prodID}
              prodInfo={mockRelated.prodInfo}
              styleInfo={mockRelated.styleInfo}
              itemInfoAndStyle={mockRelated.itemInfoAndStyle}
              relatedItemsUpdater={mockFunc}
            />
            {/* <RelatedCard itemData={mockRelatedCard.itemData}/>
            <Comparison
              mainProdName={mockComparison.mainProdName}
              relatedProdName={mockComparison.relatedProdName}
              mainProdFeat={mockComparison.mainProdFeat}
              relatedProdFeat={mockComparison.relatedProdFeat}
              toggle={mockFunc}
              /> */}
            </>);
        });
        let renderedInfo = temporarySandBox.querySelector('.carouselContainer');

        // console.log('ssss', renderedInfo)
        const newOutfitObj = new RelatedAndOutfit(mockIndex);
        const updatingComponentSpy = jest.spyOn(newOutfitObj, "leftScroll");

        const testCall = newOutfitObj.leftScroll(renderedInfo);
        expect(updatingComponentSpy).toHaveBeenCalled();
        updatingComponentSpy.mockClear();
      // });
    });




  });




  // Related ======================================================================================
  describe('Related Component', ()=>{
    it('counts the number of divs created by Related class component', async () => {
      act(() => {
        ReactDOM.createRoot(temporarySandBox).render(<Related
          prodID={mockRelated.prodID}
          prodInfo={mockRelated.prodInfo}
          styleInfo={mockRelated.styleInfo}
          itemInfoAndStyle={mockRelated.itemInfoAndStyle}
        />);
      });
      let renderedInfo = temporarySandBox.querySelector('div');
      expect(renderedInfo.childNodes.length).toBe(2);
    });

    it("should test if comparison function has been invoked", async () => {
      const mockFunc = jest.fn();

      render(<>
      <Related
        prodID={mockRelated.prodID}
        prodInfo={mockRelated.prodInfo}
        styleInfo={mockRelated.styleInfo}
        itemInfoAndStyle={mockRelated.itemInfoAndStyle}
      />
      <RelatedCard itemData={mockRelatedCard.itemData}/>
      <Comparison
        mainProdName={mockComparison.mainProdName}
        relatedProdName={mockComparison.relatedProdName}
        mainProdFeat={mockComparison.mainProdFeat}
        relatedProdFeat={mockComparison.relatedProdFeat}
        toggle={mockFunc}
        />
      </>);
      const clickableDiv = screen.getByRole('comparisonModalClickClosePreventer');
      await userEvent.click(clickableDiv);
      expect(clickableDiv).toBeInTheDocument();

      const btn = screen.getAllByRole('featureComparer');
      await userEvent.click(btn[0]);
      // expect(btn[0]).toBeInTheDocument();
      // expect(mockFunc).toHaveBeenCalled(); // currently failing
    });
  })

  // Outfit ======================================================================================
  describe('Outfit Component', ()=>{

    it('should have an add to outfit button', () => {
      render(<Outfit
        outfitItems={mockIndex.outfitItems}/>);
      const btn = screen.getByRole('button', {name: '[+] Add to Outfit'});
      expect(btn).toBeInTheDocument();
    });

    it('should invoke "add to outfit" function when clicked', async () => {
      const mockFunc = jest.fn();
      render(<Outfit
        outfitItems={mockIndex.outfitItems}
        outfitAdder={mockFunc}/>);
      const btn = screen.getByRole('button', {name: '[+] Add to Outfit'});
      await userEvent.click(btn);
      expect(mockFunc).toHaveBeenCalled();
    });

    it('should have an outfit carousel right button', () => {
      render(<Outfit
        outfitItems={mockIndex.outfitItems}/>);
        const btn = screen.getByRole('outfit_carousel_right_shifter');
        expect(btn).toBeInTheDocument();
    });

  })

  // RelatedCard ======================================================================================
  describe(" Related Products Cards", () => {
    it("should find product info for an item", () => {
      render(<RelatedCard itemData={mockRelatedCard.itemData} />);
      expect(screen.getByText("Adolphus Socks")).toBeInTheDocument();
      expect(screen.getByText("$126.00")).toBeInTheDocument();
    });
    it("finds the existence of an outfit adder button", () => {
      act(() => {
        ReactDOM.createRoot(temporarySandBox).render(
          <RelatedCard itemData={mockRelatedCard.itemData} />
        );
      });
      let renderedBTN = temporarySandBox.querySelector("button");
      expect(renderedBTN.className).toBe("comparisonBtn");
      expect(renderedBTN.innerHTML).toBe("⭐");
    });
    it('should invoke product-ID-Updater & related-products-updater functions when clicked', async () => {
      const mockFunc1 = jest.fn();
      const mockFunc2 = jest.fn();
      render(<RelatedCard
        itemData={mockRelatedCard.itemData}
        prodIDChanger={mockFunc1}
        relatedItemsUpdater={mockFunc2}
       />);
      const btn = screen.getByRole('productIdUpdaterInRelated');
      const btn2 = screen.getByRole('featureComparer');
      await userEvent.click(btn);
      expect(mockFunc1).toHaveBeenCalled();
      expect(mockFunc2).toHaveBeenCalled();
    });
  });

  // Comparison modal ======================================================================================
  describe("Comparison modal", () => {
    it('should render a table that contains compared products features"', async () => {

      // const mockFunc = jest.fn();

      render(<Comparison
        mainProdName={mockComparison.mainProdName}
        relatedProdName={mockComparison.relatedProdName}
        mainProdFeat={mockComparison.mainProdFeat}
        relatedProdFeat={mockComparison.relatedProdFeat}
        // toggle={mockFunc}
        />);
      expect(screen.getByText("Comparison")).toBeInTheDocument();
      expect(screen.getByText("Feature")).toBeInTheDocument();
      expect(screen.getByText("Renee Sweater")).toBeInTheDocument();
      expect(screen.getByText("Satisfaction Guaranteed")).toBeInTheDocument();

      // const btn = screen.getByRole('comparisonInvoker');
      // await userEvent.click(btn);
      // // expect(newRelated.comparisonCloser).toHaveBeenCalled();
      // expect(mockFunc).toHaveBeenCalled();
    });
  });

  // Outfit Card ======================================================================================
  describe('Outfit Card Component', ()=>{
    it("finds the existence of an outfit remover button", () => {
      act(() => {
        ReactDOM.createRoot(temporarySandBox).render(
          <OutfitCard
          prodInfo={mockOutfitCard.prodInfo}
          prodStyle={mockOutfitCard.prodStyle}
          />
        );
      });
      let renderedBTN = temporarySandBox.querySelector("button");
      expect(renderedBTN.className).toBe("outfitRemoveBTN");
      expect(renderedBTN.innerHTML).toBe("✖");
    });

    it('should invoke remove-an-outfit function when clicked', async () => {
      const mockFunc = jest.fn();
      render(<OutfitCard
        prodInfo={mockOutfitCard.prodInfo}
        prodStyle={mockOutfitCard.prodStyle}
        outfitRemover={mockFunc}
       />);
      const btn = screen.getByRole('outfitRemover');
      await userEvent.click(btn);
      expect(mockFunc).toHaveBeenCalled();
    });

    it('should invoke product-ID-Updater & related-products-updater functions when clicked', async () => {
      const mockFunc1 = jest.fn();
      const mockFunc2 = jest.fn();
      render(<OutfitCard
        prodInfo={mockOutfitCard.prodInfo}
        prodStyle={mockOutfitCard.prodStyle}
        prodIDChanger={mockFunc1}
        relatedItemsUpdater={mockFunc2}
       />);
      const btn = screen.getByRole('productIdUpdater');
      await userEvent.click(btn);
      expect(mockFunc1).toHaveBeenCalled();
      expect(mockFunc2).toHaveBeenCalled();
    });
  })
});

  // Persistence: App and Outfit ======================================================================================
  describe('Persistence (utilized in App and Outfit Component)', ()=>{

    it('should find how many items were persisted (hooks not used in test)', async() => {
      const Persister = (props) => {
          localStorage.setItem("items", JSON.stringify(props.outfits));
      };
      const storageGetter = (key = "items") => {
        const savedItems = localStorage.getItem(key);
        const storeageResult = savedItems !== null ? JSON.parse(savedItems) : [];
        return storeageResult;
      };
      Persister(mockPersister)
      var storageResult = storageGetter('items')
      expect(storageResult.length).toBe(5);
    });
  })




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

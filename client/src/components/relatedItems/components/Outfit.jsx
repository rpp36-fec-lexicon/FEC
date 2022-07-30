import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import OutfitCard from "./OutfitCard.jsx";
import $ from "jquery";

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodInfo: "",
      relatedProdFeat: [],
      relatedProdName: "",
    };
  }

  render() {
    return (
      <div
        className="flex-container"
        // onClick={(e) => {
        //   let timeOfClick = new Date().toLocaleString("en-US", {
        //     hour12: false,
        //   });
        //   let element = `Selectors: {LocalName: ${e.target.localName}, ClassName: ${e.target.className}, innerHTML: ${e.target.innerHTML}}`;
        //   this.props.userTracker(element, "Related-outfit Widget", timeOfClick);
        // }}
      >
        <div className="flex-child">
          <button
            className="outfitAdderBTN"
            onClick={() => {
              this.props.outfitAdder();
            }}
          >
            <Persister outfits={this.props.outfitItems} />
            <br></br>
            <span>
              [&#x2B;] <br></br>
            </span>{" "}
            <br></br>
            Add to Outfit
          </button>
        </div>

        <div className="outfitList">
          {this.props.xOutfitLeftFrame === 0 ? null : (
            <button
              role="outfit_carousel_left_shifter"
              className="arrow left"
              onClick={(e) => {
                this.props.leftScroll(".relatedCarouselOutfit");
              }}
            ></button>
          )}

          <div className="flex-child relatedCarouselOutfit">
            {this.props.outfitItems.map((itemTuple, index) => (
              <OutfitCard
                prodInfo={itemTuple[0]}
                prodStyle={itemTuple[1]}
                prodRating={itemTuple[2]}
                outfitRemover={this.props.outfitRemover}
                prodIDChanger={this.props.prodIDChanger}
                relatedItemsUpdater={this.props.relatedItemsUpdater}
                userTracker={this.props.userTracker}
                key={index}
              />
            ))}
          </div>

          {this.props.xOutfitRightFrame === 0 ? null : (
            <button
              role="outfit_carousel_right_shifter"
              className="arrow right"
              onClick={(e) => {
                this.props.rightScroll(".relatedCarouselOutfit");
              }}
            ></button>
          )}
        </div>
      </div>
    );
  }
}

export const Persister = (props) => {
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(props.outfits));
  }, [props]);
};

export default Outfit;

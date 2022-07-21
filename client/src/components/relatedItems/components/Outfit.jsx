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
      xOutfitLeftFrame: 0,
      xOutfitRightFrame: 0,
      prevOutfitItemsLen: 0,
    };
  }

  componentDidMount() {
    this.setState({ prevOutfitItemsLen: this.props.outfitItems.length });
    var screenWidth = document.body.clientWidth;
    var outfitsWidth = this.props.outfitItems.length * 184 + 600;
    if (screenWidth < outfitsWidth) {
      this.setState({
        xOutfitRightFrame: 1,
      });
    }
  }
  componentDidUpdate() {
    if (this.props.outfitItems.length !== this.state.prevOutfitItemsLen) {
      this.setState({ prevOutfitItemsLen: this.props.outfitItems.length });
      var screenWidth = document.body.clientWidth;
      var outfitsWidth = this.state.prevOutfitItemsLen * 184 + 600;
      if (screenWidth < outfitsWidth) {
        this.setState({
          xOutfitRightFrame: 1,
        });
      } else {
        this.setState({
          xOutfitRightFrame: 0,
        });
      }
    }
  }

  leftScroll() {
    document.querySelector(".relatedCarouselOutfit").scrollBy(-250, 0);
    document
      .querySelector(".relatedCarouselOutfit")
      .addEventListener("scroll", (event) => {
        var xOutfitLeftFrame = document.querySelector(
          ".relatedCarouselOutfit"
        ).scrollLeft;
        this.setState({ xOutfitLeftFrame });
        var sWid = document.querySelector(".relatedCarouselOutfit").scrollWidth;
        var ofWid = document.querySelector(
          ".relatedCarouselOutfit"
        ).offsetWidth;

        if (Math.round(xOutfitLeftFrame) + ofWid !== sWid) {
          this.setState({ xOutfitRightFrame: 1 });
        }
      });
  }

  rightScroll() {
    document.querySelector(".relatedCarouselOutfit").scrollBy(250, 0);
    document
      .querySelector(".relatedCarouselOutfit")
      .addEventListener("scroll", (event) => {
        var xOutfitLeftFrame = document.querySelector(
          ".relatedCarouselOutfit"
        ).scrollLeft;
        this.setState({ xOutfitLeftFrame });
        var sWid = document.querySelector(".relatedCarouselOutfit").scrollWidth;
        var ofWid = document.querySelector(
          ".relatedCarouselOutfit"
        ).offsetWidth;
        if (Math.round(xOutfitLeftFrame) + ofWid > sWid) {
          this.setState({ xOutfitRightFrame: 0 });
        }
      });
  }

  render() {
    // console.log("=======  OUTFIT PROPS  ======", this.props);
    return (
      <div>
        <div className="flex-container">
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

          <div
            className="outfitList" //mainD
          >
            {this.state.xOutfitLeftFrame === 0 ? null : (
              <button
                role="outfit_carousel_left_shifter"
                className="arrow left"
                onClick={(e) => {
                  this.leftScroll();
                }}
              ></button>
            )}

            <div className="flex-child relatedCarouselOutfit">
              {this.props.outfitItems.map((itemTuple, index) => (
                <OutfitCard
                  prodInfo={itemTuple[0]}
                  prodStyle={itemTuple[1]}
                  outfitRemover={this.props.outfitRemover}
                  prodIDChanger={this.props.prodIDChanger}
                  relatedItemsUpdater={this.props.relatedItemsUpdater}
                  key={index}
                />
              ))}
            </div>

            {this.state.xOutfitRightFrame === 0 ? null : (
              <button
                role="outfit_carousel_right_shifter"
                className="arrow right"
                onClick={(e) => {
                  this.rightScroll();
                }}
              ></button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export const Persister = (props) => {
  // console.log("=======  Persister PROPS  ======", props);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(props.outfits));
  }, [props]);
};

export default Outfit;

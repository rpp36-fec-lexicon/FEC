import React from "react";
import Related from "./components/Related.jsx";
import Outfit from "./components/Outfit.jsx";
import $ from "jquery";
import axios from "axios";

class RelatedAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfoAndStyle: [],
      xLeftFrame: 0,
      xRightFrame: 0,
      xOutfitLeftFrame: 0,
      xOutfitRightFrame: 0,
      prevOutfitItemsLength: 0,
    };
  }
  componentDidMount() {
    this.carouselSizeOnMount();
    this.relatedDataRequest();
  }
  componentDidUpdate() {
    this.carouselSizeOnUpdate();
  }
  relatedDataRequest() {
    $.ajax({
      type: "GET",
      url: `/products/${this.props.prodID}/related`,
      success: (arrayOfProdIDs) => {
        // FOR SCREEN WIDTH CALCULATION
        var screenWidth = document.body.clientWidth;
        var relatedProdsWidth = arrayOfProdIDs.length * 184 + 120;
        if (screenWidth < relatedProdsWidth) {
          this.setState({
            xRightFrame: 1,
          });
        }
        // FOR RELATED PRODS CALCULATION
        var relatedItemData = [];
        var UNQarrayOfProdIDs = [];
        arrayOfProdIDs.forEach((itemID) => {
          if (
            itemID !== this.props.prodID &&
            !UNQarrayOfProdIDs.includes(itemID)
          ) {
            UNQarrayOfProdIDs.push(itemID);
          }
        });

        // style request
        UNQarrayOfProdIDs.forEach((itemID) => {
          $.ajax({
            type: "GET",
            url: `/products/${itemID}`,
            success: (relatedItemInfo) => {
              $.ajax({
                type: "GET",
                url: `/products/${itemID}/styles`,
                success: (relatedItemStyles) => {
                  $.ajax({
                    type: "GET",
                    url: "/reviews/meta",
                    data: { productId: itemID },
                    success: (result) => {
                      const ratings = result.ratings;
                      let totalNumberOfRatings = 0;
                      let totalRatings = 0;
                      let rating;

                      if (!Object.keys(ratings)) {
                        rating = 0;
                      }

                      for (var key in ratings) {
                        totalNumberOfRatings += parseInt(ratings[key]);
                        totalRatings += parseInt(key) * parseInt(ratings[key]);
                      }

                      rating = totalRatings / totalNumberOfRatings;
                      rating = Math.round(10 * rating) / 10;

                      relatedItemData.push({
                        itemInfo: relatedItemInfo,
                        itemStyles: relatedItemStyles,
                        itemRating: rating,
                      });

                      this.setState({
                        itemInfoAndStyle: relatedItemData,
                      });
                    },
                    error: (err) => {
                      console.log(err);
                    },
                  });
                },
                error: (err) => {
                  console.log(err);
                },
              });
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  carouselSizeOnMount() {
    var screenWidth = document.body.clientWidth;
    var outfitsWidth = this.props.outfitItems.length * 184 + 600;
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
  carouselSizeOnUpdate() {
    if (this.props.outfitItems.length !== this.state.prevOutfitItemsLength) {
      this.setState({
        prevOutfitItemsLength: this.props.outfitItems.length,
      });
      var screenWidth = document.body.clientWidth;
      var outfitsWidth = this.props.outfitItems.length * 184 + 600;

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

  leftScroll(targetClass) {
    if (targetClass === ".carouselContainer") {
      // console.log("left related");
      document.querySelector(targetClass).scrollBy(-250, 0);
      document
        .querySelector(targetClass)
        .addEventListener("scroll", (event) => {
          var xLeftFrame = document.querySelector(targetClass).scrollLeft;
          this.setState({ xLeftFrame });
          var sWid = document.querySelector(targetClass).scrollWidth;
          var ofWid = document.querySelector(targetClass).offsetWidth;
          if (Math.round(xLeftFrame) + ofWid !== sWid) {
            this.setState({ xRightFrame: 1 });
          }
        });
    } else if (targetClass === ".relatedCarouselOutfit") {
      // console.log("left outfit");
      document.querySelector(targetClass).scrollBy(-250, 0);
      document
        .querySelector(targetClass)
        .addEventListener("scroll", (event) => {
          var xOutfitLeftFrame = document.querySelector(targetClass).scrollLeft;
          this.setState({ xOutfitLeftFrame });
          var sWid = document.querySelector(targetClass).scrollWidth;
          var ofWid = document.querySelector(targetClass).offsetWidth;
          if (Math.round(xOutfitLeftFrame) + ofWid !== sWid) {
            this.setState({ xOutfitRightFrame: 1 });
          }
        });
    }
  }

  rightScroll(targetClass) {
    if (targetClass === ".carouselContainer") {
      // console.log("right related");
      document.querySelector(targetClass).scrollBy(250, 0);
      document
        .querySelector(targetClass)
        .addEventListener("scroll", (event) => {
          var xLeftFrame = document.querySelector(targetClass).scrollLeft;
          this.setState({ xLeftFrame });
          var sWid = document.querySelector(targetClass).scrollWidth;
          var ofWid = document.querySelector(targetClass).offsetWidth;
          if (Math.round(xLeftFrame) + ofWid === sWid + 1) {
            this.setState({ xRightFrame: 0 });
          }
        });
    } else if (targetClass === ".relatedCarouselOutfit") {
      // console.log("right outfit");
      document.querySelector(targetClass).scrollBy(250, 0);
      document
        .querySelector(targetClass)
        .addEventListener("scroll", (event) => {
          var xOutfitLeftFrame = document.querySelector(targetClass).scrollLeft;
          this.setState({ xOutfitLeftFrame });
          var sWid = document.querySelector(targetClass).scrollWidth;
          var ofWid = document.querySelector(targetClass).offsetWidth;
          if (Math.round(xOutfitLeftFrame) + ofWid === sWid + 1) {
            this.setState({ xOutfitRightFrame: 0 });
          }
        });
    }
  }

  relatedItemsUpdater(clickedProdID) {
    $.ajax({
      type: "GET",
      url: `/products/${clickedProdID}/related`,
      success: (arrayOfProdIDs) => {
        var relatedItemData = [];
        var UNQarrayOfProdIDs = [];
        arrayOfProdIDs.forEach((itemID) => {
          if (itemID !== clickedProdID && !UNQarrayOfProdIDs.includes(itemID)) {
            UNQarrayOfProdIDs.push(itemID);
          }
        });
        UNQarrayOfProdIDs.forEach((itemID) => {
          $.ajax({
            type: "GET",
            url: `/products/${itemID}`,
            success: (relatedItemInfo) => {
              $.ajax({
                type: "GET",
                url: `/products/${itemID}/styles`,
                success: (relatedItemStyles) => {
                  relatedItemData.push({
                    itemInfo: relatedItemInfo,
                    itemStyles: relatedItemStyles,
                  });

                  this.setState({
                    itemInfoAndStyle: relatedItemData,
                  });
                },
                error: (err) => {
                  console.log(err);
                },
              });
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  render() {
    // console.log("=======  RELATED&OUTFIT PROPS  ======", this.props);
    return (
      <div>
        <h5>Related Products:</h5>
        <div
          className="relatedProductsMainClass" // mainD
        >
          {this.state.xLeftFrame === 0 ? null : (
            <button
              className="arrow left"
              onClick={(e) => {
                this.leftScroll(".carouselContainer");
              }}
            ></button>
          )}
          <div className="carouselContainer">
            <Related
              prodID={this.props.prodID}
              prodInfo={this.props.prodInfo}
              styleInfo={this.props.styleInfo}
              prodIDChanger={this.props.prodIDChanger}
              itemInfoAndStyle={this.state.itemInfoAndStyle}
              relatedItemsUpdater={this.relatedItemsUpdater.bind(this)}
            />
          </div>{" "}
          {this.state.xRightFrame === 0 ? null : (
            <button
              className="arrow right"
              onClick={(e) => {
                this.rightScroll(".carouselContainer");
              }}
            ></button>
          )}
        </div>
        <h5>Your Outfit:</h5>
        <Outfit
          prodID={this.props.prodID}
          prodInfo={this.props.prodInfo}
          styleInfo={this.props.styleInfo}
          defaultStyle={this.props.defaultStyle}
          prodIDChanger={this.props.prodIDChanger}
          relatedItemsUpdater={this.relatedItemsUpdater.bind(this)}
          outfitAdder={this.props.outfitAdder}
          outfitRemover={this.props.outfitRemover}
          outfitItems={this.props.outfitItems}
          leftScroll={this.leftScroll.bind(this)}
          rightScroll={this.rightScroll.bind(this)}
          xOutfitRightFrame={this.state.xOutfitRightFrame}
          xOutfitLeftFrame={this.state.xOutfitLeftFrame}
        />
      </div>
    );
  }
}

export default RelatedAndOutfit;

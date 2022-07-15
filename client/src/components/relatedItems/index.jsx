import React from "react";
import Related from "./components/Related.jsx";
import Outfit from "./components/Outfit.jsx";
import $ from "jquery";

class RelatedAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfoAndStyle: [],
      xLeftFrame: 0,
      xRightFrame: 0,
    };
  }
  componentDidMount() {
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

  leftScroll() {
    document.querySelector(".carouselContainer").scrollBy(-250, 0);
    document
      .querySelector(".carouselContainer")
      .addEventListener("scroll", (event) => {
        var xLeftFrame =
          document.querySelector(".carouselContainer").scrollLeft;
        this.setState({ xLeftFrame });
        var sWid = document.querySelector(".carouselContainer").scrollWidth;
        var ofWid = document.querySelector(".carouselContainer").offsetWidth;
        if (Math.round(xLeftFrame) + ofWid !== sWid) {
          this.setState({ xRightFrame: 1 });
        }
      });
  }

  rightScroll() {
    document.querySelector(".carouselContainer").scrollBy(250, 0);
    document
      .querySelector(".carouselContainer")
      .addEventListener("scroll", (event) => {
        var xLeftFrame =
          document.querySelector(".carouselContainer").scrollLeft;
        this.setState({ xLeftFrame });
        var sWid = document.querySelector(".carouselContainer").scrollWidth;
        var ofWid = document.querySelector(".carouselContainer").offsetWidth;
        if (Math.round(xLeftFrame) + ofWid === sWid) {
          this.setState({ xRightFrame: 0 });
        }
      });
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
    // console.log("proId in RelatedAndOutfit", this.props.prodID);
    return (
      <div>
        <h5>Related Products:</h5>
        <div
          className="mainD"
          style={{
            padding: "15px 15px 15px 15px",
            margin: "15px 15px 15px 15px",
            position: "relative",
          }}
        >
          {this.state.xLeftFrame === 0 ? null : (
            <button
              className="arrow left"
              onClick={(e) => {
                this.leftScroll();
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
          </div>

          {this.state.xRightFrame === 0 ? null : (
            <button
              className="arrow right"
              onClick={(e) => {
                this.rightScroll();
              }}
            ></button>
          )}
        </div>

        <br></br>

        <h5>Your Outfit:</h5>

        <Outfit
          prodID={this.props.prodID}
          prodInfo={this.props.prodInfo}
          styleInfo={this.props.styleInfo}
          defaultStyle={this.props.defaultStyle}
          prodIDChanger={this.props.prodIDChanger}
          relatedItemsUpdater={this.relatedItemsUpdater.bind(this)}
        />
        <br></br>
      </div>
    );
  }
}

export default RelatedAndOutfit;

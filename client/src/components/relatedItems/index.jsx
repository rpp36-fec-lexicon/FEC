import React from "react";
import Related from "./components/Related.jsx";
import Outfit from "./components/Outfit.jsx";
import $ from "jquery";

class RelatedAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xLeftFrame: 0,
      xRightFrame: 1, // make 1 only if carousel list is long enough
      // relatedCount: 0,
    };
  }
  componentDidMount() {
    /*
    find num of ralated items
    if their width sum is less than screen size, don't show right arrow
    */
    $.ajax({
      type: "GET",
      url: `/products/${this.props.prodID}/related`,
      success: (arrayOfProdIDs) => {
        this.setState({
          relatedCount: arrayOfProdIDs.length,
        });
        var screenWidth = document.body.clientWidth;
        var relatedProdsWidth = arrayOfProdIDs.length * 184 + 120;

        if (screenWidth > relatedProdsWidth) {
          this.setState({
            xRightFrame: 0,
          });
        }
        // console.log("rcount", this.state.relatedCount, );

        console.log("swid", screenWidth, "rwid", relatedProdsWidth);
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

  render() {
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
        <br></br>
        <br></br>
        <h5>Your Outfit:</h5>

        {/* <Outfit
          prodID={this.props.prodID}
          prodInfo={this.props.prodInfo}
          // prodIDChanger={this.props.prodIDChanger}
        /> */}
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default RelatedAndOutfit;

import React from "react";
import Related from "./components/Related.jsx";
import Outfit from "./components/Outfit.jsx";
import $ from "jquery";

class RelatedAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xLeftFrame: 0,
      xRightFrame: 1,
    };
  }
  componentDidMount() {}
  isOverflowing(element) {
    return element.scrollWidth >= element.offsetWidth;
  }

  leftScroll() {
    document.querySelector(".carouselContainer").scrollBy(-280, 0);
    document
      .querySelector(".carouselContainer")
      .addEventListener("scroll", (event) => {
        var xLeftFrame =
          document.querySelector(".carouselContainer").scrollLeft;
        this.setState({ xLeftFrame });
        var z = document.querySelector(".carouselContainer").scrollWidth;
        var s = document.querySelector(".carouselContainer").offsetWidth;
        if (Math.round(xLeftFrame) + s !== z) {
          this.setState({ xRightFrame: 1 });
        }
      });
  }

  rightScroll() {
    document.querySelector(".carouselContainer").scrollBy(280, 0);
    document
      .querySelector(".carouselContainer")
      .addEventListener("scroll", (event) => {
        var xLeftFrame =
          document.querySelector(".carouselContainer").scrollLeft;
        this.setState({ xLeftFrame });

        var z = document.querySelector(".carouselContainer").scrollWidth;
        var s = document.querySelector(".carouselContainer").offsetWidth;

        if (Math.round(xLeftFrame) + s === z) {
          this.setState({ xRightFrame: 0 });
        }
      });
  }

  render() {
    console.log("xRightFrame", this.state.xLeftFrame);
    return (
      <div>
        <h5>Related Products:</h5>

        <div
          className="mainD"
          style={{
            padding: "15px 15px 15px 15px",
            margin: "15px 15px 15px 15px",
            // border: "5px solid blue",
            // overflow: "auto",
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

          <div
            className="carouselContainer"
            style={{
              padding: "15px 15px 15px 15px",
              margin: "15px 15px 15px 15px",
              // border: "5px solid red",
              overflow: "auto",
              // position: "relative",
            }}
          >
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

import React from "react";
// import { useState } from "react";
import ReactDOM from "react-dom";
import OutfitCard from "./OutfitCard.jsx";
import Flickity from "react-flickity-component";
import $ from "jquery";

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitItems: [],
      // itemInfoAndStyle: [],
      prodInfo: "",
      relatedProdFeat: [],
      relatedProdName: "",
      xLeftFrame: 0,
      xRightFrame: 0,
    };
  }

  componentDidMount() {}

  outfitAdder() {
    // console.log("outfitItems", this.state.outfitItems);
    var outfitContainer = this.state.outfitItems;
    var existingIDs = [];
    for (let i = 0; i < this.state.outfitItems.length; i++) {
      existingIDs.push(this.state.outfitItems[i][0][0].id);
    }
    if (!existingIDs.includes(this.props.prodInfo.id)) {
      outfitContainer.push([[this.props.prodInfo], [this.props.defaultStyle]]);
      // check style connection adn add it here
    }

    this.setState({
      outfitItems: outfitContainer,
    });
  }

  outfitRemover(id) {
    for (let i = 0; i < this.state.outfitItems.length; i++) {
      if (this.state.outfitItems[i][0][0].id === id) {
        this.state.outfitItems.splice([i], 1);
      }
    }
    this.setState({
      outfitItems: this.state.outfitItems,
    });
  }

  leftScroll() {
    document.querySelector(".relatedCarouselOutfit").scrollBy(-250, 0);
    document
      .querySelector(".relatedCarouselOutfit")
      .addEventListener("scroll", (event) => {
        var xLeftFrame = document.querySelector(
          ".relatedCarouselOutfit"
        ).scrollLeft;
        this.setState({ xLeftFrame });
        var sWid = document.querySelector(".relatedCarouselOutfit").scrollWidth;
        var ofWid = document.querySelector(
          ".relatedCarouselOutfit"
        ).offsetWidth;
        if (Math.round(xLeftFrame) + ofWid !== sWid) {
          this.setState({ xRightFrame: 1 });
        }
      });
  }

  rightScroll() {
    document.querySelector(".relatedCarouselOutfit").scrollBy(250, 0);
    document
      .querySelector(".relatedCarouselOutfit")
      .addEventListener("scroll", (event) => {
        var xLeftFrame = document.querySelector(
          ".relatedCarouselOutfit"
        ).scrollLeft;
        this.setState({ xLeftFrame });
        var sWid = document.querySelector(".relatedCarouselOutfit").scrollWidth;
        var ofWid = document.querySelector(
          ".relatedCarouselOutfit"
        ).offsetWidth;
        if (Math.round(xLeftFrame) + ofWid === sWid) {
          this.setState({ xRightFrame: 0 });
        }
      });
  }

  render() {
    // console.log("outfitItems", this.state.outfitItems);
    return (
      <div>
        <div
          className="flex-container"
          style={{
            padding: "15px 15px 15px 15px",
            marginRight: "50px",
            marginLeft: "40px",
          }}
        >
          <div
            className="flex-child"
            style={{
              margin: "15px 15px 15px 15px",
            }}
          >
            <button //outfitAdder
              className="outfitAdderBTN"
              style={{
                height: "250px",
                width: "80px",
                fontSize: "15px",
                marginTop: "15px",
              }}
              // should only add a prod once to list.
              onClick={() => {
                this.outfitAdder();
                // this.useEffect()
              }}
            >
              <br></br>
              <span>
                [&#x2B;] <br></br>
              </span>{" "}
              <br></br>
              Add to Outfit
            </button>
          </div>

          <div
            className="mainD"
            style={{
              padding: "15px 15px 15px 15px",
              // margin: "15px 15px 15px 15px",
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

            <div className="flex-child relatedCarouselOutfit">
              {this.state.outfitItems.map((itemTuple, index) => (
                <OutfitCard
                  prodInfo={itemTuple[0]}
                  prodStyle={itemTuple[1]}
                  outfitRemover={this.outfitRemover.bind(this)}
                  prodIDChanger={this.props.prodIDChanger}
                  relatedItemsUpdater={this.props.relatedItemsUpdater}
                  key={index}
                />
              ))}
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

          {/* <div className="flex-child">
            {this.state.outfitItems.length !== 0 ? (
              //  {this.state.outfitItems.map()}
              <OutfitRenderer
                prodInfo={this.state.outfitItems}
                styleInfo={this.props.styleInfo}
              />
            ) : null}
          </div> */}
        </div>
      </div>
    );
  }
}
// const Presistor = () => {
//   console.log("called");
//   const [items, setItems] = useState([]);
//   useEffect(() => {
//     localStorage.setItem("items", JSON.stringify(items));
//   }, [items]);
// };

// const OutfitRenderer = (props) => {
//   // console.log("PPP", props);
//   return (
//     <div
//       className="RelatedCarouselItem"
//       style={{
//         border: "1px solid grey",
//         padding: "15px 15px 15px 15px",
//         margin: "15px 15px 15px 15px",
//       }}
//     >
//       <div
//         style={{
//           height: "150px",
//           width: "150px",
//           marginBottom: "10px",
//           backgroundImage: `url(${props.styleInfo[0].photos[0].url})`,
//           backgroundSize: "150px 150px",
//         }}
//       >
//         <button
//           className="closeBtn"
//           style={{
//             float: "right",
//             background: "transparent",
//             borderColor: "transparent",
//           }}
//         >
//           &times;
//         </button>
//       </div>
//     </div>
//   );
// };

export default Outfit;

import React from "react";
import $ from "jquery";
// import Stars from "react-stars-display";

class RelatedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // defaultOriginalPrice: 0,
      // defaultSalePrice: 0,
      // defaultPhoto: "",
    };
  }

  componentDidMount() {
    // this.props.itemData.itemStyles.results.forEach((styleInfoObj) => {
    //   if (styleInfoObj["default?"]) {
    //     // console.log("fir");
    //     // console.log("ori", styleInfoObj.original_price);
    //     this.setState({
    //       defaultOriginalPrice: styleInfoObj.original_price,
    //       defaultSalePrice: styleInfoObj.sale_price,
    //       defaultPhoto: styleInfoObj.photos[0].url,
    //     });
    //   }
    // });
    // DONT REMOVE IF BLOCK, there was a need for it!!!!
    // if (this.state.defaultOriginalPrice === 0) {
    //   console.log("shouldn't be fir");
    //   this.setState({
    //     defaultOriginalPrice: this.props.itemData.itemStyles.results[0].original_price,
    //     defaultSalePrice: null,
    //     defaultPhoto: this.props.itemData.itemStyles.results[0].photos[0].url,
    //   });
    // }
  }

  render() {
    // console.log("sale render", this.state.defaultSalePrice);
    // this.props.itemData.itemStyles.results.forEach((val) => {
    //   if (val["default?"]) {
    //     console.log("sale:", val);
    //   }
    // });
    console.log("sty:", this.props.itemData.itemStyles);
    return (
      <div
        className="RelatedCarouselItem"
        // className="flex-child"
        style={{
          border: "1px solid grey",
          padding: "15px 15px 15px 15px",
          margin: "15px 15px 15px 15px",
          // width: "50px",
        }}
      >
        <div
          style={{
            height: "150px",
            width: "150px",
            marginBottom: "10px",
            backgroundImage: `url(${this.props.itemData.itemStyles.results[0].photos[0].url})`,
            backgroundSize: "150px 150px",
          }}
          onClick={() => {
            this.props.prodIDChanger(this.props.itemData.itemInfo.id);
            this.props.relatedItemsUpdater(this.props.itemData.itemInfo.id);
          }}
        >
          <div>
            <button
              className="comparisonBtn"
              style={{
                float: "right",
                background: "transparent",
                borderColor: "transparent",
              }}
              onClick={(e) => {
                e.stopPropagation();
                this.props.comparison(
                  this.props.itemData.itemInfo.features,
                  this.props.itemData.itemInfo.name
                );
              }}
            >
              &#11088;
            </button>
          </div>
        </div>

        <div>
          <div>{this.props.itemData.itemInfo.category}</div>
          <div>
            {" "}
            <b>{this.props.itemData.itemInfo.name}</b>
          </div>
          <div>
            {this.props.itemData.itemStyles.results[0].sale_price === null ? (
              `$${this.props.itemData.itemStyles.results[0].original_price}`
            ) : (
              <span>
                <span style={{ color: "red" }}>
                  {" "}
                  ${this.props.itemData.itemStyles.results[0].sale_price}
                </span>{" "}
                <del>
                  {" "}
                  ${this.props.itemData.itemStyles.results[0].original_price}
                </del>
              </span>
            )}
          </div>

          {/*
          <div>
            {this.state.defaultSalePrice === null ? (
              `$${this.state.defaultOriginalPrice}`
            ) : (
              <span>
                <span style={{ color: "red" }}>
                  {" "}
                  ${this.state.defaultSalePrice}
                </span>{" "}
                <del> ${this.state.defaultOriginalPrice}</del>
              </span>
            )}
          </div> */}

          <div>
            star reviews here
            {/* <Stars stars={3.5} /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedCard;

import React from "react";
import ReactDOM from "react-dom";
// import Stars from "react-stars-display";
import { useState, useEffect } from "react";

class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // defaultOriginalPrice: 0,
      // defaultSalePrice: 0,
      // defaultPhoto: "",
      // defaultStyle: this.props.defaultStyle,
    };
  }

  componentDidMount() {
    // this.props.styleInfo.forEach((styleInfoObj) => {
    //   if (styleInfoObj["default?"]) {
    //     // console.log("fire");
    //     this.setState({
    //       defaultOriginalPrice: styleInfoObj.original_price,
    //       defaultSalePrice: styleInfoObj.sale_price,
    //       defaultPhoto: styleInfoObj.photos[0].url,
    //     });
    //   }
    // });
    // if (this.state.defaultOriginalPrice === 0) {
    //   this.setState({
    //     defaultOriginalPrice: this.props.styleInfo[0].original_price,
    //     defaultSalePrice: null,
    //     defaultPhoto: this.props.styleInfo[0].photos[0].url,
    //   });
    // }
  }

  render() {
    // console.log("OutfitCard", this.props);
    // if (this.props.defaultStyle.length !== 0) {
    return (
      <div
        className="RelatedCarouseOutfit"
        style={{
          border: "1px solid grey",
          padding: "15px 15px 15px 15px",
          margin: "15px 15px 15px 15px",
        }}
        onClick={() => {
          this.props.prodIDChanger(this.props.prodInfo[0].id);
          this.props.relatedItemsUpdater(this.props.prodInfo[0].id);
        }}
      >
        <Presistor />
        <div
          style={{
            height: "150px",
            width: "150px",
            marginBottom: "10px",
            backgroundImage: `url(${this.props.prodStyle[0].photos[0].url})`,
            backgroundSize: "150px 150px",
          }}
        >
          <button
            style={{
              color: "red",
              float: "right",
              fontSize: "20px",
              background: "black",
              borderColor: "transparent",
            }}
            onClick={(e) => {
              e.stopPropagation();
              this.props.outfitRemover(this.props.prodInfo[0].id);
              // when remover is fired: category and name are removed, but not photo and price
            }}
          >
            &times;
          </button>
        </div>
        <div>
          <div>{this.props.prodInfo[0].category}</div>
          <div>
            {" "}
            <b>{this.props.prodInfo[0].name}</b>
          </div>

          <div>
            {this.props.prodStyle[0].sale_price === null ? (
              `$${this.props.prodStyle[0].original_price}`
            ) : (
              <span>
                <span style={{ color: "red" }}>
                  {" "}
                  ${this.props.prodStyle[0].sale_price}
                </span>{" "}
                <del> ${this.props.prodStyle[0].original_price}</del>
              </span>
            )}
          </div>

          <div>{/* <Stars stars={2} /> */}</div>
        </div>
      </div>
    );
    // }
  }
}
const Presistor = () => {
  // console.log("called");
  const [items, setItems] = useState([]);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
};
export default OutfitCard;

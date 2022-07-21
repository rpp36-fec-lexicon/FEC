import React from "react";
import ReactDOM from "react-dom";

import { useState, useEffect } from "react";

class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    // console.log("=======  OUTFIT CARD PROPS  ======", this.props);
    return (
      <div
        role="productIdUpdater"
        className="relatedCarouseOutfitCard"
        onClick={() => {
          this.props.prodIDChanger(this.props.prodInfo[0].id);
          this.props.relatedItemsUpdater(this.props.prodInfo[0].id);
        }}
      >
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
            role="outfitRemover"
            className="outfitRemoveBTN"
            onClick={(e) => {
              e.stopPropagation();
              this.props.outfitRemover(this.props.prodInfo[0].id);
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

          <div> star reviews here</div>
        </div>
      </div>
    );
  }
}

export default OutfitCard;

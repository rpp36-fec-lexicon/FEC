import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import placeholder from "./../../../../public/placeholder.png";

class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    var selectedPhoto = this.props.prodStyle[0].photos[0].url;
    if (!selectedPhoto) selectedPhoto = placeholder;

    return (
      <div
        role="productIdUpdater"
        className="relatedCarouseOutfitCard"
        onClick={(e) => {
          this.props.prodIDChanger(this.props.prodInfo[0].id);
          this.props.relatedItemsUpdater(this.props.prodInfo[0].id);
          // let timeOfClick = new Date().toLocaleString("en-US", {
          //   hour12: false,
          // });
          // let element = `Selectors: {LocalName: ${e.target.localName}, ClassName: ${e.target.className}, innerHTML: ${e.target.innerHTML}}`;
          // this.props.userTracker(element, "Related-outfit Widget", timeOfClick);
        }}
      >
        <div
          style={{
            height: "150px",
            width: "150px",
            marginBottom: "10px",
            objectFit: "cover",
            backgroundImage: `url(${selectedPhoto})`,
            backgroundSize: "150px 150px",
            borderRadius: "10%",
          }}
        >
          <button
            role="outfitRemover"
            className="outfitRemoveBTN"
            onClick={(e) => {
              e.stopPropagation();
              let timeOfClick = new Date().toLocaleString("en-US", {
                hour12: false,
              });
              let element = `Selectors: {LocalName: ${e.target.localName}, ClassName: ${e.target.className}, innerHTML: ${e.target.innerHTML}}`;
              this.props.userTracker(
                element,
                "Related-outfit Widget",
                timeOfClick
              );
              this.props.outfitRemover(this.props.prodInfo[0].id);
            }}
          >
            &#10006;
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
          {isNaN(this.props.prodRating) ? null : (
            <div className="starEmpty">
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <div
                className="starFilled"
                style={{
                  width: `${Math.round((this.props.prodRating / 5) * 100)}%`,
                }}
              >
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
          )}
          {/* <div className="stars"> star {this.props.prodRating}</div> */}
        </div>
      </div>
    );
  }
}

export default OutfitCard;

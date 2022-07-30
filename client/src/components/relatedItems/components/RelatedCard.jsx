import React from "react";
import $ from "jquery";
import { FaStar, FaRegStar } from "react-icons/fa";
import placeholder from "./../../../../public/placeholder.png";

class RelatedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    var selectedPhoto = this.props.itemData.itemStyles.results[0].photos[0].url;
    if (!selectedPhoto) selectedPhoto = placeholder;

    return (
      <div
        className="RelatedCarouselItem"
        onClick={(e) => {
          this.props.prodIDChanger(this.props.itemData.itemInfo.id);
          this.props.relatedItemsUpdater(this.props.itemData.itemInfo.id);
          // let timeOfClick = new Date().toLocaleString("en-US", {
          //   hour12: false,
          // });
          // let element = `Selectors: {LocalName: ${e.target.localName}, ClassName: ${e.target.className}, innerHTML: ${e.target.innerHTML}}`;
          // this.props.userTracker(element, "Related Widget", timeOfClick);
        }}
      >
        <div
          role="productIdUpdaterInRelated"
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
          <div>
            <button
              className="comparisonBtn"
              role="featureComparer"
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
          <div className="itemCategory">
            {this.props.itemData.itemInfo.category}
          </div>
          <div className="itemName">
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

          {isNaN(this.props.itemData.itemRating) ? null : (
            <div className="starEmpty">
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <div
                className="starFilled"
                style={{
                  width: `${Math.round(
                    (this.props.itemData.itemRating / 5) * 100
                  )}%`,
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

          {/* <p> {this.props.itemData.itemRating}</p> */}
        </div>
      </div>
    );
  }
}

export default RelatedCard;

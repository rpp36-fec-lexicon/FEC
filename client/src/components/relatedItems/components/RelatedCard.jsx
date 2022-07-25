import React from "react";
import $ from "jquery";
import { FaStar, FaRegStar } from "react-icons/fa";

class RelatedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    // console.log("ITEMD PROPS====", this.props);
    return (
      <div className="RelatedCarouselItem">
        <div
          role="productIdUpdaterInRelated"
          style={{
            height: "150px",
            width: "150px",
            marginBottom: "10px",
            backgroundImage: `url(${this.props.itemData.itemStyles.results[0].photos[0].url})`,
            backgroundSize: "150px 150px",
            borderRadius: "10%",
          }}
          onClick={() => {
            this.props.prodIDChanger(this.props.itemData.itemInfo.id);
            this.props.relatedItemsUpdater(this.props.itemData.itemInfo.id);
          }}
        >
          <div>
            <button
              className="comparisonBtn"
              role="featureComparer"
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

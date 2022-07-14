import React from "react";
import ReactDOM from "react-dom";
// import Stars from "react-stars-display";

class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultOriginalPrice: 0,
      defaultSalePrice: 0,
      defaultPhoto: "",
    };
  }

  componentDidMount() {
    this.props.styleInfo.forEach((styleInfoObj) => {
      if (styleInfoObj["default?"]) {
        this.setState({
          defaultOriginalPrice: styleInfoObj.original_price,
          defaultSalePrice: styleInfoObj.sale_price,
          defaultPhoto: styleInfoObj.photos[0].url,
        });
      }
    });

    if (this.state.defaultOriginalPrice === 0) {
      this.setState({
        defaultOriginalPrice: this.props.styleInfo[0].original_price,
        defaultSalePrice: null,
        defaultPhoto: this.props.styleInfo[0].photos[0].url,
      });
    }
  }

  render() {
    return (
      <div
        className="RelatedCarouselItem"
        style={{
          border: "1px solid grey",
          padding: "15px 15px 15px 15px",
          margin: "15px 15px 15px 15px",
        }}
        // onClick={() =>
        //   this.props.prodIDChanger(this.props.itemData.itemInfo.id)
        // }
      >
        <div
          style={{
            height: "150px",
            width: "150px",
            marginBottom: "10px",
            backgroundImage: `url(${this.state.defaultPhoto})`,
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
            onClick={() => {
              this.props.outfitRemover(this.props.prodInfo.id);
              // id of current item... not the one that was cliked
            }}
          >
            &times;
          </button>
        </div>

        <div>
          <div>{this.props.prodInfo.category}</div>
          <div>
            {" "}
            <b>{this.props.prodInfo.name}</b>
          </div>

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
          </div>

          <div>{/* <Stars stars={2} /> */}</div>
        </div>
      </div>
    );
  }
}

export default OutfitCard;

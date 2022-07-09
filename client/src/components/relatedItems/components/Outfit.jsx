import React from "react";
import ReactDOM from "react-dom";
import OutfitCard from "./OutfitCard.jsx";
import Flickity from "react-flickity-component";
import $ from "jquery";

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitItems: [],
      prodInfo: "",
      // modalSeen: false,
      // relatedProdFeat: [],
      // relatedProdName: "",
    };
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: `/products/${this.props.prodID}`,
      success: (prodInfo) => {
        // console.log("main prod", prodInfo.id); // {id, name, category, features...}
        this.setState({
          prodInfo: prodInfo,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  outfitAdder() {
    // console.log("h", this.props.prodInfo);

    // if (this.state.outfitItems) { // if doesn't contain prodInfo, add, else dont
    // }
    this.setState({
      outfitItems: this.state.prodInfo,
    });
  }
  // comparison(relatedProdFeat, relatedProdName) {
  //   this.setState({
  //     modalSeen: !this.state.modalSeen,
  //     relatedProdFeat: relatedProdFeat,
  //     relatedProdName: relatedProdName,
  //   });
  // }

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
            <button
              style={{
                height: "100%",
                width: "100%",
                fontSize: "15px",
              }}
              // should only add a prod once to list.
              onClick={() => {
                this.outfitAdder();
              }}
            >
              <span>
                [&#x2B;] <br></br>
              </span>{" "}
              Add to Outfit
            </button>
          </div>

          <div className="flex-child">
            {/* <Flickity
              options={{
                cellAlign: "left",
                contain: true,
                pageDots: false,
              }}
            >
              {this.state.itemInfoAndStyle.map((itemData, index) => (
                <OutfitCard
                  itemData={itemData}
                  // comparison={this.comparison.bind(this)}
                  // prodIDChanger={this.props.prodIDChanger}
                  key={index}
                />
              ))}
            </Flickity> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Outfit;

import React from "react";
import ReactDOM from "react-dom";
import OutfitCard from "./OutfitCard.jsx";
import Flickity from "react-flickity-component";
import $ from "jquery";

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfoAndStyle: [],
      modalSeen: false,
      relatedProdFeat: [],
      relatedProdName: "",
    };
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: `/products/${this.props.prodID}/related`,

      success: (arrayOfProdIDs) => {
        var relatedItemData = [];

        arrayOfProdIDs.forEach((itemID) => {
          $.ajax({
            type: "GET",
            url: `/products/${itemID}`,
            success: (relatedItemInfo) => {
              $.ajax({
                type: "GET",
                url: `/products/${itemID}/styles`,
                success: (relatedItemStyles) => {
                  relatedItemData.push({
                    itemInfo: relatedItemInfo,
                    itemStyles: relatedItemStyles,
                  });

                  this.setState({
                    itemInfoAndStyle: relatedItemData,
                  });
                },
                error: (err) => {
                  console.log(err);
                },
              });
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      },
      error: (err) => {
        console.log(err);
      },
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
    // console.log("infoAndstyle", this.state.itemInfoAndStyle);
    return (
      <div>
        {" "}
        Your Outfit
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
            >
              <span>
                [&#x2B;] <br></br>
              </span>{" "}
              Add to Outfit
            </button>
          </div>

          <div className="flex-child">
            <Flickity
              options={{
                cellAlign: "left",
                contain: true,
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
            </Flickity>
          </div>
        </div>
      </div>
    );
  }
}

export default Outfit;

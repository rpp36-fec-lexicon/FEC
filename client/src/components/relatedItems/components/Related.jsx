import React from "react";
import $ from "jquery";
import Flickity from "react-flickity-component";
import RelatedCard from "./RelatedCard.jsx";
import Comparison from "./Comparison.jsx";

class Related extends React.Component {
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
    // console.log("Related rend", this.props.prodID); // CHANGE prodID here
    $.ajax({
      type: "GET",
      url: `/products/${this.props.prodID}/related`,

      success: (arrayOfProdIDs) => {
        var relatedItemData = [];
        // related Ids cant have duplicate not have overview id
        var UNQarrayOfProdIDs = [];
        arrayOfProdIDs.forEach((itemID) => {
          if (
            itemID !== this.props.prodID &&
            !UNQarrayOfProdIDs.includes(itemID)
          ) {
            UNQarrayOfProdIDs.push(itemID);
          }
        });
        UNQarrayOfProdIDs.forEach((itemID) => {
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

  // say i have another func that does saem as CDM, but on click on related item

  comparison(relatedProdFeat, relatedProdName) {
    this.setState({
      modalSeen: !this.state.modalSeen,
      relatedProdFeat: relatedProdFeat,
      relatedProdName: relatedProdName,
    });
  }

  render() {
    // console.log("props in Related", this.props);
    // console.log("state in Related", this.state.itemInfoAndStyle);
    // if (this.props.prodInfo !== undefined) {
    return (
      <div>
        <div className="comp">
          {this.state.modalSeen ? (
            <Comparison
              mainProdName={this.props.prodInfo.name}
              relatedProdName={this.state.relatedProdName}
              toggle={this.comparison.bind(this)}
              mainProdFeat={this.props.prodInfo.features}
              relatedProdFeat={this.state.relatedProdFeat}
            />
          ) : null}{" "}
        </div>

        <div className="relatedCarousel">
          {this.state.itemInfoAndStyle.map((itemData, index) => (
            <RelatedCard
              itemData={itemData}
              comparison={this.comparison.bind(this)}
              prodIDChanger={this.props.prodIDChanger}
              key={index}
            />
          ))}
        </div>
      </div>
    );
    // }
  }
}

export default Related;

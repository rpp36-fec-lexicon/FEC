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
  // can ajax in cdm be invoked by a func insteat (like by prodIdchanger click)

  componentDidMount() {
    // USED FOR INITIAL RELATED PRODS REQUEST
    $.ajax({
      type: "GET",
      url: `/products/${this.props.prodID}/related`,
      success: (arrayOfProdIDs) => {
        var relatedItemData = [];
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

  relatedItemsUpdater(clickedProdID) {
    $.ajax({
      type: "GET",
      url: `/products/${clickedProdID}/related`,
      success: (arrayOfProdIDs) => {
        var relatedItemData = [];
        var UNQarrayOfProdIDs = [];
        arrayOfProdIDs.forEach((itemID) => {
          if (itemID !== clickedProdID && !UNQarrayOfProdIDs.includes(itemID)) {
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

  comparison(relatedProdFeat, relatedProdName) {
    this.setState({
      modalSeen: !this.state.modalSeen,
      relatedProdFeat: relatedProdFeat,
      relatedProdName: relatedProdName,
    });
  }

  render() {
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

        <div
          className="relatedCarousel"
          onClick={() => {
            this.setState({ modalSeen: false });
          }}
        >
          {this.state.itemInfoAndStyle.map((itemData, index) => (
            <RelatedCard // HAS TO RE-RENDER when card is clicked (i.e. each item has it's own related items)
              itemData={itemData}
              comparison={this.comparison.bind(this)}
              prodIDChanger={this.props.prodIDChanger}
              relatedItemsUpdater={this.relatedItemsUpdater.bind(this)}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Related;

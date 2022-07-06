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

  comparison(relatedProdFeat, relatedProdName) {
    this.setState({
      modalSeen: !this.state.modalSeen,
      relatedProdFeat: relatedProdFeat,
      relatedProdName: relatedProdName,
    });
  }

  render() {
    // console.log("infoAndstyle", this.state.itemInfoAndStyle);
    return (
      <div>
        <br></br>Temp prodID: {this.props.prodID}
        <br></br>
        Main prod in Overview: {this.props.prodInfo.name}, category:{" "}
        {this.props.prodInfo.category}
        <br></br>
        <br></br>
        <br></br>
        Related Products:
        <div>
          {" "}
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
          style={{
            padding: "15px 15px 15px 15px",
            marginRight: "50px",
            marginLeft: "50px",
          }}
        >
          <Flickity
            options={{
              cellAlign: "left",
              contain: true,
            }}
          >
            {this.state.itemInfoAndStyle.map((itemData, index) => (
              <RelatedCard
                itemData={itemData}
                comparison={this.comparison.bind(this)}
                prodIDChanger={this.props.prodIDChanger}
                key={index}
              />
            ))}
          </Flickity>
        </div>
      </div>
    );
  }
}

export default Related;

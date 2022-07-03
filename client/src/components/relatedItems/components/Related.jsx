import React from "react";
import $ from "jquery";
import Flickity from "react-flickity-component";
import RelatedCard from "./RelatedCard.jsx";
import Comparison from "./Comparison.jsx";

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // relatedProdsInfo: [],
      // relatedItemStyles: [],
      itemInfoAndStyle: [],
      modalSeen: false,
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

  comparison() {
    this.setState({
      modalSeen: !this.state.modalSeen,
    });
  }

  render() {
    return (
      <div>
        Related Products: <br></br>Temp prodID: {this.props.prodID}
        <br></br>
        Main prod in Overview: {this.props.prodInfo.name}, category:{" "}
        {this.props.prodInfo.category}
        <br></br>
        <br></br>
        <br></br>
        <div>
          {" "}
          {this.state.modalSeen ? (
            <Comparison
              toggle={this.comparison.bind(this)}
              mainProdFeat={this.props.prodInfo.features}
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
          {/* <RelatedCard
            x={this.state.relatedProdsInfo}
            y={this.state.relatedItemStyles}
          /> */}

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

          {/* <Flickity
            options={{
              cellAlign: "left",
              contain: true,
            }}
          >
            {this.state.relatedProdIDs.map((itemID, index) => (
              <RelatedCard
                relatedItemID={itemID}
                comparison={this.comparison.bind(this)}
                prodIDChanger={this.props.prodIDChanger}
                key={index}
              />
            ))}
          </Flickity> */}
        </div>
      </div>
    );
  }
}

export default Related;

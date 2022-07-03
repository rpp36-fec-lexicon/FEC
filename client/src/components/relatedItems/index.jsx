import React from "react";
import Related from "./components/Related.jsx";
import Outfit from "./components/Outfit.jsx";
import $ from "jquery";

class RelatedAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodInfo: {},
    };
  }
  componentDidMount() {
    // console.log("RelatedAndOutfit", this.props.prodID);

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

  render() {
    // console.log("cons", this.props.prodID);
    return (
      <div>
        {/* {this.state.prodID.map((itemID, index) => ( */}
        <Related
          prodID={this.props.prodID}
          prodInfo={this.state.prodInfo}
          prodIDChanger={this.props.prodIDChanger}
          // key={index}
        />
        {/* ))} */}

        <br></br>
        <br></br>
        <br></br>

        <Outfit />
      </div>
    );
  }
}

export default RelatedAndOutfit;

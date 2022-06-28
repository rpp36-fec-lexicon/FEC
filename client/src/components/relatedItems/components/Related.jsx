import React from "react";
import $ from "jquery";
import RelatedCard from "./RelatedCard.jsx";

class Related extends React.Component {
  constructor() {
    super();
    this.state = {
      prodID: 71697, // temp. Will get this thourgh props from Overivew component
      relatedProdIDs: [],
    };
  }

  // componentDidMount () {}
  relatedProductIDFetcher() {
    // will be invoked upon component mount instead of via button (button used here for test)
    // ajax get request /related ->server -> api .../products/${this.state.prodID}/related
    // ajax success populates relatedProdIDs array with an array of ID numbers
    $.ajax({
      type: "GET",
      url: "/related",
      success: (arrayOfProdIDs) => {
        this.setState({
          relatedProdIDs: arrayOfProdIDs,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  render() {
    return (
      <div>
        Related Products
        <button onClick={this.relatedProductIDFetcher.bind(this)}>
          get Related Products
        </button>
        {" TEST BUTTON "}
        {this.state.relatedProdIDs.map((itemID, index) => (
          <RelatedCard relatedItemID={itemID} key={index} />
        ))}
      </div>
    );
  }
}

export default Related;

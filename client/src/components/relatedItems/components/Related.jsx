import React from "react";
import $ from "jquery";
import RelatedCard from "./RelatedCard.jsx";
import Flickity from "react-flickity-component";

const flickityOptions = {
  initialIndex: 0,
};

class Related extends React.Component {
  constructor() {
    super();
    this.state = {
      prodID: 71698, // temp. Will get this thourgh props from Overivew component
      relatedProdIDs: [],
    };
  }

  // componentDidMount () {}
  relatedProductIDFetcher() {
    $.ajax({
      type: "GET",
      url: `/products/${this.state.prodID}/related`,
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
        Related Products: <br></br>Temp prodID: 71698
        <br></br>
        <br></br>
        <button onClick={this.relatedProductIDFetcher.bind(this)}>
          get Related Products (temp button)
        </button>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <Flickity options={flickityOptions}>
            {this.state.relatedProdIDs.map((itemID, index) => (
              <RelatedCard relatedItemID={itemID} key={index} />
            ))}
          </Flickity>
        </div>
      </div>
    );
  }
}

export default Related;

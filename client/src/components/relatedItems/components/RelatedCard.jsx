import React from "react";
import $ from "jquery";

class RelatedCard extends React.Component {
  constructor(props) {
    super(props);
    // parent 'Related' passes relatedItemID to this child (i.e. RelatedCard)
    this.state = {
      itemInfo: [],
      itemStyles: [],
    };
  }

  componentDidMount() {
    // ajax get request /products/relatedItem -> server -> api.../products/${this.props.relatedItemID}`
    // ajax success populates itemInfo
    // makes another ajax request /products/relatedItem/styles ->server -> api.../products/${this.props.relatedItemID}/styles
    // upon sucess, populates itemStyles (i.e an array of style objects)
    $.ajax({
      type: "GET",
      url: "/products/relatedItem",
      success: (relatedItemInfo) => {
        this.setState({
          itemInfo: relatedItemInfo,
        });

        $.ajax({
          type: "GET",
          url: "/products/relatedItem/styles",
          success: (relatedItemStyles) => {
            this.setState({
              itemStyles: relatedItemStyles.results,
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
  }

  render() {
    return (
      <ol>
        <li>{this.state.itemInfo.name}</li>
        <li>{this.state.itemInfo.category}</li>
        <li>{this.state.itemInfo.default_price}</li>
      </ol>
    );
  }
}

export default RelatedCard;

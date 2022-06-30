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
    $.ajax({
      type: "GET",
      url: `/products/${this.props.relatedItemID}`,
      success: (relatedItemInfo) => {
        this.setState({
          itemInfo: relatedItemInfo,
        });

        $.ajax({
          type: "GET",
          url: `/products/${this.props.relatedItemID}/styles`,
          success: (relatedItemStyles) => {
            // console.log("loggin", relatedItemStyles.results[0]);
            this.setState({
              itemStyles: relatedItemStyles.results[0],
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
    if (this.state.itemStyles.length !== 0) {
      return (
        <ol>
          <img
            style={{ height: "100px", width: "100px" }}
            src={`${this.state.itemStyles.photos[0].url}`}
          ></img>
          <li>{this.state.itemInfo.name}</li>
          <li>{this.state.itemInfo.category}</li>
          <li>{this.state.itemInfo.default_price}</li>
          {/* {this.state.itemStyles.map((style, index) => (
            <RelatedCardStyle style={style} key={index} />
          ))} */}
        </ol>
      );
    }
  }
}

const RelatedCardStyle = (props) => {
  if (props.style.photos[0].url !== null) {
    return (
      <div
      // style={{
      //   backgroundImage: `url(${props.style.photos[0].url})`,
      // }}
      >
        <img
          style={{ height: "100px", width: "100px" }}
          src={`${props.style.photos[0].url}`}
        ></img>
      </div>
    );
  }
};

export default RelatedCard;

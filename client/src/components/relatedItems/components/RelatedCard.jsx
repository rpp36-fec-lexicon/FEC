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

  // this.state.itemInfo.features // an araay of objs {feature:.. , value: ...}
  // }

  render() {
    if (this.state.itemStyles.length !== 0) {
      // console.log("feat", this.state.itemInfo.features);
      return (
        <div
          style={{
            border: "1px solid grey",
            padding: "15px 15px 15px 15px",
            margin: "15px 15px 15px 15px",
          }}
        >
          <div
            style={{
              height: "200px",
              width: "200px",
              marginBottom: "10px",
              backgroundImage: `url(${this.state.itemStyles.photos[0].url})`,
              backgroundSize: "200px 200px",
            }}
          >
            <button onClick={this.props.comparison}>&#11088;</button>
          </div>

          <div>
            <li>{this.state.itemInfo.name}</li>
            <li>{this.state.itemInfo.category}</li>
            <li>{this.state.itemInfo.default_price}</li>
          </div>

          {/* {this.state.itemStyles.map((style, index) => (
                  <RelatedCardStyle style={style} key={index} />
                ))} */}
        </div>
      );
    }
  }
}

// const RelatedCardStyle = (props) => {
//   if (props.style.photos[0].url !== null) {
//     return (
//       <div
//       // style={{
//       //   backgroundImage: `url(${props.style.photos[0].url})`,
//       // }}
//       >
//         <img
//           style={{ height: "100px", width: "100px" }}
//           src={`${props.style.photos[0].url}`}
//         ></img>
//       </div>
//     );
//   }
// };

export default RelatedCard;

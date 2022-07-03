import React from "react";
import $ from "jquery";

class RelatedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfo: [],
      itemStyles: [],
    };
  }

  // componentDidMount() {

  // }

  // this.state.itemInfo.features // an araay of objs {feature:.. , value: ...}
  // }

  render() {
    // console.log("itemInfo", this.props.itemData.itemInfo);
    // console.log("itemStyles", this.props.itemData.itemStyles);
    // console.log("=============================================  ");

    return (
      <div
        style={{
          border: "1px solid grey",
          padding: "15px 15px 15px 15px",
          margin: "15px 15px 15px 15px",
        }}
        onClick={() => this.props.prodIDChanger(this.props.relatedItemID)}
      >
        <div
          style={{
            height: "200px",
            width: "200px",
            marginBottom: "10px",
            backgroundImage: `url(${this.props.itemData.itemStyles.results[0].photos[0].url})`,
            backgroundSize: "200px 200px",
          }}
        >
          <button onClick={this.props.comparison}>&#11088;</button>
        </div>

        <div>
          <li>{this.props.itemData.itemInfo.name}</li>
          <li>{this.props.itemData.itemInfo.category}</li>
          <li>{this.props.itemData.itemInfo.default_price}</li>
        </div>
      </div>

      //   {/* {this.state.itemStyles.map((style, index) => (
      //           <RelatedCardStyle style={style} key={index} />
      //         ))} */}
      // </div>
    );
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

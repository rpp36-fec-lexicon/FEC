import React from "react";
import $ from "jquery";

class RelatedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // itemInfo: [],
      // itemStyles: [],
    };
  }

  // componentDidMount() {

  // }

  render() {
    return (
      <div
        style={{
          border: "1px solid grey",
          padding: "15px 15px 15px 15px",
          margin: "15px 15px 15px 15px",
        }}
        onClick={() =>
          this.props.prodIDChanger(this.props.itemData.itemInfo.id)
        }
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
          <button
            style={{ float: "right" }}
            onClick={() => {
              this.props.comparison(
                this.props.itemData.itemInfo.features,
                this.props.itemData.itemInfo.name
              );
            }}
          >
            &#11088;
          </button>
        </div>

        <div>
          <li>{this.props.itemData.itemInfo.name}</li>
          <li>{this.props.itemData.itemInfo.category}</li>
          <li>
            {this.props.itemData.itemStyles.results[0].sale_price === null ? (
              this.props.itemData.itemInfo.default_price
            ) : (
              <span>
                <del style={{ color: "red" }}>
                  {" "}
                  {this.props.itemData.itemInfo.default_price}
                </del>
                <span>
                  {this.props.itemData.itemStyles.results[0].sale_price}
                </span>
              </span>
            )}
          </li>
          <li>start rating</li>
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

import React from "react";

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleCloseButton = () => {
    this.props.toggle();
  };
  render() {
    // console.log("ff", this.props);
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleCloseButton}>
            &times;{" "}
          </span>
          <table>
            <tbody>
              {/* based on length of main or related prod... redner conditionally */}
              {this.props.mainProdFeat.map((feature, index) => (
                <FeatureMapper feature={feature} key={index} />
              ))}
              {/* <tr></tr> */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const FeatureMapper = (props) => {
  console.log("ff", props);
  return (
    <tr>
      <td>{props.feature.feature}</td>
      {/* <td>y</td> */}
    </tr>
  );
};

export default Comparison;

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
    console.log("ff", this.props.mainProdFeat);
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleCloseButton}>
            &times;{" "}
          </span>
          <table>
            <tbody></tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Comparison;

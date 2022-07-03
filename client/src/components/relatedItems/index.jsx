import React from "react";
import Related from "./components/Related.jsx";
import Outfit from "./components/Outfit.jsx";

class RelatedAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Related prodID={this.props.prodID} />

        <br></br>
        <br></br>
        <br></br>

        <Outfit />
      </div>
    );
  }
}

export default RelatedAndOutfit;

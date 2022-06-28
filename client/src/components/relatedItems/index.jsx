import React from "react";
import Related from "./components/Related.jsx";
import Outfit from "./components/Outfit.jsx";

class RelatedAndOutfit extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Related />
        <Outfit />
      </div>
    );
  }
}

export default RelatedAndOutfit;

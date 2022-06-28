import React from "react";
import ReactDOM from "react-dom";
import Related from "./Related.jsx";
import Outfit from "./Outfit.jsx";

class App_RelatedAndOutfit extends React.Component {
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

export default App_RelatedAndOutfit;

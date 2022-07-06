import React from 'react';


class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h4> Review stuff here</h4>
        <h3> Category stuff </h3>
        <h2> Product Name </h2>
        <h4> Price </h4>
      </div>
    );
  }
}

export default ProductInformation;
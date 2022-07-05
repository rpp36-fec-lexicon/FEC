import React from 'react';


class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>
        <h4>Slogan here</h4>
        <p>Description from api</p>
        <div>
          <p>Feature information from api</p>
        </div>
      </div>
    )
  }
}

export default ProductDescription;
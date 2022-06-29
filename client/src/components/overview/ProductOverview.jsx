import React from 'react';
import PrimaryImage from './imageGallery/PrimaryImage.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenProduct: {},
      style: [],
      selectedStyle: '',
      selectedPhoto: ''
    };
  }

  render() {
    return (
      <div>
        <h1>Product Overview!</h1>
        <PrimaryImage />
      </div>
    )
  }
}

export default ProductOverview;
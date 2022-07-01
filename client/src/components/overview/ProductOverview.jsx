import React from 'react';
import PrimaryImage from './imageGallery/PrimaryImage.jsx';
import Checkout from './checkout/Checkout.jsx';
import ProductDescription from './information/ProductDescription.jsx';
import ProductInformation from './information/ProductInformation.jsx';
import SelectStyle from './information/SelectStyle.jsx';

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
        {/* <PrimaryImage /> */}
        {/* <Checkout /> */}
        {/* <ProductDescription /> */}
        <ProductInformation />
        <SelectStyle />
      </div>
    )
  }
}

export default ProductOverview;
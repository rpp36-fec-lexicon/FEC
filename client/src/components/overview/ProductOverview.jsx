import React from 'react';
import PrimaryImage from './imageGallery/PrimaryImage.jsx';
import Checkout from './checkout/Checkout.jsx';
import ProductDescription from './information/ProductDescription.jsx';
import ProductInformation from './information/ProductInformation.jsx';
import SelectStyle from './information/SelectStyle.jsx';
import $ from 'jquery';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenProduct: {},
      style: [],
      selectedStyle: '',
      selectedPhoto: '',
    };
  }
  componentDidMount() {

  }

  render() {
    console.log(this.props.productInfo);
    if (this.props.productInfo && this.props.defaultStyle) {
      return (
        <div>
          <h1>Product Overview!</h1>
          {/* <PrimaryImage /> */}
          {/* <Checkout /> */}
          {/* <ProductDescription slogan={this.props.productInfo.slogan} description={this.props.productInfo.description} features={this.props.productInfo.features}/> */}
          <ProductInformation category={this.props.productInfo.category} name={this.props.productInfo.name}
            price={this.props.defaultStyle.original_price} salePrice={this.props.defaultStyle.sale_price}/>
          {/* <SelectStyle /> */}
        </div>
      );
    }
  }
}

export default ProductOverview;
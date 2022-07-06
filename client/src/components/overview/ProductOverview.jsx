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
    // this.getProducts();
  }

  // getProducts() {
  //   $.ajax({
  //     url: '/products',
  //     type: 'GET',
  //     success: (data) => {
  //       console.log(data);
  //     },
  //     error: (error) => {
  //       console.log (`Error Message: ${error}`);
  //     }
  //   });
  // }

  render() {
    console.log(this.props.productInfo);
    if (this.props.productInfo) {
      return (
        <div>
          <h1>Product Overview!</h1>
          {/* <PrimaryImage /> */}
          {/* <Checkout /> */}
          <ProductDescription slogan={this.props.productInfo.slogan} description={this.props.productInfo.description} features={this.props.productInfo.features}/>
          {/* <ProductInformation /> */}
          {/* <SelectStyle /> */}
        </div>
      );
    }
  }
}

export default ProductOverview;
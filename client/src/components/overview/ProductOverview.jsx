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
      styles: [],
      selectedStyle: undefined,
      selectedPhoto: '',
    };
    this.selectedStyle = this.selectedStyle.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.testFunc = this.testFunc.bind(this);
  }
  componentDidMount() {
    this.selectedStyle();
  }

  selectedStyle() {
    var tempStyle = this.props.defaultStyle;
    this.setState({
      selectedStyle: tempStyle,
      styles: this.props.styleList
    }, this.testFunc());
    console.log('temp style', tempStyle);
  }

  testFunc() {
    console.log('new state ', this);
  }

  changeStyle(id) {
    this.setState({ selectedStyle: this.props.styleList.find((element) => element.style_id === id)});
  }

  render() {
    console.log(this.props.productInfo);
    if (this.props.productInfo && this.props.defaultStyle) {
      console.log('this is the current style ', this.state.selectedStyle);
      return (
        <div>
          <h1>Product Overview!</h1>
          {/* <PrimaryImage /> */}
          {/* <Checkout /> */}
          {/* <ProductDescription slogan={this.props.productInfo.slogan} description={this.props.productInfo.description} features={this.props.productInfo.features}/> */}

          {/* <ProductInformation category={this.props.productInfo.category} name={this.props.productInfo.name}
            price={this.props.defaultStyle.original_price} salePrice={this.props.defaultStyle.sale_price}/> */}
          {this.state.selectedStyle ?
            <div>
              <ProductInformation category={this.props.productInfo.category} name={this.props.productInfo.name}
                price={this.state.selectedStyle.original_price} salePrice={this.state.selectedStyle.sale_price}/>
              <SelectStyle styles={this.props.styleList} changeStyle={this.changeStyle} selectedStyle={this.state.selectedStyle}/>
            </div> :
            <div>
              <ProductInformation category={this.props.productInfo.category} name={this.props.productInfo.name}
                price={this.props.defaultStyle.original_price} salePrice={this.props.defaultStyle.sale_price}/>
              <SelectStyle styles={this.props.styleList} changeStyle={this.changeStyle} selectedStyle={this.props.defaultStyle}/>
            </div>
          }
        </div>
      );
    }
  }
}

export default ProductOverview;
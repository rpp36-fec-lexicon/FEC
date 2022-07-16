import React from 'react';
import PrimaryImage from './imageGallery/PrimaryImage.jsx';
import Showcase from './imageGallery/Showcase.jsx';
import ExpandedView from './imageGallery/ExpandedView.jsx';
import Checkout from './checkout/Checkout.jsx';
import ProductDescription from './information/ProductDescription.jsx';
import ProductInformation from './information/ProductInformation.jsx';
import SelectStyle from './information/SelectStyle.jsx';
import $ from 'jquery';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: undefined,
      selectedPhoto: '',
      productInfo: undefined,
    };
    this.changeStyle = this.changeStyle.bind(this);
  }
  componentDidMount() {
    this.setState({
      selectedStyle: this.props.defaultStyle,
      productInfo: this.props.productInfo
    });
  }

  componentDidUpdate() {
    if (this.state.productInfo !== this.props.productInfo) {
      this.setState({
        productInfo: this.props.productInfo,
        selectedStyle: this.props.defaultStyle
      });
    }
  }

  changeStyle(id) {
    this.setState({
      selectedStyle: this.props.styleList.find((element) => element.style_id === id),
      productId: this.props.productInfo.id
    });
  }

  changePhoto(photoId) {
    this.setState({ selectedPhoto: photoId});
  }

  render() {
    if (this.state.productInfo && this.state.selectedStyle && this.props.rating) {
      return (
        <div>
          <h1 id="overviewHead">Product Overview!</h1>
          <div>
            <Showcase id={this.state.selectedStyle.style_id} photos={this.state.selectedStyle.photos} currentPhoto={this.changePhoto}/>
            <Checkout id={this.state.selectedStyle.style_id} skus={this.state.selectedStyle.skus}/>
            <ProductInformation category={this.props.productInfo.category} name={this.props.productInfo.name}
              price={this.state.selectedStyle.original_price} salePrice={this.state.selectedStyle.sale_price} rating={this.props.rating}/>
            <SelectStyle styles={this.props.styleList} changeStyle={this.changeStyle} selectedStyle={this.state.selectedStyle}/>
            <ProductDescription slogan={this.props.productInfo.slogan} description={this.props.productInfo.description} features={this.props.productInfo.features}/>
          </div>
        </div>
      );
    }
  }
}

export default ProductOverview;
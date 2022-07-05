import React from 'react';


class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props.features[0].value);
    return (
      <div>
        <h4>{this.props.slogan}</h4>
        <p>{this.props.description}</p>
        <div>
          {this.props.features.map((element) => <h4 key={element.feature}>{element.feature} : {element.value}</h4>)}
        </div>
      </div>
    );
  }
}

export default ProductDescription;
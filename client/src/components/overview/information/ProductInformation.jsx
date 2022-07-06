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
        <h3> {this.props.category} </h3>
        <h2> {this.props.name} </h2>
        {this.props.salePrice !== null ?
          <h4>
            <b style={{color: 'red'}}>${this.props.salePrice}</b>
            <b style={{textDecoration: 'line-through'}}>${this.props.price}</b>
          </h4>
          :
          <h4> ${this.props.price}</h4>
        }
      </div>
    );
  }
}

export default ProductInformation;
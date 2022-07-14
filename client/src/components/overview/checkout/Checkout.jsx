import React from 'react';


class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSkuQuantity: -1
    };
    this.userSelect = this.userSelect.bind(this);
  }

  getSizes() {
    if (this.props.skus.null) { return []; }
    return Array.from(Object.values(this.props.skus).map((product) => product.size));
  }

  range(min, max) {
    return [...Array(Math.min(min, max)).keys()];
  }

  userSelect(e) {
    var num;
    if (e.target.value === 'Select Size' || e.target.value === 'OUT OF STOCK') {
      this.setState({ currentSkuQuantity: -1});
    } else {
      Object.entries(this.props.skus).find((product) => {
        console.log('product?', product[1].size);
        if (product[1].size === e.target.value) {
          num = product[1].quantity;
          this.setState({
            currentSkuQuantity: num
          });
        }
      });
    }
  }

  render() {
    console.log('props in checkout', this.props);
    return (
      <div>
        <select name="size" id="size" onChange={this.userSelect}>
          {this.getSizes().length > 0 ?
            (
              <>
                <option>Select Size</option>
                {this.getSizes().map((size) => <option key={size} value={size}>{size}</option>)}
              </>
            ) :
            <option>OUT OF STOCK</option>}
        </select>
        <select name="quant" id="quant" disabled={this.state.currentSkuQuantity === -1}>
          {this.state.currentSkuQuantity === -1
          && (
            <option>-</option>
          )}
          {this.state.currentSkuQuantity === 0
          && (
            <option>OUT OF STOCK</option>
          )}
          {this.state.currentSkuQuantity > 0
          && (
            this.range(this.state.currentSkuQuantity, 15).map((num) => (
              <option key={num + 1}>{num + 1}</option>
            ))
          )}
        </select>
        <div>
          <button type="checkout" value="checkout">Check Out</button>
          <button type="fav" value="fav">Add to Outfits</button>
        </div>
      </div>
    );
  }
}

export default Checkout;
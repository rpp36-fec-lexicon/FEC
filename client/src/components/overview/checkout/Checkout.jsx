import React from 'react';


class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <select name="size">
          <option> S </option>
          <option> M </option>
          <option> L </option>
          <option> XL </option>
        </select>
        <select name="quant">
          <option> - </option>
          <option> 1 </option>
          <option> 2 </option>
          <option> 3 </option>
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
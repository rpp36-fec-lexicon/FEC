import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import $ from "jquery";

const Button = styled.button`
  margin-right: 30px;
  height: 50px;
  width: auto;
  min-width: 100px;
  text-align: center;
  font-family: Optima, sans-serif;
  padding: 10px;
  border-radius: 30px;
  border: 2px solid rgba(39, 200, 210, 0.9);
  color: black;
  background-color: transparent;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: rgba(39, 200, 210, 0.9);
    box-shadow: 0px 5px 10px rgba(39, 200, 210, 0.4);
  }
  &:active {
    box-shadow: 10px 10px 9px 4px rgba(37, 125, 255, 0.7);
  }
`;

const SelectDiv = styled.div`
  margin: 8px 0;
  > * {
    font-family: Optima, sans-serif;
    background-color: white;
    height: 25px;
    border-radius: 20px;
    padding: 0 5px;
    margin: 0 5px;
    border: 1px solid rgba(39, 200, 210, 0.9);
    color: black;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 10px;
  > * {
    vertical-align: middle;
    margin: 0 5px;
  }
`;

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSkuQuantity: -1,
    };
    this.userSelect = this.userSelect.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-use-before-define
    var pulledItems = storageGetter();
    var existingIDs = [];
    for (let i = 0; i < pulledItems.length; i++) {
      existingIDs.push(pulledItems[i][0][0].id);
    }
    if (existingIDs.includes(this.props.productId)) {
      $(".MainOutfitAdderBTN").text("Item Added to Outfit");
      $(".MainOutfitAdderBTN").addClass("disabledBTN");
    }
  }

  getSizes() {
    if (this.props.skus.null) {
      return [];
    }
    return Array.from(
      Object.values(this.props.skus).map((product) => product.size)
    );
  }

  range(min, max) {
    return [...Array(Math.min(min, max)).keys()];
  }

  userSelect(e) {
    var num;
    if (e.target.value === "Select Size" || e.target.value === "OUT OF STOCK") {
      this.setState({ currentSkuQuantity: -1 });
    } else {
      Object.entries(this.props.skus).find((product) => {
        if (product[1].size === e.target.value) {
          num = product[1].quantity;
          this.setState({
            currentSkuQuantity: num,
          });
        }
      });
    }
  }

  render() {
    return (
      <div>
        <SelectDiv>
          <select name="size" id="size" onChange={this.userSelect}>
            {this.getSizes().length > 0 ? (
              <>
                <option>Select Size</option>
                {this.getSizes().map((size, i) => (
                  <option key={i} value={size}>
                    {size}
                  </option>
                ))}
              </>
            ) : (
              <option>OUT OF STOCK</option>
            )}
          </select>
          <select
            name="quant"
            id="quant"
            disabled={this.state.currentSkuQuantity === -1}
          >
            {this.state.currentSkuQuantity === -1 && <option>-</option>}
            {this.state.currentSkuQuantity === 0 && (
              <option>OUT OF STOCK</option>
            )}
            {this.state.currentSkuQuantity > 0 &&
              this.range(this.state.currentSkuQuantity, 15).map((num) => (
                <option key={num + 1}>{num + 1}</option>
              ))}
          </select>
        </SelectDiv>
        <ButtonDiv>
          <Button type="checkout" value="checkout">
            Add to Cart
          </Button>

          {this.props.outfitItemsIDs.includes(this.props.productId) ? (
            <Button
              className="MainOutfitAdderBTN"
              type="fav"
              value="fav"
              onClick={() => {
                this.props.outfitAdder();
              }}
            >
              Item Added to Outfit
            </Button>
          ) : (
            <Button
              className="MainOutfitAdderBTN"
              type="fav"
              value="fav"
              onClick={() => {
                this.props.outfitAdder();
              }}
            >
              Add to Outfits
              <Persister outfits={this.props.outfitItems} />
            </Button>
          )}
        </ButtonDiv>
      </div>
    );
  }
}

const Persister = (props) => {
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(props.outfits));
  }, [props]);
};

export const storageGetter = (key = 'items') => {
  let savedItems = localStorage.getItem(key);
  const storageResult = savedItems !== null ? JSON.parse(savedItems) : [];
  // const storageResult = [];
  return storageResult;
};

export default Checkout;

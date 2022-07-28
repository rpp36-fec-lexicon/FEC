import React from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Div = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Div>
        {isNaN(this.props.rating) ? null : (
          <>
            <div className="starEmpty">
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <div
                className="starFilled"
                style={{
                  width: `${Math.round(
                    (this.props.rating / 5) * 100
                  )}%`,
                }}
              >
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
            <p style={{display: 'inline-block'}}><a href='#listOfReviews'>Read All Reviews</a></p>
          </>
        )}
        <h3> {this.props.category} </h3>
        <h2> {this.props.name} </h2>
        {this.props.salePrice !== null ?
          <h4>
            <b style={{color: 'red', marginTop: '5px', paddingRight: '10px'}}>${this.props.salePrice}</b>
            <b style={{textDecoration: 'line-through', marginTop: '5px'}}>${this.props.price}</b>
          </h4>
          :
          <h4> ${this.props.price}</h4>
        }
      </Div>
    );
  }
}

export default ProductInformation;
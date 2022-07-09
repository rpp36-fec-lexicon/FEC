import React from 'react';
import ReactDOM from 'react-dom';
// import Stars from "react-stars-display";

class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultOriginalPrice: 0,
      defaultSalePrice: 0,
      defaultPhoto: '',
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          border: '1px solid grey',
          padding: '15px 15px 15px 15px',
          margin: '15px 15px 15px 15px',
        }}
        // onClick={() =>
        //   this.props.prodIDChanger(this.props.itemData.itemInfo.id)
        // }
      >
        <div
          style={{
            height: '200px',
            width: '200px',
            marginBottom: '10px',
            backgroundImage: `url(${this.state.defaultPhoto})`,
            backgroundSize: '200px 200px',
          }}
        >
          <button
            style={{
              color: 'yellow',
              float: 'right',
              fontSize: '20px',
              background: 'transparent',
              borderColor: 'transparent',
            }}
            onClick={() => {
              // this.props.comparison(
              //   this.props.itemData.itemInfo.features,
              //   this.props.itemData.itemInfo.name
              // );
            }}
          >
            &times;
          </button>
        </div>

        <div>
          <div>{this.props.itemData.itemInfo.category}</div>
          <div>
            {' '}
            <b>{this.props.itemData.itemInfo.name}</b>
          </div>

          <div>
            {this.state.defaultSalePrice === null ? (
              `$${this.state.defaultOriginalPrice}`
            ) : (
              <span>
                <span style={{ color: 'red' }}>
                  {' '}
                  ${this.state.defaultSalePrice}
                </span>{' '}
                <del> ${this.state.defaultOriginalPrice}</del>
              </span>
            )}
          </div>

          <div>{/* <Stars stars={2} /> */}</div>
        </div>
      </div>
    );
  }
}

export default OutfitCard;

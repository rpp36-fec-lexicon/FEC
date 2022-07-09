import React from 'react';
import ReactDOM from 'react-dom';
import OutfitCard from './OutfitCard.jsx';
import Flickity from 'react-flickity-component';
import $ from 'jquery';

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitItems: [],
      itemInfoAndStyle: [],
      prodInfo: '',
      relatedProdFeat: [],
      relatedProdName: '',
      // modalSeen: false,
      // relatedProdFeat: [],
      // relatedProdName: "",
    };
  }

  componentDidMount() {
    // console.log("Related rend", this.props.prodID); // CHANGE prodID here
    $.ajax({
      type: 'GET',
      url: `/products/${this.props.prodID}/related`,

      success: (arrayOfProdIDs) => {
        var relatedItemData = [];

        arrayOfProdIDs.forEach((itemID) => {
          $.ajax({
            type: 'GET',
            url: `/products/${itemID}`,
            success: (relatedItemInfo) => {
              $.ajax({
                type: 'GET',
                url: `/products/${itemID}/styles`,
                success: (relatedItemStyles) => {
                  relatedItemData.push({
                    itemInfo: relatedItemInfo,
                    itemStyles: relatedItemStyles,
                  });

                  this.setState({
                    itemInfoAndStyle: relatedItemData,
                  });
                },
                error: (err) => {
                  console.log(err);
                },
              });
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  outfitAdder() {
    this.setState({
      outfitItems: this.state.itemInfoAndStyle,
    });
  }

  render() {
    // console.log("outfitItems", this.state.outfitItems);
    return (
      <div>
        <div
          className="flex-container"
          style={{
            padding: '15px 15px 15px 15px',
            marginRight: '50px',
            marginLeft: '40px',
          }}
        >
          <div
            className="flex-child"
            style={{
              margin: '15px 15px 15px 15px',
            }}
          >
            <button
              style={{
                height: '100%',
                width: '100%',
                fontSize: '15px',
              }}
              // should only add a prod once to list.
              onClick={() => {
                this.outfitAdder();
              }}
            >
              <span>
                [&#x2B;] <br></br>
              </span>{' '}
              Add to Outfit
            </button>
          </div>

          <div className="flex-child">
            {this.state.outfitItems.length !== 0 ? (
              <OutfitRenderer data={this.state.itemInfoAndStyle} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const OutfitRenderer = (props) => {
  console.log('PPP', props);
  return (
    <div
      style={{
        border: '1px solid grey',
        padding: '15px 15px 15px 15px',
        margin: '15px 15px 15px 15px',
      }}
    >
      <div
        style={{
          height: '200px',
          width: '200px',
          marginBottom: '10px',
          backgroundImage: `url(${props.data[0].itemStyles.results[0].photos[0].url})`,
          backgroundSize: '200px 200px',
        }}
      >
        <button
          className="closeBtn"
          style={{
            float: 'right',
            background: 'transparent',
            borderColor: 'transparent',
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Outfit;

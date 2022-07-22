import React from 'react';
import StarReviewIcon from './StarReviewIcon.jsx';

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedStar: null,
      message: null
    };
    this.clickFillStarFunc = this.clickFillStarFunc.bind(this);
    this.ratingMessage = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great'
    };
  }

  clickFillStarFunc(star) {
    const message = this.ratingMessage[star];
    this.setState({clickedStar: star, message});
  }

  render() {

    const expandStyle = {
      width: '700px',
      height: '2000px'
    };

    const sameLineStyle = {
      display: 'flex'
    };

    const messageStyle = {
      fontSize: '20px',
      margin: 'auto 10px'
    };

    return (
      <div className="reviewModal">
        <div className="reviewModal-content">
          <span className="close" onClick={() => { this.props.closeReviewModalFunc(); }}>&times;</span>
          <div>
            <h2>Write Your Review</h2>
            <h3>About the {this.props.productInfo.name}</h3>
            <h3>Overall Rating<sup>*</sup></h3>
            <div style={sameLineStyle}>
              <StarReviewIcon starNumber={1} clickFillStarFunc={this.clickFillStarFunc} filled={1 <= this.state.clickedStar} />
              <StarReviewIcon starNumber={2} clickFillStarFunc={this.clickFillStarFunc} filled={2 <= this.state.clickedStar} />
              <StarReviewIcon starNumber={3} clickFillStarFunc={this.clickFillStarFunc} filled={3 <= this.state.clickedStar} />
              <StarReviewIcon starNumber={4} clickFillStarFunc={this.clickFillStarFunc} filled={4 <= this.state.clickedStar} />
              <StarReviewIcon starNumber={5} clickFillStarFunc={this.clickFillStarFunc} filled={5 <= this.state.clickedStar} />
              <div style={messageStyle}>{this.state.message}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ReviewModal;

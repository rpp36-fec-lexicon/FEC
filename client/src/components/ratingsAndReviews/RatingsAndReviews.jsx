import React from 'react';
import ReviewList from './Reviews/ReviewList.jsx';
import RatingSummary from './Ratings/RatingSummary.jsx';
const sampleReviewData = require('./sampleData/sampleReviews.js').sampleReviews;
const sampleReviews = require('./sampleData/sampleReviews.js').sampleReviews.results;
const sampleMeta = require('./sampleData/sampleMeta.js').sampleMeta;
const sampleRating = require('./sampleData/sampleMeta.js').rating;
const sampleTotalNumberOfRatings = require('./sampleData/sampleMeta.js').totalNumberOfRatings;
const axios = require('axios');

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71697,
      reviews: [],
      filterRatingClickCount: 0,
      star5: false,
      star4: false,
      star3: false,
      star2: false,
      star1: false
    };
    this.filterRating = this.filterRating.bind(this);
  }

  filterRating(starRating) {
    const reviews = this.props.reviews;
    if (this.state['star' + starRating]) {
    }
  }

  render() {
    console.log('props in ratingsreview', this.props);
    if (this.props.reviews !== null) {
      return (
        <div className="content-container">
          <div className="row">
            <div className="left-panel box">
              <RatingSummary metaData={this.props.metaData} rating={this.props.rating} totalNumberOfRatings={this.props.totalNumberOfRatings} filterRating={this.filterRating}/>
              {/* <RatingSummary metaData={sampleMeta} rating={sampleRating} totalNumberOfRatings={sampleTotalNumberOfRatings} filterRating={this.filterRating}/> */}
            </div>
            <div className="right-panel box">
              <ReviewList reviewData={this.props.reviewData} reviews={this.props.reviews} />
              {/* <ReviewList reviewData={sampleReviewData} reviews={sampleReviews} /> */}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default RatingsAndReviews;


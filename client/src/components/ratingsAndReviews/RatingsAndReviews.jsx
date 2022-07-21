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
      // productId: 71697,
      reviewData: null,
      reviews: null,
      metaData: null,
      rating: null,
      totalNumberOfRatings: null,
      filterRatingClickCount: 0,
      star5: false,
      star4: false,
      star3: false,
      star2: false,
      star1: false
    };
    this.filterRating = this.filterRating.bind(this);
  }

  componentDidMount() {
    const reviews = this.props.reviews;
    const reviewData = this.props.reviewData;
    const metaData = this.props.metaData;
    const rating = this.props.rating;
    const totalNumberOfRatings = this.props.totalNumberOfRatings;
    this.setState({reviews, reviewData, metaData, rating, totalNumberOfRatings});
  }

  filterRating(starRating) {
    console.log('star', starRating, typeof starRating)
    let filteredReviews = [];
    const reviews = this.props.reviews;
    reviews.forEach(review => {
      if (review.rating === parseInt(starRating)) {
        filteredReviews.push(review);
      }
    });

    this.setState({reviews: filteredReviews}, () => {
      console.log('reviews in topapp rr', this.state.reviews);
    });
  }

  render() {
    if (this.state.reviews !== null) {
      return (
        <div>
          <h3>RATINGS & REVIEWS</h3>
          <div className="content-container">
            <div className="row">
              <div className="left-panel">
                <RatingSummary metaData={this.state.metaData} rating={this.state.rating} totalNumberOfRatings={this.state.totalNumberOfRatings} filterRating={this.filterRating}/>
                {/* <RatingSummary metaData={sampleMeta} rating={sampleRating} totalNumberOfRatings={sampleTotalNumberOfRatings} filterRating={this.filterRating}/> */}
              </div>
              <div className="right-panel">
                <ReviewList reviewData={this.state.reviewData} reviews={this.state.reviews} ratingCount={this.state.ratingCount}/>
                {/* <ReviewList reviewData={sampleReviewData} reviews={sampleReviews} /> */}
              </div>
            </div>
          </div>
        </div>

      );
    }
  }
}

export default RatingsAndReviews;


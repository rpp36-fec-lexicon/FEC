import React from 'react';
import ReviewList from './Reviews/ReviewList.jsx';
import RatingSummary from './Ratings/RatingSummary.jsx';
import RatingBreakdown from './Ratings/RatingBreakdown.jsx';
import ProductBreakdown from './Ratings/ProductBreakdown.jsx';
const axios = require('axios');

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: {},
      reviews: []
    }
    this.sortReviews = this.sortReviews.bind(this);
  }

  getAllReviewsFunc() {
    axios.get('/reviews')
      .then(response => {
        console.log('response', response);
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  sortReviewsFunc(term) {

  }

  ratingSummaryFunc() {

  }

  render() {
    return (
      <div>
        <RatingSummary />
        <RatingBreakdown />
        <ProductBreakdown />
        <ReviewList reviews={this.state.reviews} sortReviewsFunc={this.sortReviewsFunc}/>
      </div>
    );
  }
}

export default RatingsAndReviews;


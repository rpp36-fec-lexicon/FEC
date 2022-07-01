import React from 'react';
import ReviewList from './Reviews/ReviewList.jsx';
import RatingSummary from './Ratings/RatingSummary.jsx';
import RatingBreakdown from './Ratings/RatingBreakdown.jsx';
import ProductBreakdown from './Ratings/ProductBreakdown.jsx';
const sampleReviews = require('./sampleReviews.js').sampleReviews;
const axios = require('axios');

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71697,
      reviewData: {},
      reviews: [],
      metaData: {}
    }
    this.sortReviewsFunc = this.sortReviewsFunc.bind(this);
    this.getAllReviewsFunc = this.getAllReviewsFunc.bind(this);
    this.ratingSummaryFunc = this.ratingSummaryFunc.bind(this);
  }

  componentDidMount() {
    this.getAllReviewsFunc();
    this.getAllMetaFunc();
  }

  getAllReviewsFunc() {
    axios.get('/reviews', {params: {productId: this.state.productId} })
      .then(response => {
        this.setState({reviewData: response.data, reviews: response.data.results});
      })
      .catch(err => {
        console.log('error getting reviews', err);
      })
  }

  getAllMetaFunc() {
    axios.get('/reviews/meta', {params: {productId: this.state.productId} })
      .then(response => {
        this.setState({metaData: response.data});
      })
      .catch(err => {
        console.log('error getting meta', err);
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
        {/* <ReviewList reviews={this.state.reviews} sortReviewsFunc={this.sortReviewsFunc}/> */}
        <ReviewList reviews={sampleReviews.results} sortReviewsFunc={this.sortReviewsFunc}/>
        <button onClick={() => { this.getAllReviewsFunc() }}>get reviews</button>
        <button onClick={() => { this.getAllMetaFunc() }}>get meta</button>
      </div>
    );
  }
}

export default RatingsAndReviews;


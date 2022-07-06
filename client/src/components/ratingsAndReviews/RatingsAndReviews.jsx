import React from 'react';
import ReviewList from './Reviews/ReviewList.jsx';
import RatingSummary from './Ratings/RatingSummary.jsx';
const sampleReviews = require('./sampleReviews.js').sampleReviews;
const sampleMeta = require('./sampleMeta.js').sampleMeta;
const axios = require('axios');

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71697,
      reviewData: null,
      reviews: null,
      metaData: null
    };
    // this.sortReviewsFunc = this.sortReviewsFunc.bind(this);
    // this.ratingSummaryFunc = this.ratingSummaryFunc.bind(this);
  }

  // componentDidMount() {
  //   console.log('props', this.props);
  //   const reviewData = this.props.reviewData;
  //   const reviews = this.props.reviews;
  //   const metaData = this.props.metaData;
  //   const productId = this.props.productId;
  //   this.setState({productId, reviewData, reviews, metaData});
  // }


  // sortReviewsFunc(term) {

  // }

  // ratingSummaryFunc() {

  // }



  render() {
    console.log('props', this.props);
    return (
      <div>
        {/* <RatingSummary metaData={this.state.metaData} reviews={this.state.reviews}/> */}
        {/* <RatingSummary metaData={sampleMeta} reviews={sampleReviews.results}/> */}
        {/* <ReviewList reviews={this.state.reviews} sortReviewsFunc={this.sortReviewsFunc}/> */}
        {/* <ReviewList reviews={sampleReviews.results} sortReviewsFunc={this.sortReviewsFunc}/> */}
      </div>
    );
  }
}

export default RatingsAndReviews;


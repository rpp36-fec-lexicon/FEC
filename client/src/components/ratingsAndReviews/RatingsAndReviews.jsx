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
      reviewData: {},
      reviews: [],
      metaData: {}
    }
    this.sortReviewsFunc = this.sortReviewsFunc.bind(this);
    this.getAllReviewsFunc = this.getAllReviewsFunc.bind(this);
    this.ratingSummaryFunc = this.ratingSummaryFunc.bind(this);
  }

  // componentDidMount() {
  //   this.getAllReviewsFunc()
  //     .then(response => {
  //       const reviewData = response.data;
  //       const reviews = response.data.results;
  //       this.getAllMetaFunc()
  //         .then(response => {
  //           const metaData = response.data;
  //           this.setState({reviewData: reviewData, reviews: reviews, metaData: metaData});
  //         })
  //     })
  //     .catch(err => {
  //       console.log('error getting reviews and metaData', err);
  //     })
  // }

  getAllReviewsFunc() {
    return axios.get('/reviews', {params: {productId: this.state.productId} });
  }

  getAllMetaFunc() {
    return axios.get('/reviews/meta', {params: {productId: this.state.productId} });
  }

  sortReviewsFunc(term) {

  }

  ratingSummaryFunc() {

  }



  render() {
    return (
      <div>
        {/* <RatingSummary metaData={this.state.metaData}/> */}
        <RatingSummary metaData={sampleMeta}/>
        {/* <ReviewList reviews={this.state.reviews} sortReviewsFunc={this.sortReviewsFunc}/> */}
        <ReviewList reviews={sampleReviews.results} sortReviewsFunc={this.sortReviewsFunc}/>
      </div>
    );
  }
}

export default RatingsAndReviews;


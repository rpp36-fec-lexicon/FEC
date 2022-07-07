import React from 'react';
import ReviewList from './Reviews/ReviewList.jsx';
import RatingSummary from './Ratings/RatingSummary.jsx';
const sampleReviews = require('./sampleReviews.js').sampleReviews;
const sampleMeta = require('./sampleMeta.js').sampleMeta;
const samepleRating = require('./sampleMeta.js').rating;
const sampleTotalNumberOfRatings = require('./sampleMeta.js').totalNumberOfRatings;
const axios = require('axios');

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71697
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
    console.log('props in reviews', this.props);
    if (this.props.reviewData !== null) {
      return (
        <div>
          <RatingSummary metaData={this.props.metaData} rating={this.props.rating} totalNumberOfRatings={this.props.totalNumberOfRatings}/>
          {/* <RatingSummary metaData={sampleMeta} rating={sampleRating} totalNumberOfRatings={sampleTotalNumberOfRatings}/> */}
          <ReviewList reviewData={this.props.reviewData} reviews={this.props.reviews} sortReviewsFunc={this.sortReviewsFunc}/>
          {/* <ReviewList reviewData={sampleReviews} reviews={sampleReviews.results} sortReviewsFunc={this.sortReviewsFunc}/> */}
        </div>
      );
    }

  }
}

export default RatingsAndReviews;


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
      clickedStars: [],
      example: false

    };
    this.filterRatingFunc = this.filterRatingFunc.bind(this);
  }

  componentDidMount() {
    const reviews = this.props.reviews;
    const reviewData = this.props.reviewData;
    const metaData = this.props.metaData;
    const rating = this.props.rating;
    const totalNumberOfRatings = this.props.totalNumberOfRatings;
    this.setState({reviews, reviewData, metaData, rating, totalNumberOfRatings});
  }

  filterRatingFunc(starRating) {
    const star = parseInt(starRating);
    let filteredReviews = [];
    const reviews = this.props.reviews;
    let currentStars;

    if (this.state.clickedStars.length) {
      currentStars = this.state.clickedStars.slice();

      if (currentStars.indexOf(star) < 0) {
        currentStars.push(star);
        filteredReviews = this.state.reviews.slice();
        reviews.forEach(review => {
          if (review.rating === star) {
            filteredReviews.push(review);
          }
        });

      } else {
        // currentStars = this.state.clickedStars.slice();
        const indexOfStar = currentStars.indexOf(star);
        currentStars.splice(indexOfStar, 1);
        filteredReviews = this.state.reviews.slice();
        for (var i = filteredReviews.length - 1; i > -1; i--) {
          if (filteredReviews[i].rating === star) {
            filteredReviews.splice(i, 1);
          }
        }
      }

      if (!filteredReviews.length) {

        this.setState(
          {reviews: null, clickedStars: null},
          () => { this.setState({reviews: this.props.reviews, clickedStars: currentStars})}
        );
      }

      this.setState({reviews: filteredReviews, clickedStars: currentStars}, () => {
        console.log('state in topapp rr', this.state);
      });

    } else if (!this.state.clickedStars.length) {
      currentStars = [];
      currentStars.push(star);
      reviews.forEach(review => {
        if (review.rating === star) {
          filteredReviews.push(review);
        }
      });
      this.setState({reviews: filteredReviews, clickedStars: currentStars});
    }

  }

  render() {
    console.log('productinfo', )
    if (this.state.reviews !== null) {
      return (
        <div>
          <h3>RATINGS & REVIEWS</h3>
          <div className="content-container">
            <div className="row">
              <div className="left-panel">
                <RatingSummary metaData={this.state.metaData} rating={this.state.rating} totalNumberOfRatings={this.state.totalNumberOfRatings} filterRatingFunc={this.filterRatingFunc} clickedStars={this.state.clickedStars}/>
                {/* <RatingSummary metaData={sampleMeta} rating={sampleRating} totalNumberOfRatings={sampleTotalNumberOfRatings} filterRating={this.filterRating}/> */}
              </div>
              <div className="right-panel">
                <ReviewList reviewData={this.state.reviewData} reviews={this.state.reviews} productInfo={this.props.productInfo}/>
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


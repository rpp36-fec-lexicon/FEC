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
      // filterRatingClickCount: 0,
      clickedStars: null

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
    console.log('star', starRating);

    const star = parseInt(starRating);
    let filteredReviews = [];
    const reviews = this.props.reviews;
    reviews.forEach(review => {
      if (review.rating === star) {
        filteredReviews.push(review);
      }
    });

    let currentStars;

    if (this.state.clickedStars !== null) {
      console.log('not null');
      currentStars = this.state.clickedStars;
      if (currentStars.indexOf(star) < 0) {
        currentStars.push(star);
      } else {
        const indexOfStar = currentStars.indexOf(star);
        currentStars.splice(indexOfStar, 1);
      }

      this.setState({reviews: filteredReviews, clickedStars: currentStars}, () => {
        console.log('state in topapp rr', this.state);
      });

    } else if (this.state.clickedStars === null) {
      console.log('null')
      currentStars = [];
      currentStars.push(star);
      console.log('currentStars in null', currentStars);

      this.setState({reviews: filteredReviews, clickedStars: currentStars}, () => {
        console.log('state in topapp rr', this.state);
      });
    }

  }

  render() {
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


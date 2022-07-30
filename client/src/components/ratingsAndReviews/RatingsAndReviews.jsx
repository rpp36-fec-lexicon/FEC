import React from "react";
import ReviewList from "./Reviews/ReviewList.jsx";
import RatingSummary from "./Ratings/RatingSummary.jsx";
const sampleReviewData = require("./sampleData/sampleReviews.js").sampleReviews;
const sampleReviews = require("./sampleData/sampleReviews.js").sampleReviews
  .results;
const sampleMeta = require("./sampleData/sampleMeta.js").sampleMeta;
const sampleRating = require("./sampleData/sampleMeta.js").rating;
const sampleTotalNumberOfRatings =
  require("./sampleData/sampleMeta.js").totalNumberOfRatings;
const axios = require("axios");

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
      clickedEmptyStars: [],
      ratedStars: null,
    };
    this.filterRatingFunc = this.filterRatingFunc.bind(this);
    this.searchReviewFunc = this.searchReviewFunc.bind(this);
  }

  componentDidMount() {
    const reviews = this.props.reviews;
    const reviewData = this.props.reviewData;
    const metaData = this.props.metaData;
    const rating = this.props.rating;
    const totalNumberOfRatings = this.props.totalNumberOfRatings;
    this.setState({
      reviews,
      reviewData,
      metaData,
      rating,
      totalNumberOfRatings,
    });
  }

  filterRatingFunc(star) {
    // const star = parseInt(starRating);
    let filteredReviews = [];
    const reviews = this.props.reviews;
    let currentStars;
    let clickedEmptyStars;
    let ratedStars = {};

    reviews.forEach((review) => {
      if (ratedStars[review.rating] === undefined) {
        ratedStars[review.rating] = 1;
      } else {
        ratedStars[review.rating]++;
      }
    });

    if (ratedStars[star] === undefined) {
      console.log(`There are no reviews with ${star} stars`);
      clickedEmptyStars = this.state.clickedEmptyStars.slice();

      if (clickedEmptyStars.indexOf(star) < 0) {
        clickedEmptyStars.push(star);
        this.setState({ clickedEmptyStars }, () => {
          document.getElementById(
            "filterRatingEmptyMessage"
          ).innerHTML = `There are no reviews with ${star} stars`;
        });
      } else {
        const indexOfStar = clickedEmptyStars.indexOf(star);
        clickedEmptyStars.splice(indexOfStar, 1);
        this.setState({ clickedEmptyStars }, () => {
          document.getElementById("filterRatingEmptyMessage").innerHTML = "";
        });
      }
      return;
    }

    if (this.state.clickedStars.length) {
      currentStars = this.state.clickedStars.slice();

      if (currentStars.indexOf(star) < 0) {
        currentStars.push(star);
        filteredReviews = this.state.reviews.slice();
        reviews.forEach((review) => {
          if (review.rating === star) {
            filteredReviews.push(review);
          }
        });

        document.getElementById(
          "filterRatingMessage"
        ).innerHTML = `Current star rating filters: ${currentStars.join(", ")}`;
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
        if (!currentStars.length) {
          document.getElementById("filterRatingMessage").innerHTML = "";
        } else {
          document.getElementById(
            "filterRatingMessage"
          ).innerHTML = `Current star rating filters: ${currentStars.join(
            ", "
          )}`;
        }
      }

      if (!filteredReviews.length) {
        this.setState({ reviews: null, clickedStars: null }, () => {
          this.setState({
            reviews: this.props.reviews,
            clickedStars: currentStars,
          });
        });
      }
      this.setState({ reviews: filteredReviews, clickedStars: currentStars });
    } else if (!this.state.clickedStars.length) {
      currentStars = [];
      currentStars.push(star);
      reviews.forEach((review) => {
        if (review.rating === star) {
          filteredReviews.push(review);
        }
      });
      document.getElementById(
        "filterRatingMessage"
      ).innerHTML = `Current star rating filters: ${currentStars.join(", ")}`;
      this.setState({
        reviews: filteredReviews,
        clickedStars: currentStars,
        filterRatingMessage: `Current star rating filters: ${currentStars.join(
          ", "
        )}`,
      });
    }
  }

  searchReviewFunc(e) {
    console.log(e)
    const rawReviews = this.props.reviews;
    const currentReviews = this.state.slice();
    const searchedReviews = [];

    if (e.length >= 3) {
      currentReviews.forEach(currentReview => {
        if (currentReview.summary.includes(e) || currentReview.body.includes(e)) {
          searchedReviews.push(currentReview);
        }
      });

      if (!seachedReviews.length) {

      }
    }
  }

  render() {
    // console.log('productinfo', this.props.productInfo)
    if (this.state.reviews !== null) {
      return (
        <div onClick={(e) => {
          let timeOfClick = new Date().toLocaleString('en-US', {
            hour12: false,
          });
          let element = `Selectors: {LocalName: ${e.target.localName}, ClassName: ${e.target.className}, innerHTML: ${e.target.innerHTML}}`;
          this.props.userTracker(element, 'Ratings and Reviews', timeOfClick);
        }}>

          <div className="content-container" id='listOfReviews'>
            <div className="row">
              <div className="left-panel">
                <RatingSummary
                  metaData={this.state.metaData}
                  rating={this.state.rating}
                  totalNumberOfRatings={this.state.totalNumberOfRatings}
                  filterRatingFunc={this.filterRatingFunc}
                  clickedStars={this.state.clickedStars}
                  filterRatingMessage={this.state.filterRatingMessage}
                />
                {/* <RatingSummary metaData={sampleMeta} rating={sampleRating} totalNumberOfRatings={sampleTotalNumberOfRatings} filterRating={this.filterRating}/> */}
              </div>
              <div className="right-panel">
                <ReviewList reviewData={this.state.reviewData} reviews={this.state.reviews} productInfo={this.props.productInfo} productName={this.props.productInfo.name} productId={this.props.productInfo.id} metaData={this.props.metaData} getAllReviewsFunc={this.props.getAllReviewsFunc} searchReviewFunc={this.searchReviewFunc}/>
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

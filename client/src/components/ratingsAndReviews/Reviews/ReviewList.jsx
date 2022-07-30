import React from 'react';
import ReviewItem from './ReviewItem.jsx';
import MoreReviews from './MoreReviews.jsx';
import AddFirstReview from './AddFirstReview.jsx';
import AddAnotherReview from './AddAnotherReview.jsx';
import ReviewsHeading from './ReviewsHeading.jsx';
import ReviewModal from './ReviewModal.jsx';
const axios = require('axios');

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewsShowing: null,
      endReviewIndex: 2,
      showReviewModal: false,
      relevanceSorted: false,
      helpfulSorted: false,
      newestSorted: false,
    };
    this.showMoreReviewsFunc = this.showMoreReviewsFunc.bind(this);
    this.sortByHelpfulnessFunc = this.sortByHelpfulnessFunc.bind(this);
    this.sortByNewestFunc = this.sortByNewestFunc.bind(this);
    this.sortByRelevanceFunc = this.sortByRelevanceFunc.bind(this);
    this.showReviewModalFunc = this.showReviewModalFunc.bind(this);
    this.closeReviewModalFunc = this.closeReviewModalFunc.bind(this);
    // this.getAllNewReviewsFunc = this.getAllNewReviewsFunc.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        reviews: this.props.reviews,
        reviewsShowing: this.props.reviews.slice(0, this.state.endReviewIndex),
        relevanceSorted: true,
      },
      () => {
        this.sortByRelevanceFunc();
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.reviews.length &&
      prevProps.reviews.length !== this.props.reviews.length
    ) {
      this.setState({ reviews: this.props.reviews }, () => {
        if (this.state.relevanceSorted) {
          this.sortByRelevanceFunc();
        } else if (this.state.helpfulSorted) {
          this.sortByHelpfulnessFunc();
        } else if (this.state.newestSorted) {
          this.sortByNewestFunc();
        }
      });
    }
  }

  showMoreReviewsFunc() {
    var reviewsShowing;
    if (this.state.endReviewIndex >= this.state.reviews.length) {
      reviewsShowing = this.state.reviews.slice();
      this.setState({ reviewsShowing });
    } else {
      this.setState({ endReviewIndex: this.state.endReviewIndex + 2 }, () => {
        reviewsShowing = this.state.reviews.slice(0, this.state.endReviewIndex);
        this.setState({ reviewsShowing });
      });
    }
  }

  sortByHelpfulnessFunc() {
    this.setState({ relevanceSorted: false });
    this.setState({ newestSorted: false });

    const reviews = this.props.reviews.slice();
    const sortedReviews = [];

    const innerFunc = (array) => {
      if (!array.length) {
        return;
      }
      let largest = array[0];
      array.forEach((review) => {
        if (review.helpfulness >= largest.helpfulness) {
          largest = review;
        }
      });

      sortedReviews.push(largest);
      const largestIndex = reviews.indexOf(largest);
      reviews.splice(largestIndex, 1);

      innerFunc(array);
    };

    innerFunc(reviews);

    this.setState({ reviews: sortedReviews, helpfulSorted: true }, () => {
      var reviewsShowing;

      if (this.state.reviews.length >= 2) {
        reviewsShowing = this.state.reviews.slice(0, 2);
      } else {
        reviewsShowing = this.state.reviews.slice();
      }
      this.setState({ reviewsShowing });
    });
  }

  sortByNewestFunc() {
    this.setState({ relevanceSorted: false });
    this.setState({ helpfulSorted: false });
    const reviews = this.state.reviews.slice();

    reviews.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    this.setState({ reviews, newestSorted: true }, () => {
      var reviewsShowing;

      if (this.state.reviews.length >= 2) {
        reviewsShowing = this.state.reviews.slice(0, 2);
      } else {
        reviewsShowing = this.state.reviews.slice();
      }
      this.setState({ reviewsShowing });
    });
  }

  sortByRelevanceFunc() {
    this.setState({ newestSorted: false });
    this.setState({ helpfulSorted: false });

    const reviews = this.state.reviews.slice();
    const yearsSplit = {};

    reviews.forEach((review) => {
      const currentYear = review.date.substring(0, 4);
      if (yearsSplit[currentYear] === undefined) {
        yearsSplit[currentYear] = [];
        yearsSplit[currentYear].push(review);
      } else {
        yearsSplit[currentYear].push(review);
      }
    });

    const yearsInString = Object.keys(yearsSplit);
    const yearsInNumber = yearsInString.map((year) => {
      return (year = parseInt(year));
    });

    yearsInNumber.sort((a, b) => {
      return b - a;
    });

    yearsInNumber.forEach((year) => {
      const reviewsByYear = yearsSplit[year.toString()];
      reviewsByYear.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      });
    });

    let sortedReviews = [];

    yearsInNumber.forEach((year) => {
      const yearInString = year.toString();
      sortedReviews = sortedReviews.concat(yearsSplit[yearInString]);
    });

    this.setState({ reviews: sortedReviews, relevanceSorted: true }, () => {
      var reviewsShowing;

      if (this.state.reviews.length >= 2) {
        reviewsShowing = this.state.reviews.slice(0, 2);
      } else {
        reviewsShowing = this.state.reviews.slice();
      }
      this.setState({ reviewsShowing });
    });
  }

  showReviewModalFunc() {
    this.setState({ showReviewModal: true });
  }

  closeReviewModalFunc() {
    this.setState({ showReviewModal: false });
  }

  render() {
    // console.log('this.props in reviewlist', this.props)
    const sameLineStyle = {
      display: "inline-block",
    };

    let addFirstReviewButton;
    let addAnotherReviewButton;
    let reviewsHeading;
    let reviewModalComponent;

    if (this.state.showReviewModal) {
      reviewModalComponent = <ReviewModal showReviewModal={this.state.showReviewModal} productInfo={this.props.productInfo} closeReviewModalFunc={this.closeReviewModalFunc} productInfo={this.props.productInfo} metaData={this.props.metaData} getAllReviewsFunc={this.props.getAllReviewsFunc} productName={this.props.productName}/>;
    } else {
      reviewModalComponent = null;
    }

    if (!this.state.reviews.length) {
      reviewsHeading = "There are no reviews yet.";
      addFirstReviewButton = (
        <AddFirstReview showReviewModalFunc={this.showReviewModalFunc} />
      );
    } else {
      reviewsHeading = (
        <ReviewsHeading
          reviews={this.state.reviews}
          sortByHelpfulnessFunc={this.sortByHelpfulnessFunc}
          sortByNewestFunc={this.sortByNewestFunc}
          sortByRelevanceFunc={this.sortByRelevanceFunc}
        />
      );
      addAnotherReviewButton = (
        <AddAnotherReview showReviewModalFunc={this.showReviewModalFunc} />
      );
    }

    if (this.state.reviews && this.state.reviewsShowing) {
      const reviews = this.state.reviews;
      const lastReview = reviews[reviews.length - 1];
      const lastShowingReview =
        this.state.reviewsShowing[this.state.reviewsShowing.length - 1];
      let moreReviewsButton;
      if (
        reviews.length > 2 &&
        lastReview["review_id"] !== lastShowingReview["review_id"]
      ) {
        moreReviewsButton = (
          <MoreReviews showMoreReviewsFunc={this.showMoreReviewsFunc} />
        );
      }

      return (
        <div>
          Search for reviews: <input type="text" onChange={(e) => { this.props.searchReviewFunc(e.target.value); }}></input>
          {reviewsHeading}
          {addFirstReviewButton}
          {reviewModalComponent}
          <div className="scrollable">
            {this.state.reviewsShowing.map((review) => {
              return <ReviewItem review={review} key={review["review_id"]} />;
            })}
            <br></br>
            <div style={sameLineStyle}>{moreReviewsButton}</div>
            <div style={sameLineStyle}>{addAnotherReviewButton}</div>
          </div>
        </div>
      );
    }
  }
}

export default ReviewList;

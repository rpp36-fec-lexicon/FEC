import React from 'react';
import ReviewItem from './ReviewItem.jsx';
import MoreReviews from './MoreReviews.jsx';
import AddFirstReview from './AddFirstReview.jsx';
import AddAnotherReview from './AddAnotherReview.jsx';
import ReviewsHeading from './ReviewsHeading.jsx';
import ReviewModal from './ReviewModal.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewsShowing: null,
      endReviewIndex: 4,
      showReviewModal: false
    };
    this.showMoreReviewsFunc = this.showMoreReviewsFunc.bind(this);
    this.sortByHelpfulnessFunc = this.sortByHelpfulnessFunc.bind(this);
    this.sortByNewestFunc = this.sortByNewestFunc.bind(this);
    this.sortByRelevanceFunc = this.sortByRelevanceFunc.bind(this);
    this.showReviewModalFunc = this.showReviewModalFunc.bind(this);
    this.closeReviewModalFunc = this.closeReviewModalFunc.bind(this);
  }

  componentDidMount() {

    this.setState({reviews: this.props.reviews}, () => {
      this.sortByRelevanceFunc();
    });

  }

  reviewsNotSameRating(reviews) {
    const firstReviewRating = reviews[0].rating;
    for (var i = 1; i < reviews.length; i++) {
      if (reviews[i].rating !== firstReviewRating) {
        return true;
      }
    }

    return false;
  }

  componentDidUpdate(prevProps) {

    if (this.props.reviews.length !== this.state.reviews.length) {
      console.log('update, props reviews', this.props.reviews)
      console.log('update, state reviews', this.state.reviews)
      this.setState({reviews: this.props.reviews}, () => {
        var reviewsShowing;

        if (this.state.reviews.length >= 2) {
          reviewsShowing = this.state.reviews.slice(0, 2);
        } else {
          reviewsShowing = this.state.reviews.slice();
        }
        this.setState({reviewsShowing});
      });
    }
  }

  showMoreReviewsFunc() {
    var reviewsShowing;
    if (this.state.endReviewIndex >= this.state.reviews.length) {
      reviewsShowing = this.state.reviews.slice();
      this.state.endReviewIndex += 2;
    } else {
      reviewsShowing = this.state.reviews.slice(0, this.state.endReviewIndex);
      this.state.endReviewIndex += 2;
    }

    this.setState({reviewsShowing});
  }

  sortByHelpfulnessFunc() {
    const reviews = (this.state.reviews).slice();
    const sortedReviews = [];

    const innerFunc = (array) => {
      if (!array.length) {
        return;
      }
      let largest = array[0];
      array.forEach(review => {
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

    this.setState({reviews: sortedReviews}, () => {
      var reviewsShowing;

      if (this.state.reviews.length >= 2) {
        reviewsShowing = this.state.reviews.slice(0, 2);
      } else {
        reviewsShowing = this.state.reviews.slice();
      }
      this.setState({reviewsShowing});
    });
  }

  sortByNewestFunc() {
    const reviews = this.state.reviews.slice();

    reviews.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    this.setState({reviews}, () => {
      var reviewsShowing;

      if (this.state.reviews.length >= 2) {
        reviewsShowing = this.state.reviews.slice(0, 2);
      } else {
        reviewsShowing = this.state.reviews.slice();
      }
      this.setState({reviewsShowing});
    });
  }

  sortByRelevanceFunc() {
    const reviews = this.state.reviews.slice();
    const yearsSplit = {};

    reviews.forEach(review => {
      const currentYear = review.date.substring(0, 4);
      if (yearsSplit[currentYear] === undefined) {
        yearsSplit[currentYear] = [];
        yearsSplit[currentYear].push(review);
      } else {
        yearsSplit[currentYear].push(review);
      }
    });

    const yearsInString = Object.keys(yearsSplit);
    const yearsInNumber = yearsInString.map(year => {
      return year = parseInt(year);
    });

    yearsInNumber.sort((a, b) => {
      return b - a;
    });

    yearsInNumber.forEach(year => {
      const reviewsByYear = yearsSplit[year.toString()];
      reviewsByYear.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      });
    });

    let sortedReviews = [];

    yearsInNumber.forEach(year => {
      const yearInString = year.toString();
      sortedReviews = sortedReviews.concat(yearsSplit[yearInString]);
    });

    this.setState({reviews: sortedReviews}, () => {
      var reviewsShowing;

      if (this.state.reviews.length >= 2) {
        reviewsShowing = this.state.reviews.slice(0, 2);
      } else {
        reviewsShowing = this.state.reviews.slice();
      }
      this.setState({reviewsShowing});
    });
  }

  showReviewModalFunc() {
    this.setState({showReviewModal: true});
  }

  closeReviewModalFunc() {
    this.setState({showReviewModal: false});
  }

  render() {
    const sameLineStyle = {
      display: 'inline-block'
    };

    let addFirstReviewButton;
    let addAnotherReviewButton;
    let reviewsHeading;

    let reviewModalComponent;

    if (this.state.showReviewModal) {
      reviewModalComponent = <ReviewModal showReviewModal={this.state.showReviewModal} productInfo={this.props.productInfo} closeReviewModalFunc={this.closeReviewModalFunc} />;
    }

    if (!this.state.showReviewModal) {
      reviewModalComponent = null;
    }

    if (!this.state.reviews.length) {
      reviewsHeading = 'There are no reviews yet.';
      addFirstReviewButton = <AddFirstReview showReviewModalFunc={this.showReviewModalFunc}/>;
    } else {
      reviewsHeading = <ReviewsHeading reviews={this.state.reviews} sortByHelpfulnessFunc={this.sortByHelpfulnessFunc} sortByNewestFunc={this.sortByNewestFunc} sortByRelevanceFunc={this.sortByRelevanceFunc}/>;
      addAnotherReviewButton = <AddAnotherReview showReviewModalFunc={this.showReviewModalFunc}/>;
    }

    if (this.state.reviews && this.state.reviewsShowing) {
      const reviews = this.state.reviews;
      const lastReview = reviews[reviews.length - 1];
      const lastShowingReview = this.state.reviewsShowing[this.state.reviewsShowing.length - 1];
      let moreReviewsButton;
      if (reviews.length > 2 && lastReview['review_id'] !== lastShowingReview['review_id']) {
        moreReviewsButton = <MoreReviews showMoreReviewsFunc={this.showMoreReviewsFunc}/>;
      }

      return (
        <div>
          {reviewsHeading}
          <div>{addFirstReviewButton}</div>
          {reviewModalComponent}
          <div className="scrollable">
            {this.state.reviewsShowing.map(review => {
              return <ReviewItem review={review} key={review['review_id']}/>;
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


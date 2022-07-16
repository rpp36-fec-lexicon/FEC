import React from 'react';
import ReviewItem from './ReviewItem.jsx';
import MoreReviews from './MoreReviews.jsx';
import AddFirstReview from './AddFirstReview.jsx';
import AddAnotherReview from './AddAnotherReview.jsx';
import ReviewsHeading from './ReviewsHeading.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewsShowing: null,
      startReviewIndex: 0,
      endReviewIndex: 4,
    };
    this.showMoreReviewsFunc = this.showMoreReviewsFunc.bind(this);
    this.sortByHelpfulnessFunc = this.sortByHelpfulnessFunc.bind(this);
    this.sortByNewestFunc = this.sortByNewestFunc.bind(this);
    this.sortByRelevanceFunc = this.sortByRelevanceFunc.bind(this);
  }

  componentDidMount() {
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

  showMoreReviewsFunc() {
    var reviewsShowing;
    if (this.state.endReviewIndex >= this.state.reviews.length) {
      reviewsShowing = this.state.reviews.slice();
      this.state.endReviewIndex += 2;
    } else {
      reviewsShowing = this.state.reviews.slice(this.state.startReviewIndex, this.state.endReviewIndex);
      this.state.endReviewIndex += 2;
    }

    this.setState({reviewsShowing});
  }

  sortByHelpfulnessFunc() {
    console.log('helpfulness sort');
    const reviews = (this.state.reviews).slice();
    const sortedReviews = [];

    const innerFunc = (array) => {
      if (!array.length) {
        return;
      }
      const largest = array[0];
      for (var i = 0; i < array.length; i++) {
        if (array[i].helpfulness >= largest) {
          largest = array[i];
        }
      }

      sortedReviews.push(largest);
    };

    innerFunc(reviews);

    if (reviews.length === sortedReviews.length) {
      this.setState({reviews: sortedReviews}, () => { console.log('this.state.reviews', this.state.reviews); });
    }

  }

  sortByNewestFunc() {

  }

  sortByRelevanceFunc() {

  }

  render() {

    const sameLineStyle = {
      display: 'inline-block'
    };

    let addFirstReviewButton;
    let addAnotherReviewButton;
    let reviewsHeading;
    if (!this.state.reviews.length) {
      reviewsHeading = 'There are no reviews yet.';
      addFirstReviewButton = <AddFirstReview />;
    } else {
      reviewsHeading = <ReviewsHeading reviews={this.props.reviews} sortByHelpfulnessFunc={this.sortByHelpfulnessFunc} sortByNewestFunc={this.sortByNewestFunc} sortByRelevanceFunc={this.sortByRelevanceFunc}/>;
      addAnotherReviewButton = <AddAnotherReview />;
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


import React from 'react';
import ReviewItem from './ReviewItem.jsx';
import MoreReviews from './MoreReviews.jsx';
import AddFirstReview from './AddFirstReview.jsx';
import AddAnotherReview from './AddAnotherReview.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsShowing: null,
      startReviewIndex: 0,
      endReviewIndex: 4
    };
    this.showMoreReviewsFunc = this.showMoreReviewsFunc.bind(this);
  }

  componentDidMount() {
    var reviewsShowing;
    if (this.props.reviews.length >= 2) {
      reviewsShowing = this.props.reviews.slice(0, 2);
    } else {
      reviewsShowing = this.props.reviews.slice();
    }

    this.setState({reviewsShowing});
  }

  showMoreReviewsFunc() {
    var reviewsShowing;
    if (this.state.endReviewIndex >= this.props.reviews.length) {
      reviewsShowing = this.props.reviews.slice();
      this.state.endReviewIndex += 2;
    } else {
      reviewsShowing = this.props.reviews.slice(this.state.startReviewIndex, this.state.endReviewIndex);
      this.state.endReviewIndex += 2;
    }

    this.setState({reviewsShowing});
  }

  render() {

    const sameLineStyle = {
      display: 'inline-block'
    };

    let addFirstReviewButton;
    let addAnotherReviewButton;
    if (!this.props.reviews.length) {
      addFirstReviewButton = <AddFirstReview />;
    } else {
      addAnotherReviewButton = <AddAnotherReview />;
    }

    if (this.props.reviews && this.state.reviewsShowing) {
      const reviews = this.props.reviews;
      const lastReview = reviews[reviews.length - 1];
      const lastShowingReview = this.state.reviewsShowing[this.state.reviewsShowing.length - 1];
      let moreReviewsButton;
      if (reviews.length > 2 && lastReview['review_id'] !== lastShowingReview['review_id']) {
        moreReviewsButton = <MoreReviews showMoreReviewsFunc={this.showMoreReviewsFunc}/>;
      }

      return (
        <div>
          <div>
            {reviews.length} reviews, sorted by
            <select onClick={() => { props.sortReviewsFunc(); }}>
              <option id="helpful">Helpful</option>
              <option id="newest">Newest</option>
              <option id="relevance">Relevance</option>
            </select>
          </div>
          <div>{addFirstReviewButton}</div>
          <div className="scrollable">
            {this.state.reviewsShowing.map(review => {
              return <ReviewItem review={review} key={review['review_id']}/>;
            })}
            <br></br>
            <div style={sameLineStyle}>{moreReviewsButton}</div>
            <div style={sameLineStyle}>{addAnotherReviewButton}</div>
          </div>

          {/* <div style={sameLineStyle}>{moreReviewsButton}</div>
          <div style={sameLineStyle}>{addAnotherReviewButton}</div> */}
          {/* <button style={sameLineStyle} id="addReview">ADD A REVIEW  +</button> */}
        </div>
      );
    }
  }
}

export default ReviewList;


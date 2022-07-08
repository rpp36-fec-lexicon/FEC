import React from 'react';
import ReviewItem from './ReviewItem.jsx';
import MoreReviews from './MoreReviews.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsShowing: null,
      startReviewIndex: 0,
      endReviewIndex: 4
    };
    this.moreReviewsFunc = this.moreReviewsFunc.bind(this);
  }

  componentDidMount() {
    var reviewsShowing;
    if (this.props.reviews.length >= 2) {
      reviewsShowing = this.props.reviews.slice(0, 2);
      this.setState({reviewsShowing});
    }
  }

  moreReviewsFunc() {
    var reviewsShowing;
    if (this.state.endReviewIndex >= this.props.reviews.length) {
      reviewsShowing = this.props.reviews.slice();
      this.state.endReviewIndex += 2;
    } else {
      reviewsShowing = this.props.reviews.slice(this.state.startReviewIndex, this.state.endReviewIndex);
      this.state.endReviewIndex += 2;
    }

    this.setState({reviewsShowing}, () => { console.log(this.state.endReviewIndex); });
  }

  render() {

    const sameLineStyle = {
      display: 'inline-block'
    };

    if (this.props.reviews && this.state.reviewsShowing) {
      const reviews = this.props.reviews;
      const lastReview = reviews[reviews.length - 1];
      const lastShowingReview = this.state.reviewsShowing[this.state.reviewsShowing.length - 1];
      let moreReviewsButton;
      if (reviews.length > 2 && lastReview['review_id'] !== lastShowingReview['review_id']) {
        moreReviewsButton = <MoreReviews moreReviewsFunc={this.moreReviewsFunc}/>;
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

          {this.state.reviewsShowing.map(review => {
            return <ReviewItem review={review} key={review['review_id']}/>;
          })}
          <br></br>
          <div style={sameLineStyle}>{moreReviewsButton}</div>
          <button style={sameLineStyle} id="addReview">ADD A REVIEW  +</button>
        </div>
      );
    }
  }
}

export default ReviewList;


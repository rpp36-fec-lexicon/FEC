import React from 'react';
import ReviewList from './Reviews/ReviewList.jsx';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
    this.sortReviews = this.sortReviews.bind(this);
  }

  getAllReviews() {

  }

  sortReviews(term) {

  }

  render() {
    return (
      <div>
        {/* <Ratings /> */}
        <ReviewList reviews={this.state.reviews} sortReviews={this.sortReviews}/>
      </div>
    );
  }
}

export default RatingsAndReviews;


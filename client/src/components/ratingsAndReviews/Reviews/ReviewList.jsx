import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewList = (props) => {
  const reviews = props.reviews;

  return (
    <div>
      <div>
        {reviews.length} reviews, sorted by
        <select onClick={() => { props.sortReviewsFunc() }}>
          <option id="helpful">Helpful</option>
          <option id="newest">Newest</option>
          <option id="relevance">Relevance</option>
        </select>
      </div>
      <ReviewItem />
      <button id="moreReviews">MORE REVIEWS</button>
      <button id="addReview">ADD A REVIEW  +</button>
    </div>
  );
}

export default ReviewList;
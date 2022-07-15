import React from 'react';

const ReviewsHeading = (props) => {
  return (
    <div>
      {props.reviews.length} reviews, sorted by
      <select>
        <option id="helpful" onClick={() => { props.sortByHelpfulFunc(); }}>Helpful</option>
        <option id="newest">Newest</option>
        <option id="relevance">Relevance</option>
      </select>
    </div>
  );
};

export default ReviewsHeading;


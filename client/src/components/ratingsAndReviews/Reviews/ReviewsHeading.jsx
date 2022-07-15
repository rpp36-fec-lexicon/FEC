import React from 'react';

const ReviewsHeading = (props) => {
  return (
    <div>
      {props.reviews.length} reviews, sorted by
      <select>
        <option id="helpful" onClick={() => { props.sortByHelpfulnessFunc(); }}>Helpful</option>
        <option id="newest" onClick={() => { props.sortByNewestFunc(); }}>Newest</option>
        <option id="relevance" onClick={() => { props.sortByRelevanceFunc(); }}>Relevance</option>
      </select>
    </div>
  );
};

export default ReviewsHeading;


import React from 'react';

const ReviewsHeading = (props) => {
  return (
    <div>
      {props.reviews.length} reviews, sorted by
      <select>
        <option id="relevance" onClick={() => { props.sortByRelevanceFunc(); }}>Relevance</option>
        <option id="helpful" onClick={() => { props.sortByHelpfulnessFunc(); }}>Helpful</option>

        <option id="newest" onClick={() => { props.sortByNewestFunc(); }}>Newest</option>
      </select>
      <button id="helpful" onClick={() => { props.sortByHelpfulnessFunc(); }}>helpful sort</button>
    </div>
  );
};

export default ReviewsHeading;


import React from 'react';

const ReviewsHeading = (props) => {

  const sortFunc = (value) => {
    if (value === 'helpful') {
      props.sortByHelpfulnessFunc();
    } else if (value === 'relevance') {
      props.sortByRelevanceFunc();
    } else if (value === 'newest') {
      props.sortByNewestFunc();
    }
  };

  return (
    <div>
      {props.reviews.length} reviews, sorted by
      <select id="sort" onChange={(e) => { sortFunc(e.target.value); }}>
        <option value="relevance">Relevance</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};

export default ReviewsHeading;


import React from 'react';

const ReviewsHeading = (props) => {

  const sameLineStyle = {
    display: 'flex'
  };

  const headingStyle = {
    fontSize: '18px',
    fontWeight: 'bold'
  };

  const textStyle = {
    color: 'black',
    cursor: 'pointer'
  };

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
    <div style={sameLineStyle}>
      <div style={headingStyle}>{props.reviews.length} reviews, sorted by</div>
      <select style={textStyle} id="sort" onChange={(e) => { sortFunc(e.target.value); }}>
        <option value="relevance">Relevance</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};

export default ReviewsHeading;


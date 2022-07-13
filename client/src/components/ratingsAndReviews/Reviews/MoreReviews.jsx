import React from 'react';

const MoreReviews = (props) => {
  return (
    <div>
      <button onClick={() => { props.showMoreReviewsFunc(); }}>MORE REVIEWS</button>
    </div>
  );
};

export default MoreReviews;


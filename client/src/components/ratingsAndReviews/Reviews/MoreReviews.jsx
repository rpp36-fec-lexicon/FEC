import React from 'react';

const MoreReviews = (props) => {
  return (
    <div>
      <button onClick={() => { props.moreReviewsFunc(); }}>MORE REVIEWS</button>
    </div>
  );
};

export default MoreReviews;
import React from 'react';

const Recommendation = (props) => {
  return (
    <div>
      <div>{props.recommendedPercent}% of reviews recommend this product</div>
    </div>
  );
};

export default Recommendation;


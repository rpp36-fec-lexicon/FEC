import React from 'react';

const FilterRatingMessage = (props) => {
  const clickedStarsStr = props.clickedStars.join(', ');
  return (
    <div>
      Current star rating filters: {clickedStarsStr}
    </div>
  );
};

export default FilterRatingMessage;


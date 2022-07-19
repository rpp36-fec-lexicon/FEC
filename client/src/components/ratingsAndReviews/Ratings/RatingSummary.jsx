import React from 'react';

import RatingDetails from './RatingDetails.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';


const RatingSummary = (props) => {
  console.log('props in rating summary', props);

  const recommended = props.metaData.recommended;

  let recommendedPercent;
  let recommendedTrue;
  let recommendedFalse;
  let total;

  recommendedTrue = parseInt(props.metaData.recommended.true);
  recommendedFalse = parseInt(props.metaData.recommended.false);
  total = recommendedTrue + recommendedFalse;
  recommendedPercent = Math.floor((recommendedTrue / total) * 100);

  let ratingDetails;
  let productBreakdown;
  if (!props.rating) {
    ratingDetails = 'There are no ratings yet.';
  } else {
    ratingDetails = <RatingDetails
      rating={props.rating}
      recommendedPercent={recommendedPercent}
      ratings={props.metaData.ratings}
      totalNumberOfRatings={props.totalNumberOfRatings}
      filterRating={props.filterRating}
    />;
    productBreakdown = <ProductBreakdown characteristics={props.metaData.characteristics}/>;
  }

  return (
    <div>
      {ratingDetails}
      <br></br>
      <br></br>
      <br></br>
      {productBreakdown}
    </div>
  );
};

export default RatingSummary;



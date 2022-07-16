import React from 'react';
import Stars from 'react-stars-display';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';


const RatingDetails = (props) => {
  const sameLineStyle = {
    display: 'inline-block'
  };

  return (
    <div>
      <h1 style={sameLineStyle}>{props.rating}</h1>
      <Stars style={sameLineStyle} stars={props.rating}/>
      <div>{props.recommendedPercent}% of reviews recommend this product</div>
      <RatingBreakdown ratings={props.ratings} totalNumberOfRatings={props.totalNumberOfRatings} filterRating={props.filterRating}/>
      <ProductBreakdown />
    </div>
  );
};

export default RatingDetails;


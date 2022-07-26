import React from 'react';
import Stars from 'react-stars-display';
import RatingBreakdown from './RatingBreakdown.jsx';


const RatingDetails = (props) => {
  const sameLineStyle = {
    display: 'inline-block'
  };

  const emptyMessageStyle = {
    color: 'red'
  };

  return (
    <div>
      <h1 style={sameLineStyle}>{props.rating}</h1>
      <Stars style={sameLineStyle} stars={props.rating}/>
      <div>{props.recommendedPercent}% of reviews recommend this product</div>
      <RatingBreakdown ratings={props.ratings} totalNumberOfRatings={props.totalNumberOfRatings} filterRatingFunc={props.filterRatingFunc}/>
      <div id="filterRatingMessage"></div>
      <div style={emptyMessageStyle} id="filterRatingEmptyMessage"></div>
    </div>
  );

};

export default RatingDetails;


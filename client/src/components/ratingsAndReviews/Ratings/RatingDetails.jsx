import React from 'react';
import Stars from 'react-stars-display';
import RatingBreakdown from './RatingBreakdown.jsx';


const RatingDetails = (props) => {
  console.log('props in rating details', props)
  const sameLineStyle = {
    display: 'inline-block'
  };

  // let filterRatingMessage;
  // if (props.clickedStars !== null || props.clickedEmptyStars !== null) {
  //   if (props.clickedStars.length) {
  //     filterRatingMessage = <FilterRatingMessage clickedStars={props.clickedStars} filterRatingMessage={props.filterRatingMessage}/>;
  //   } else {
  //     filterRatingMessage = '';
  //   }
  // }

  return (
    <div>
      <h1 style={sameLineStyle}>{props.rating}</h1>
      <Stars style={sameLineStyle} stars={props.rating}/>
      <div>{props.recommendedPercent}% of reviews recommend this product</div>
      <RatingBreakdown ratings={props.ratings} totalNumberOfRatings={props.totalNumberOfRatings} filterRatingFunc={props.filterRatingFunc}/>
      <div id="filterRatingMessage"></div>
      <div id="filterRatingEmptyMessage"></div>
    </div>
  );

};

export default RatingDetails;


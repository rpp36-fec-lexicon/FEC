import React from 'react';
import Stars from 'react-stars-display';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import Recommendation from './Recommendation.jsx';

const RatingSummary = (props) => {
  // console.log('props in rating summary', props);

  const recommended = props.metaData.recommended;

  let recommendedPercent;
  let recommendedTrue;
  let recommendedFalse;
  let total;

  recommendedTrue = parseInt(props.metaData.recommended.true);
  recommendedFalse = parseInt(props.metaData.recommended.false);
  total = recommendedTrue + recommendedFalse;
  recommendedPercent = Math.floor((recommendedTrue / total) * 100);

  let recommendation;
  if (recommended.true === undefined) {
    recommendation = '';
  } else {
    recommendation = <Recommendation recommendedPercent={recommendedPercent}/>;
  }



  const sameLineStyle = {
    display: 'inline-block'
  };

  return (

    <div>
      <h1 style={sameLineStyle}>{props.rating}</h1>
      <Stars style={sameLineStyle} stars={props.rating}/>
      {/* <div>{recommendedPercent}% of reviews recommend this product</div> */}
      {recommendation}
      <RatingBreakdown ratings={props.metaData.ratings} totalNumberOfRatings={props.totalNumberOfRatings} filterRating={props.filterRating}/>
      <ProductBreakdown />
    </div>
  );
};

export default RatingSummary;



import React from 'react';
import Stars from 'react-stars-display';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const RatingSummary = (props) => {
  const data = props.metaData;
  const reviews = props.reviews;
  console.log('data', props.metaData);
  console.log('reviews', props.reviews);
  const recommended = data.recommended;
  let recommendedPercent;
  let recommendedTrue;
  let recommendedFalse;
  let total;

  if (data.recommended) {
    recommendedTrue = parseInt(data.recommended.true);
    recommendedFalse = parseInt(data.recommended.false);
    total = recommendedTrue + recommendedFalse;
    recommendedPercent = Math.floor((recommendedTrue/total) * 100);
  }

  const ratings = data.ratings;
  let totalNumberOfRatings = 0;
  let totalRatings = 0;
  let averageRating;

  if (data.ratings) {
    for (var key in ratings) {
      totalNumberOfRatings += parseInt(ratings[key]);
      totalRatings += (parseInt(key)*parseInt(ratings[key]));
    }

    averageRating = totalRatings/totalNumberOfRatings;
    averageRating = Math.round(10*averageRating)/10;
  }

  return (
    <div>
      <h2>RATINGS & REVIEWS</h2>
      <h1>{averageRating}</h1>
      <Stars stars={averageRating}/>
      <div>{recommendedPercent}% of reviews recommend this product</div>
      <RatingBreakdown ratings={ratings} totalNumberOfRatings={totalNumberOfRatings}/>
      <ProductBreakdown />
    </div>
  );
}

export default RatingSummary;



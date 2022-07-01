import React from 'react';
import Stars from 'react-stars-display';

const RatingSummary = (props) => {
  const data = props.metaData;
  const recommended = data.recommended;
  console.log('data', props.metaData);
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

  return (
    <div>
      {/* <Stars stars={}/> */}
      <div>{recommendedPercent}% of reviews recommend this product</div>
    </div>
  );
}

export default RatingSummary;

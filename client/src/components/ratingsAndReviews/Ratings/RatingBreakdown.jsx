import React from 'react';

const RatingBreakdown = (props) => {
  console.log('props.ratings in rating breakdown', props.ratings);
  console.log('props.totalNumOfratings in breakdown', props.totalNumberOfRatings);

  return (
    <div>
      <div>
        <label htmlFor="file">5 stars</label>
        <progress value={props.ratings['5']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['5']})
      </div>

      <div>
        <label htmlFor="file">4 stars</label>
        <progress value={props.ratings['4']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['4']})
      </div>

      <div>
        <label htmlFor="file">3 stars</label>
        <progress value={props.ratings['3']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['3']})
      </div>

      <div>
        <label htmlFor="file">2 stars</label>
        <progress value={props.ratings['2']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['2']})
      </div>

      <div>
        <label htmlFor="file">1 stars</label>
        <progress value={props.ratings['1']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['1']})
      </div>

    </div>
  );
};

export default RatingBreakdown;
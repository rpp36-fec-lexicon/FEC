import React from 'react';

const RatingBreakdown = (props) => {

  return (
    <div>
      <label htmlFor="file">5 stars</label>
      <progress value={props.ratings['5']} max={props.totalNumberOfRatings}></progress>
      <br></br>
      <label htmlFor="file">4 stars</label>
      <progress value={props.ratings['4']} max={props.totalNumberOfRatings}></progress>
      <br></br>
      <label htmlFor="file">3 stars</label>
      <progress value={props.ratings['3']} max={props.totalNumberOfRatings}></progress>
      <br></br>
      <label htmlFor="file">2 stars</label>
      <progress value={props.ratings['2']} max={props.totalNumberOfRatings}></progress>
      <br></br>
      <label htmlFor="file">1 stars</label>
      <progress value={props.ratings['1']} max={props.totalNumberOfRatings}></progress>
    </div>
  );
}

export default RatingBreakdown;
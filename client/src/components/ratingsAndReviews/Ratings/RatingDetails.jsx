import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import { FaStar, FaRegStar } from "react-icons/fa";


const RatingDetails = (props) => {
  const sameLineStyle = {
    display: 'inline-block'
  };

  const emptyMessageStyle = {
    color: 'red'
  };



  return (
    <div>
      <div >
        <h1 style={sameLineStyle}>{props.rating.toFixed(1)}</h1>&nbsp;&nbsp;
        {isNaN(props.rating) ? null : (
          <div className="starEmpty">
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <div
              className="starFilled"
              style={{
                width: `${Math.round(
                  (props.rating / 5) * 100
                )}%`,
              }}
            >
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        )}
      </div>
      <div>{props.recommendedPercent}% of reviews recommend this product</div>
      <RatingBreakdown ratings={props.ratings} totalNumberOfRatings={props.totalNumberOfRatings} filterRatingFunc={props.filterRatingFunc}/>
      <div id="filterRatingMessage"></div>
      <div style={emptyMessageStyle} id="filterRatingEmptyMessage"></div>
    </div>
  );

};

export default RatingDetails;


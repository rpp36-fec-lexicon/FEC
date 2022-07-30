import React from "react";

const RatingBreakdown = (props) => {
  const underlineStyle = {
    textDecoration: "underline",
    cursor: "pointer",
  };

  const pointerStyle = {
    cursor: "pointer",
    // borderRadius: "50%",
  };

  return (
    <div>
      {[5, 4, 3, 2, 1].map((starNumber) => {
        return (
          <div
            key={starNumber}
            id={starNumber}
            onClick={(e) => {
              e.preventDefault();
              props.filterRatingFunc(starNumber);
            }}
          >
            <label style={underlineStyle} htmlFor={starNumber + "stars"}>
              {starNumber} stars {"  "}
            </label>
            <progress
              style={pointerStyle}
              data-testid={starNumber + "stars"}
              id={starNumber + "stars"}
              value={props.ratings[starNumber]}
              max={props.totalNumberOfRatings}
            ></progress>
            ({props.ratings[starNumber]})
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;

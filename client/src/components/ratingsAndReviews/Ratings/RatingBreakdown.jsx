import React from 'react';

const RatingBreakdown = (props) => {

  const underlineStyle = {
    textDecoration: 'underline'
  };

  return (
    <div>
      <div id="5" onClick={() => { props.filterRating(document.getElementById('5').id); }}>
        <label style={underlineStyle} htmlFor="5stars">5 stars</label>
        <progress data-testid="5stars" id="5stars" value={props.ratings['5']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['5']})
      </div>

      <div id="4" onClick={() => { props.filterRating(document.getElementById('4').id); }}>
        <label style={underlineStyle} htmlFor="4stars">4 stars</label>
        <progress data-testid="4stars" id="4stars" value={props.ratings['4']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['4']})
      </div>

      <div id="3" onClick={() => { props.filterRating(document.getElementById('3').id); }}>
        <label style={underlineStyle} htmlFor="3stars">3 stars</label>
        <progress data-testid="3stars" id="3stars" value={props.ratings['3']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['3']})
      </div>

      <div id="2" onClick={() => { props.filterRating(document.getElementById('2').id); }}>
        <label style={underlineStyle} htmlFor="2stars">2 stars</label>
        <progress data-testid="2stars" id="2stars" value={props.ratings['2']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['2']})
      </div>

      <div id="1" onClick={() => { props.filterRating(document.getElementById('1').id); }}>
        <label style={underlineStyle} htmlFor="1stars">1 stars</label>
        <progress data-testid="1stars" id="1stars" value={props.ratings['1']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['1']})
      </div>

    </div>
  );
};

export default RatingBreakdown;

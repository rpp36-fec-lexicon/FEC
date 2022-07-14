import React from 'react';

const RatingBreakdown = (props) => {
  // console.log('props.ratings in rating breakdown', props.ratings);
  // console.log('props.totalNumOfratings in breakdown', props.totalNumberOfRatings);
  // console.log('props.filterRating in breakdown', props.filterRating);

  const underlineStyle = {
    textDecoration: 'underline'
  };

  return (
    <div>
      <div id="5" onClick={() => { props.filterRating(document.getElementById('5').id); }}>
        <label style={underlineStyle} htmlFor="file">5 stars</label>
        <progress value={props.ratings['5']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['5']})
      </div>

      <div id="4" onClick={() => { props.filterRating(document.getElementById('4').id); }}>
        <label style={underlineStyle} htmlFor="file">4 stars</label>
        <progress value={props.ratings['4']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['4']})
      </div>

      <div id="3" onClick={() => { props.filterRating(document.getElementById('3').id); }}>
        <label style={underlineStyle} htmlFor="file">3 stars</label>
        <progress value={props.ratings['3']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['3']})
      </div>

      <div id="2" onClick={() => { props.filterRating(document.getElementById('2').id); }}>
        <label style={underlineStyle} htmlFor="file">2 stars</label>
        <progress value={props.ratings['2']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['2']})
      </div>

      <div id="1" onClick={() => { props.filterRating(document.getElementById('1').id); }}>
        <label style={underlineStyle} htmlFor="file">1 stars</label>
        <progress value={props.ratings['1']} max={props.totalNumberOfRatings}></progress>
        ({props.ratings['1']})
      </div>

    </div>
  );
};

export default RatingBreakdown;
import React from 'react';

class RatingBreakdown extends React.Component {
  // console.log('props.ratings in rating breakdown', props.ratings);
  // console.log('props.totalNumOfratings in breakdown', props.totalNumberOfRatings);
  // console.log('props.filterRating in breakdown', props.filterRating);
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const underlineStyle = {
      textDecoration: 'underline'
    };

    return (
      <div>
        <div id="5" onClick={(e) => {
          e.preventDefault();
          this.props.filterRatingFunc(document.getElementById('5').id); }}>
          <label style={underlineStyle} htmlFor="5stars">5 stars</label>
          <progress data-testid="5stars" id="5stars" value={this.props.ratings['5']} max={this.props.totalNumberOfRatings}></progress>
          ({this.props.ratings['5']})
        </div>

        <div id="4" onClick={(e) => {
          e.preventDefault();
          this.props.filterRatingFunc(document.getElementById('4').id); }}>
          <label style={underlineStyle} htmlFor="4stars">4 stars</label>
          <progress data-testid="4stars" id="4stars" value={this.props.ratings['4']} max={this.props.totalNumberOfRatings}></progress>
          ({this.props.ratings['4']})
        </div>

        <div id="3" onClick={(e) => {
          e.preventDefault();
          this.props.filterRatingFunc(document.getElementById('3').id); }}>
          <label style={underlineStyle} htmlFor="3stars">3 stars</label>
          <progress data-testid="3stars" id="3stars" value={this.props.ratings['3']} max={this.props.totalNumberOfRatings}></progress>
          ({this.props.ratings['3']})
        </div>

        <div id="2" onClick={(e) => {
          e.preventDefault();
          this.props.filterRatingFunc(document.getElementById('2').id); }}>
          <label style={underlineStyle} htmlFor="2stars">2 stars</label>
          <progress data-testid="2stars" id="2stars" value={this.props.ratings['2']} max={this.props.totalNumberOfRatings}></progress>
          ({this.props.ratings['2']})
        </div>

        <div id="1" onClick={(e) => {
          e.preventDefault();
          this.props.filterRatingFunc(document.getElementById('1').id); }}>
          <label style={underlineStyle} htmlFor="1stars">1 stars</label>
          <progress data-testid="1stars" id="1stars" value={this.props.ratings['1']} max={this.props.totalNumberOfRatings}></progress>
          ({this.props.ratings['1']})
        </div>

      </div>
    );
  }

};

export default RatingBreakdown;

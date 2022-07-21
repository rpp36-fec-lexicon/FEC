import React from 'react';
import Stars from 'react-stars-display';
import RatingBreakdown from './RatingBreakdown.jsx';
import FilterRatingMessage from './FilterRatingMessage.jsx';


class RatingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStarFilters: []
    };
  }






  render() {
    const sameLineStyle = {
      display: 'inline-block'
    };

    let filterRatingMessage;
    if (this.props.clickedStars !== null) {
      if (this.props.clickedStars.length) {
        filterRatingMessage = <FilterRatingMessage clickedStars={this.props.clickedStars}/>;
      } else {
        filterRatingMessage = '';
      }
    }



    return (
      <div>
        <h1 style={sameLineStyle}>{this.props.rating}</h1>
        <Stars style={sameLineStyle} stars={this.props.rating}/>
        <div>{this.props.recommendedPercent}% of reviews recommend this product</div>
        <RatingBreakdown ratings={this.props.ratings} totalNumberOfRatings={this.props.totalNumberOfRatings} filterRatingFunc={this.props.filterRatingFunc}/>
        {filterRatingMessage}
      </div>
    );
  }
};

export default RatingDetails;


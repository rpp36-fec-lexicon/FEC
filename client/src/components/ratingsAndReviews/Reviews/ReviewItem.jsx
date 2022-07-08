import React from 'react';
// import Stars from 'react-stars-display';
import ShortReviewBody from './ShortReviewBody.jsx';
import LongReviewBody from './LongReviewBody.jsx';
import Recommend from './Recommend.jsx';
import Stars from './Stars.jsx';

class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulClick: 0,
      helpfulness: this.props.review.helpfulness
    };

  }

  increaseHelpfulnessFunc() {
    if (!this.state.helpfulClick) {
      this.setState({helpfulness: this.state.helpfulness + 1});
      this.state.helpfulClick += 1;
    }
  }

  render () {
    const review = this.props.review;
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const reviewMonth = parseInt(review.date.substring(5, 7));
    const monthIndex = reviewMonth - 1;
    const date = review.date.substring(8, 10);
    const year = review.date.substring(0, 4);
    let reviewBody;

    if (review.body.length < 250) {
      reviewBody = <ShortReviewBody reviewBody={review.body}/>
    } else {
      reviewBody = <LongReviewBody reviewBody={review.body}/>
    }

    let recommend;
    if (review.recommend) {
      recommend = <Recommend />;
    }

    const sameLineStyle = {
      display: 'inline-block'
    };

    const underlineStyle = {
      textDecoration: 'underline'
    };

    const sameLineAndUnderlineStyle = {
      display: 'inline-block',
      textDecoration: 'underline'
    };

    const sameLineAndToTheRightStyle = {
      display: 'inline-block',
      position: 'absolute',
      right: 180
    };

    const flexStyle = {
      display: 'flex',
      justifyContent: 'space-between'
    };

    return (
      <div>
        <br></br>
        <div style={flexStyle}>
          <Stars rating={review.rating}/>
          <div>{review['reviewer_name']}, {month[monthIndex]} {date}, {year}</div>
        </div>

        <h3 id="reviewSummary">{review.summary}</h3>
        {reviewBody}
        <br></br>
        {recommend}
        <br></br>
        <div style={sameLineStyle}>Helpful?</div>
        <div style={sameLineAndUnderlineStyle} onClick={() => { this.increaseHelpfulnessFunc(); }}>Yes</div>
        <div style={sameLineStyle}>({this.state.helpfulness})</div>
        <div style={sameLineStyle}>|</div>
        <div style={sameLineStyle}>Report</div>
        <br></br>
        <br></br>
        <hr></hr>
      </div>
    );
  }
}


export default ReviewItem;


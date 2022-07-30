import React from 'react';
import ShortReviewBody from './ShortReviewBody.jsx';
import LongReviewBody from './LongReviewBody.jsx';
import Recommend from './Recommend.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';
import SellerResponse from './SellerResponse.jsx';
import ReviewsHeading from './ReviewsHeading.jsx';
import { FaStar, FaRegStar } from "react-icons/fa";
const axios = require('axios');

class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulClick: 0,
      helpfulness: 0
    };
  }

  componentDidMount() {
    this.setState({helpfulness: this.props.review.helpfulness});
  }

  increaseHelpfulnessFunc() {

    if (!this.state.helpfulClick) {
      this.setState({helpfulness: this.state.helpfulness + 1, helpfulClick: this.state.helpfulClick + 1}, () => {
        const reviewId = this.props.review['review_id'];
        console.log('reviewid', reviewId)
        axios.put(`/reviews/${reviewId}/helpful`)
          .then(response => {
            console.log('helpfulness increased');
          })
          .catch(err => {
            console.log('cannot update helpfulness', err);
          });
      });


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
      reviewBody = <ShortReviewBody reviewBody={review.body}/>;
    } else {
      reviewBody = <LongReviewBody reviewBody={review.body}/>;
    }

    let recommend;
    if (review.recommend) {
      recommend = <Recommend />;
    }

    let reviewPhotos;
    if (review.photos.length) {
      reviewPhotos = <ReviewPhotos photos={review.photos}/>;
    }

    let sellerResponse;
    if (review.response) {
      sellerResponse = <SellerResponse response={review.response}/>;
    }

    const sameLineStyle = {
      display: 'inline-block'
    };

    const sameLineAndUnderlineStyle = {
      display: 'inline-block',
      textDecoration: 'underline',
      cursor: 'pointer'
    };

    const flexStyle = {
      display: 'flex',
      justifyContent: 'space-between'
    };

    return (
      <div>
        <br></br>
        <div style={flexStyle}>
          {isNaN(review.rating) ? null : (
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
                    (review.rating / 5) * 100
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
          <div>{review['reviewer_name']}, {month[monthIndex]} {date}, {year}</div>
        </div>

        <h3 id="reviewSummary">{review.summary}</h3>
        {reviewBody}

        {reviewPhotos}
        <br></br>
        {recommend}
        {sellerResponse}
        <br></br>
        <div style={sameLineStyle}>Helpful?</div>&nbsp;
        <div style={sameLineAndUnderlineStyle} onClick={() => { this.increaseHelpfulnessFunc(); }}>Yes</div>&nbsp;
        <div style={sameLineStyle}>({this.state.helpfulness})</div>&nbsp;
        <div style={sameLineStyle}>|</div>&nbsp;
        <div style={sameLineStyle}>Report</div>
        <br></br>
        <br></br>
        <hr></hr>

      </div>
    );
  }
}


export default ReviewItem;


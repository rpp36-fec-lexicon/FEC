import React from 'react';
import Stars from 'react-stars-display';
import ShortReviewBody from './ShortReviewBody.jsx';
import LongReviewBody from './LongReviewBody.jsx';
import Recommend from './Recommend.jsx';

// class ReviewItem extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//     this.review = this.props.review;
//     this.month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
//     this.reviewMonth = parseInt(review.date.substring(5, 7));
//     this.monthIndex = this.reviewMonth - 1;
//     this.date = this.review.date.substring(8, 10);
//     this.year = this.review.date.substring(0, 4);
//     this.reviewBody;
//   }

//   render () {
//     if (this.review.body.length < 250) {
//       this.reviewBody = <ShortReviewBody reviewBody={review.body}/>
//     } else {
//       this.reviewBody = <LongReviewBody reviewBody={review.body}/>
//     }

//     return (
//       <div>
//         <Stars stars={this.review.rating}/>
//         <div>{this.review['reviewer_name']}, {month[monthIndex]} {date}, {year}</div>
//         <div id="reviewSummary">{this.review.summary}</div>
//         {this.reviewBody}
//       </div>
//     );
//   }
// }

const ReviewItem = (props) => {
  const review = props.review;
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
    recommend = <Recommend />
  }

  return (
    <div>
      <Stars stars={props.review.rating}/>
      <div>{review['reviewer_name']}, {month[monthIndex]} {date}, {year}</div>
      <div id="reviewSummary">{review.summary}</div>
      {reviewBody}
      {recommend}
    </div>
  );
}

export default ReviewItem;
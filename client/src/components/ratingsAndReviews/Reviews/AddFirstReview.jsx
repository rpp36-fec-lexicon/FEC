import React from 'react';
import ReviewModal from './ReviewModal.jsx';

const AddFirstReview = (props) => {
  return (
    <div>
      <button onClick={() => { props.showReviewModalFunc(); }}>BE THE FIRST TO ADD A REVIEW!</button>
    </div>
  );
};

export default AddFirstReview;


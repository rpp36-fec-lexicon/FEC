import React from 'react';
import ReviewModal from './ReviewModal.jsx';


const AddAnotherReview = (props) => {
  return (
    <div>
      <button onClick={() => { props.showReviewModalFunc(); }}>ADD A REVIEW  +</button>
    </div>
  );
};

export default AddAnotherReview;


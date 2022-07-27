import React from 'react';

const SubmitReviewAlert = (props) => {

  const alertStyle = {
    fontSize: '16px',
    color: 'red'
  };

  const str = props.errors.join(', ');
  return (
    <div style={alertStyle}>
      You must enter the following: {str}
    </div>
  );
};

export default SubmitReviewAlert;


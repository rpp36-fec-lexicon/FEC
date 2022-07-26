import React from 'react';

const AnswerModalThumbnail = (props) => {

  return (
    <div>
      <img className="answer-thumbnail" width="50" height="50" src={props.src} alt="Image Preview"></img>
    </div>
  );
};

export default AnswerModalThumbnail;

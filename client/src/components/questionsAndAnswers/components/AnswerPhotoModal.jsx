import React from 'react';

const AnswerPhotoModal = (props) => {
  const expandStyle = {
    marginTop: '30px',
    width: '735px',
    height: '473px',
    position: 'absolute',
    borderRadius: '7%'
  };
  if (!props.show) {
    return null;
  }
  return (

    <div className="questions-and-answers-modal">
      <div className="answer-thumbnail-modal-content">
        <div className="answers-zoomed-photo-modal-header">
          <div aria-label="XButton" className="attach-photo-close" onClick={() => { props.hide(); }}>&times;</div>
          <img style={expandStyle} src={props.photo}></img>
        </div>
      </div>
    </div>

  );
};

export default AnswerPhotoModal;
import React from 'react';

const ReviewPhoto = (props) => {
  const thumbnailStyle = {
    width: '160px',
    height: '108px'
  };

  return (
    <div>
      <img onClick={() => { props.expandPhotoFunc(); }} style={thumbnailStyle} src={props.photo.url}/>
    </div>
  );
};

export default ReviewPhoto;

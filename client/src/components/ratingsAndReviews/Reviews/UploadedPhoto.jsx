import React from 'react';

const UploadedPhoto = (props) => {
  const thumbnailStyle = {
    width: '160px',
    height: '108px'
  };

  return (
    <div>
      <img style={thumbnailStyle} src={props.photo}/>&nbsp;
    </div>
  );
};

export default UploadedPhoto;


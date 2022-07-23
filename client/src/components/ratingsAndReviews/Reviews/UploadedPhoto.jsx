import React from 'react';

const UploadedPhoto = (props) => {
  console.log('props in upload photo', props)
  const thumbnailStyle = {
    width: '160px',
    height: '108px'
  };

  return (
    <div>
      <img style={thumbnailStyle} src={props.photo.url}/>&nbsp;
    </div>
  );
};

export default UploadedPhoto;


import React from 'react';
import UploadedPhoto from './UploadedPhoto.jsx';

const UploadedPhotos = (props) => {
  const sameLineStyle = {
    display: 'flex'
  };

  const thumbnailStyle = {
    width: '160px',
    height: '108px'
  };

  return (
    <div style={sameLineStyle}>
      {props.photos.map((photo, index) => {
        return <UploadedPhoto photo={photo} key={index}/>;
      })}
    </div>
  );
};

export default UploadedPhotos;


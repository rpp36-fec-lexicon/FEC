import React from 'react';
import ReviewPhoto from './ReviewPhoto.jsx';

const ReviewPhotos = (props) => {
  const sameLineStyle = {
    display: 'flex'
  };

  return (
    <div style={sameLineStyle}>

      {props.photos.map(photo => {
        return <ReviewPhoto photo={photo} key={photo.id} />;
      })}
    </div>
  );
};

export default ReviewPhotos;

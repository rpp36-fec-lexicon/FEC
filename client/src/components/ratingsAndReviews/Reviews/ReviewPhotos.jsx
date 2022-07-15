import React from 'react';
import ReviewPhoto from './ReviewPhoto.jsx';

const ReviewPhotos = (props) => {
  const sameLineStyle = {
    display: 'inline-block'
  };

  return (
    <div>
      <br></br>
      {props.photos.map(photo => {
        return <ReviewPhoto photo={photo} key={photo.id} />;
      })}
    </div>
  );
};

export default ReviewPhotos;

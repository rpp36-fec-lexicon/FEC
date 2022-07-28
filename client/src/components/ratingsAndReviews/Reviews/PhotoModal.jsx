import React from 'react';

const PhotoModal = (props) => {
  const expandStyle = {
    width: '700px',
    height: '473px'
  };

  return (
    <div className="modalPhoto">
      <div className="modalPhoto-content">
        <span data-testid="XButton" className="close" onClick={() => { props.closeModalFunc(); }}>&times;</span>
        <img style={expandStyle} src={props.photo.url}/>
      </div>
    </div>
  );
};

export default PhotoModal;


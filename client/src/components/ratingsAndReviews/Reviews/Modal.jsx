import React from 'react';

const Modal = (props) => {
  const expandStyle = {
    width: '700px',
    height: '473px'
  };

  if (!props.showModal) {
    return null;
  } else {
    return (
      <div className="modalPhoto">
        <div className="modalPhoto-content">
          <span className="close" onClick={() => { props.closeModalFunc(); }}>&times;</span>
          <img style={expandStyle} src={props.photo.url}/>
        </div>
      </div>
    );
  }


};

export default Modal;


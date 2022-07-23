import React from 'react';

const UploadPhotoModal = (props) => {
  return (
    <div className="uploadPhotoModal">
      <div className="uploadPhotoModal-content">
        <span className="close" onClick={() => { props.closeUploadPhotoModalFunc(); }}>&times;</span>
        <div className="">
          <input type="file" id="uploadPhoto" name="uploadPhoto"/>
        </div>
        <button onClick={() => { props.uploadPhotoFunc(); }}>Upload</button>
      </div>
    </div>
  );
};

export default UploadPhotoModal;

import React, {useState} from 'react';
import AnswerPhotoModal from './AnswerPhotoModal.jsx';

const AnswerModalThumbnail = (props) => {
  const [modal, setModal] = useState(false);
  const hideModal = () => {
    setModal(false);
  };


  return (
    <div>
      <div>
        <img width="140" height="110" src={props.src} alt="Image Preview" onClick={() => setModal(true)}></img>
        <AnswerPhotoModal photo={props.src} show={modal} hide={hideModal}/>
      </div>
    </div>
  );
};

export default AnswerModalThumbnail;


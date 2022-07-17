import React, { useState } from 'react';
import axios from 'axios';
import AnswerModalThumbnail from './AnswerModalThumbnail.jsx';

const AnswerModal = (props) => {
  const [thumbnails, setThumbnails] = useState([]);
  const [error, setError] = useState(null);

  const validateForm = () => {
    const answerBody = document.getElementById('answer-body');
    const answerUser = document.getElementById('answer-username');
    const answerEmail = document.getElementById('answer-email');
    const showError = document.getElementById('error');

    let errorMessage = [];
    if (answerBody.value === '' || answerBody.value === null) {
      errorMessage.push('Answer field is required');
    }
    if (answerBody.value.length > 1000) {
      errorMessage.push('1000 character limit exceeded');
    }
    if (answerUser.value === '' || answerUser.value === null) {
      errorMessage.push('Username is required');
    }
    if (answerUser.value.length > 60) {
      errorMessage.push('Username cannot exceed 60 characters');
    }
    var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!validateEmail.test(answerEmail.value)) {
      errorMessage.push('Email is invalid');
    }
    if (answerEmail.value.length > 60) {
      errorMessage.push('Email cannot exceed 60 characters');
    }

    if (errorMessage.length > 0) {
      setError('You must enter the following: ' + errorMessage.join(', '));
    }
    if (errorMessage.length === 0) {
      setError([]);
      axios.post('/addAnswer', {
        body: answerBody.value,
        name: answerUser.value,
        email: answerEmail.value,
        photos: thumbnails,
        questionId: props.id
      })
        .then(() => {
          setThumbnails([]);
          props.hide();
          props.update();
        })
        .catch((err) => {
          console.log('ERROR POST ANSWER');
        });
    }
  };

  const photoThumbnail = () => {
    var file = document.querySelector('input[type=file').files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'mustardUpload');
    axios.post('https://api.cloudinary.com/v1_1/mustard55/image/upload/', fd, { headers: { 'X-Requested-With': 'MLHttpRequest' } })
      .then(res => {
        let newUrl = res.data.secure_url;
        setThumbnails(thumbnails.concat(newUrl));
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  if (!props.show) {
    return null;
  }
  if (thumbnails.length < 5) {
    return (
      <div>
        <div>
          <div>
            <div onClick={()=> props.hide()}>X</div>
            <h3>Submit Your Answer</h3>
            <div>{props.name}: {props.question}</div>
          </div>
          <div>
            <form>
              <div>
                <label>Your Answer<sup>*</sup>: </label>
                <div><textarea maxLength="1000" rows="5" cols="70" required></textarea></div>
              </div>
              <div>
                <label>Your Username<sup>*</sup>: </label>
                <input maxLength="60" placeholder="Example: jack543!" required></input>
                <div><label>For privacy reasons, do not use your full name or email address</label></div>
              </div>
              <div>
                <label>Your Email<sup>*</sup>: </label>
                <input maxLength="60" placeholder="jack@email.com" required></input>
                <div><label>For authentication reasons, you will not be emailed</label></div>
              </div>
            </form>
          </div>
          <div>
            <div>
              <label>Attach Up To Five Photos  </label>
              <input onChange={() => photoThumbnail()} accept="image/*" multiple></input>
            </div>
            <div>
              {thumbnails.map((src, i) =>
                <AnswerModalThumbnail key={i} src={src} />
              )}
            </div>
            <div id="error" className="error">{error}</div>
            <div>
              <button onClick={() => validateForm()}>Submit Answer</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <div>
            <div onClick={()=> props.hide()}>X</div>
            <h4>Submit Your Answer</h4>
            <div>{props.name}: {props.question}</div>
          </div>
          <div>
            <form>
              <div>
                <label>Your Answer<sup>*</sup></label>
                <div><textarea maxLength="1000" rows="3" cols="100" required></textarea></div>
              </div>
              <div>
                <label>Your Username<sup>*</sup>: </label>
                <input type="text" maxLength="60" placeholder="Example: jack543!" required></input>
                <div><label>For privacy reasons, do not use your full name or email address</label></div>
              </div>
              <div>
                <label>Your Email<sup>*</sup>: </label>
                <input maxLength="60" placeholder="jack@email.com" required></input>
                <div><label>For authentication reasons, you will not be emailed</label></div>
              </div>
              <div>
                {thumbnails.map((src, i) =>
                  <AnswerModalThumbnail key={i} src={src} />
                )}
              </div>
            </form>
          </div>
          <div>
            <div>{error}</div>
            <button onClick={() => validateForm()}>Submit Answer</button>
          </div>
        </div>
      </div>
    );
  }
};

export default AnswerModal;
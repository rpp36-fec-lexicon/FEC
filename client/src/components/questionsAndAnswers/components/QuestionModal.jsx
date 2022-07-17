import React, { useState } from 'react';
import axios from 'axios';

const QuestionModal = (props) => {

  const [error, setError] = useState(null);
  const validateForm = () => {
    const questionBody = document.getElementById('question-body');
    const questionUser = document.getElementById('question-username');
    const questionEmail = document.getElementById('question-email');
    const showError = document.getElementById('error');

    let errorMessage = [];
    if (questionBody.value === '' || questionBody.value === null) {
      errorMessage.push('Question field is required');
    }
    if (questionBody.value.length > 1000) {
      errorMessage.push('1000 character limit exceeded');
    }
    if (questionUser.value === '' || questionUser.value === null) {
      errorMessage.push('Username is required');
    }
    if (questionUser.value.length > 60) {
      errorMessage.push('Username cannot exceed 60 characters');
    }
    var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!validateEmail.test(questionEmail.value)) {
      errorMessage.push('Email is invalid');
    }
    if (questionEmail.value.length > 60) {
      errorMessage.push('Email cannot exceed 60 characters');
    }

    if (errorMessage.length > 0) {
      setError('You must enter the following: ' + errorMessage.join(', '));
    }
    if (errorMessage.length === 0) {
      setError([]);
      axios.post('/addQuestion', {
        body: questionBody.value,
        name: questionUser.value,
        email: questionEmail.value,
        productId: props.productId
      })
        .then(() => {
          props.hide();
          props.update();
        })
        .catch((err) => {
          console.log('ERROR in posting question');
        });
    }
  };

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <div>
        <div>
          <div onClick={()=> props.hide()}>X</div>
          <h3>Ask Your Question</h3>
          <div>About the {props.name}</div>
        </div>
        <div>
          <form>
            <div>
              <label>Your Question<sup>*</sup>: </label>
              <div><textarea maxLength="1000" rows="5" cols="70" required></textarea></div>
            </div>
            <div>
              <label>Your Username<sup>*</sup>: </label>
              <input type="text" maxLength="60" placeholder="Example: jackson11!" required></input>
              <div><label>For privacy reasons, do not use your full name or email address</label></div>
            </div>
            <div>
              <label>Your Email<sup>*</sup>: </label>
              <input maxLength="60" placeholder="sample@email.com" required></input>
              <div><label>For authentication reasons, you will not be emailed</label></div>
            </div>
          </form>
        </div>
        <div>
          <div className="error">{error}</div>
          <div>
            <button onClick={() => validateForm()}>Submit Question</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
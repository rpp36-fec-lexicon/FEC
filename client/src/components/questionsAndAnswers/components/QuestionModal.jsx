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
    <div className = "questions-and-answers-modal">
      <div className = "questions-and-answers-modal-content">
        <div className = "questions-and-answers-modal-header">
          <div aria-label="XButton" className="attach-photo-close" onClick={()=> props.hide()}>&times;</div>
          <h3 className ="questions-and-answers-modal-title">Ask Your Question</h3>
          <div className ="questions-and-answers-modal-subtitle">About the {props.name}</div>
        </div>
        <div className ="questions-and-answers-modal-body">
          <form>
            <div className="add-question-body">
              <label>Your Question<sup>*</sup>: </label>
              <div><textarea id="question-body" maxLength="1000" rows="5" cols="70" required></textarea></div>
            </div>
            <div className="add-question-nickname">
              <label>Your Username<sup>*</sup>: </label>
              <input id= 'question-username' type="text" maxLength="60" placeholder="Example: jackson11!" required></input>
              <div className="qa-disclaimer"><label>For privacy reasons, do not use your full name or email address</label></div>
            </div>
            <div className="add-question-email">
              <label>Your Email<sup>*</sup>: </label>
              <input id = 'question-email' maxLength="60" placeholder="sample@email.com" required></input>
              <div className="qa-disclaimer"><label>For authentication reasons, you will not be emailed</label></div>
            </div>
          </form>
        </div>
        <div>
          <div id="question-error" className="error">{error}</div>
          <div className="question-submit-button">
            <button className="answer-button" onClick={() => validateForm()}>Submit Question</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
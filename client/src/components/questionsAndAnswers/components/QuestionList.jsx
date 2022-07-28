import React, { useState, useEffect } from 'react';
import AnswerModal from './AnswerModal.jsx';
import axios from 'axios';

const QuestionList = (props) => {
  const [modal, setModal] = useState(false);
  const hideModal = () => {
    setModal(false);
  };

  const questionHelpful = () => {
    axios.put('/questionHelpful', {
      questionId: props.id
    })
      .then(() => {
        props.update();
        localStorage.setItem(`${props.id} helpful`, true);
      })
      .catch((err) => {
        console.log('ERROR UPDATING QUESTION HELPFUL');
      });
  };

  useEffect(() => {
    const questionHelpfulButton = document.getElementById(`${props.id}helpful`);
    if (localStorage.getItem(`${props.id} helpful`)) {
      questionHelpfulButton.style.pointerEvents = 'none';
    } else {
      questionHelpfulButton.style.pointerEvents = 'auto';
    }
  });

  return (
    <div className="question-entry">
      <div className="single-question">
        Q: {props.question}
      </div>
      <div className="question-meta">
        <button onClick={() => questionHelpful()}
          id={props.id + 'helpful'}
          className = 'question-helpful'>  Helpful?&nbsp;<u>Yes({props.helpfulness})</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
        <button
          className= "add-answer" onClick={() => setModal(true)}>Add Answer</button>
        <AnswerModal show={modal} hide={hideModal} question={props.question} name ={props.name} id={props.id} update={props.update}/>
      </div>
    </div>
  );
};

export default QuestionList;
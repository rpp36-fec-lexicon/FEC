import React, { useState, useEffect } from 'react';
import AnswerModal from './AnswerModal.jsx';
import axios from 'axios';
// import { useTracking } from 'react-tracking';

const QuestionList = (props) => {
  // const { trackEvent } = useTracking();
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
        // trackEvent({
        //   time: new Date().toString(),
        //   element: `Question ${props.id} helpful`,
        //   widget: 'Question and Answer'
        // });
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


  // dark mode
  let darkModeClass1 = props.darkMode ? 'dm' : '';

  return (
    <div className="questionEntry">
      <div className="singleQuestion">
        Q: {props.question}
      </div>
      <div className="question-meta">
        <button onClick={() => questionHelpful()}
          id={props.id + 'helpful'}
          className={`questionHelpful ${darkModeClass1}`}>Helpful?&nbsp;<u>Yes({props.helpfulness})</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</button>
        <button className={`addAnswer ${darkModeClass1}`}
          onClick={() => setModal(true)}>Add Answer</button>
        <AnswerModal show={modal} hide={hideModal} question={props.question} name ={props.name} id={props.id} update={props.update}/>
      </div>
    </div>
  );
};

export default QuestionList;
import React from 'react';
import Answer from './Answer.jsx';

const AnswerList = (props) => {

  return (
    <div className="answer"> A:
      <div className="answerEntry">
        {props.displayAnswers.map((answer, i) =>
          <Answer
            key={i}
            name={answer.answerer_name}
            id={answer.id}
            answer={answer.body}
            date={answer.date}
            helpfulness={answer.helpfulness}
            update={props.update}
            photos={answer.photos}
            darkMode={props.darkMode}
          />
        )}
      </div>
    </div>
  );
};

export default AnswerList;
import React from 'react';

const QuestionListEntry = ({question, askedBy, postedDate, answer, answeredBy, answeredDate
  }) => {
  return (
    <div>
      <div>
        Q: {question}
      </div>
        <br/>
      <div>
        A: {answer}
        <br/>
        by: {answeredBy}, {answeredDate}
      </div>
    </div>
  )
}

export default QuestionListEntry;

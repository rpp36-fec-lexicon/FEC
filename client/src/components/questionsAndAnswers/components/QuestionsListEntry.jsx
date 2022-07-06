import React from 'react';

const QuestionsListEntry = ({
  question,
  askedBy,
  askedDate,
  answer,
  answeredBy,
  answeredDate,
}) => {
  return (
    <div>
      <div>Q: {question}</div>
      <br />
      <div>
        asked by : {askedBy}
        <br />
        asked date: {askedDate}
      </div>
      <div>A: {answer}</div>
    </div>
  );
};

export default QuestionsListEntry;

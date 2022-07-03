import React from "react";
import questions from "../sampledata/sampleQuestions.js";
import QuestionsListEntry from "./QuestionsListEntry.jsx";
const QuestionsAnswersList = (props) => {
  return (
    <div>
      {props.questionResults.map((question) => {
        return (
          <QuestionsListEntry
            question={question.question_body}
            askedBy={question.asker_name}
            askedDate={question.question_date}
          />
        );
      })}
      {/* {
      sampleQuestionsAnswers.product_id === props.productId
      ?
      sampleQuestionsAnswers.results
      :
      "nothing"
      } */}
    </div>
  );
};

export default QuestionsAnswersList;

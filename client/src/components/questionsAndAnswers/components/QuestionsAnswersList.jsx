import React from 'react';
import questions from '../sampledata/sampleQuestions.js'
import QuestionListEntry from './QuestionListEntry.jsx'
const QuestionsAnswersList = (props) => {

  return (
    <div>
      {
        questions.results.map(question => {
          let answer = question.answers[68].body;
          let answeredBy = question.answers[68].answerer_name
          return (
            <QuestionListEntry
              question={question.question_body}
              askedBy={question.asker_name}
              askedDate={question.question_date}
              answer={answer}
              answeredBy={answeredBy}
              answeredDate={question.answers.date}
            />
          )
        })
      }
      {/* {
      sampleQuestionsAnswers.product_id === props.productId
      ?
      sampleQuestionsAnswers.results
      :
      "nothing"
      } */}
    </div>
  )
}

export default QuestionsAnswersList;
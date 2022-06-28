import React from 'react';
import QuestionsAnswersList from './QuestionsAnswersList.jsx'
import SearchQuestion from './SearchQuestion.jsx'
import QuestionEntry from './QuestionEntry.jsx'


const QuestionAnswerMain = (props) => (
  <div>
    <div>
      passed productID : {props.productId}
    </div>
    <div>
    <QuestionsAnswersList productID={props.productId}/>
    </div>
    <div>
      <SearchQuestion/>
    </div>
    <br/>
    <div>
      <QuestionEntry/>
    </div>
  </div>
)

export default QuestionAnswerMain;

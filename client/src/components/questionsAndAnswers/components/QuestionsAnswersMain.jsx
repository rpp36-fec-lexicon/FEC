import React from 'react';
import QuestionsAnswersList from './QuestionsAnswersList.jsx'
import SearchQuestion from './SearchQuestion.jsx'
// import QuestionEntry from './QuestionEntry.jsx'
// import sampleQuestionsAnswers from '../sampledata/QuestionsAnswersAPI.js'

const QuestionsAnswersMain = (props) => (
  <div>
    <div>
    </div>
    <div>
    <QuestionsAnswersList productId={props.productId}/>
    </div>
    <div>
      <SearchQuestion/>
    </div>
    <br/>
    {/* <div>
      <QuestionEntry/>
    </div> */}
    <div>
      <button style={{width: "150px", height: "39px"}}>
        ADD A QUESTION  +
      </button>
    </div>
  </div>

)

export default QuestionsAnswersMain;

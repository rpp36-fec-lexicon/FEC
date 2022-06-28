import React from 'react';
import QuestionsAnswersList from './QuestionsAnswersList.jsx'
const SearchQuestion = (props) =>
 (
    <div>
      <div>
        <h1>QUESTIONS AND ANSWERS</h1>
        <form>
          <input
          onChange={ (e) => {<QuestionsAnswersList term={(e.target.value)}/>}}
          type="text"
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS"
          style={{width: "370px", height: "37px"}}
          />
        </form>
        <div>
          {/* <QuestionEntry term={props.term}/> */}
        </div>
      </div>
    </div>
)

export default SearchQuestion;
import React from 'react';
import QuestionsAnswersList from './QuestionsAnswersList.jsx'
import SearchQuestion from './SearchQuestion.jsx'
// import QuestionEntry from './QuestionEntry.jsx'
// import sampleQuestionsAnswers from '../sampledata/QuestionsAnswersAPI.js'

const QuestionsAnswersMain = ({productId}) => {
  const getQuestionsByProductID = ({productId}) => {
    fetch(`/questions?product_id=${productId}`)
      .then(data => {
        console.log(data.results);
        return data.results;
      })
  }
  return (
    <div>
      <div>
      <QuestionsAnswersList questions = {questions}/>
      </div>
      <div>
        <SearchQuestion/>
      </div>
      <br/>
      <div>
        <button style={{width: "150px", height: "39px"}}>
          ADD A QUESTION  +
        </button>
      </div>
    </div>
  )
}




const sendProductIdToServer = (productId) => {
  const productID = { id: productID };
  $.ajax({
    method: 'POST',
    url: '/questions',
    contentType: 'application/json',
    data: JSON.stringify(productID),
    success: () => {
    },
    error: () => {
      console.log(`sendProductIdToServer failed to send productId : ${productID.id} to server`);
    },
  });
}


export default QuestionsAnswersMain;

import React from "react";
import QuestionsAnswersList from "./QuestionsAnswersList.jsx";
import SearchQuestion from "./SearchQuestion.jsx";
// import QuestionEntry from './QuestionEntry.jsx'
// import sampleQuestionsAnswers from '../sampledata/QuestionsAnswersAPI.js'

const QuestionsAnswersMain = (props) => (
  <div>
    <div></div>
    <div>
      <QuestionsAnswersList
        questionResults={() => {
          getQuestionsByProductID(props.productId);
        }}
      />
    </div>
    <div>
      <SearchQuestion />
    </div>
    <br />
    <div>
      <button style={{ width: "150px", height: "39px" }}>
        ADD A QUESTION +
      </button>
    </div>
  </div>
);

const getQuestionsByProductID = (productId) => {
  fetch(`/questions?product_id=${productId}`)
    .then((res) => res.json())
    .then((questions) => {
      return questions.results;
    });
};

const sendProductIdToServer = (productId) => {
  const productID = { id: productID };
  $.ajax({
    method: "POST",
    url: "/questions",
    contentType: "application/json",
    data: JSON.stringify(productID),
    success: () => {},
    error: () => {
      console.log(
        `sendProductIdToServer failed to send productId : ${productID.id} to server`
      );
    },
  });
};

export default QuestionsAnswersMain;

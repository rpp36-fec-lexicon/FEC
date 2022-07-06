import React from 'react';
import QuestionsAnswersList from './QuestionsAnswersList.jsx';
import SearchQuestion from './SearchQuestion.jsx';
import $ from 'jquery';
// import QuestionEntry from './QuestionEntry.jsx'
// import sampleQuestionsAnswers from '../sampledata/QuestionsAnswersAPI.js'
// import { useContext } from 'react';

class QuestionsAnswersMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.productId,
      term: '',
      questionsAndAnswers: [],
      questions: [],
      defaultQuestions: [],
      isReported: false,
    };
    this.getQuestionsByProductID = this.getQuestionsByProductID.bind(this);
    this.getQuestionAnswerList = this.getQuestionAnswerList.bind(this);
    this.postProductIdToServer = this.postProductIdToServer.bind(this);
    this.searchQuestion = this.searchQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestionsByProductID();
  }

  getQuestionsByProductID () {
    // console.log(`${this.state.productId}`);
    fetch(`/questions?product_id=${this.state.productId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          questions: data.results
        });
      }).then(() => {
        this.getQuestionAnswerList();
        this.postProductIdToServer();
      });
  }
  getQuestionAnswerList() {
    // const list = this.state.questions;
    const formattedQuestionsAnswers = [];
    const questionsAnswersToDisplay = [];
    this.state.questions.map(QA => {
      let answersAll = Object.values(QA.answers);
      let answersSeller = [];
      let answersNonSellerHelpful = [];
      let answersToDisplay = [];
      answersAll.map(answer => {
        //if seller add to priority array
        if (answer.answerer_name.toLowerCase() === 'seller') {
          answersSeller.push({
            id: answer.id,
            text: answer.body,
            helpfulnessCount: answer.helpfulness,
            name: answer.answerer_name,
            date: answer.date,
            photos: answer.photos
          });
        } else {
          answersNonSellerHelpful.push({
            id: answer.id,
            text: answer.body,
            helpfulnessCount: answer.helpfulness,
            name: answer.answerer_name,
            date: answer.date,
            photos: answer.photos
          });
        }
        answersNonSellerHelpful.sort(function(a, b) {
          return b.helpfulness - a.helpfulness;
        });
        answersToDisplay = answersSeller.concat(answersNonSellerHelpful);
        return answersToDisplay;
      });
      questionsAnswersToDisplay.push({
        id: QA.question_id,
        question: QA.question_body,
        isHelpful: QA.question_helpfulness,
        answers: answersToDisplay
      });
    });
    this.setState({
      questionsAndAnswers: questionsAnswersToDisplay
    });
  }

  postProductIdToServer() {
    const productID = { id: this.state.productId };
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
  searchQuestion(term) {
    this.setState({
      term: term
    });
    if (term.length >= 3) {
      this.setState({
        questionsAndAnswers: this.getQuestionsByProductID()
      });
    }
    this.getQuestionsByProductID();
    this.getQuestionAnswerList();
  }

  render() {
    return (
      <div>
        <div>
          <SearchQuestion
            search={this.searchQuestion}
          />
        </div>
        <div>
          <QuestionsAnswersList
          questions = {this.state.questions}
          key={this.state.questions.question_id}
          />
        </div>
        <br/>
        <div>
          <button style={{width: '150px', height: '39px'}}>
            ADD A QUESTION  +
          </button>
        </div>
      </div>
    );
  }
}
export default QuestionsAnswersMain;

import React from 'react';
import QuestionsAnswersList from './QuestionsAnswersList.jsx';
import SearchQuestion from './SearchQuestion.jsx';
import AskQuestions from './AskQuestions.jsx';
import $ from 'jquery';

class QuestionsAnswersMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      productInfo: this.props.productInfo,
      questions: [],
      searchTerm: ''
    };
    this.getQuestionsByProductID = this.getQuestionsByProductID.bind(this);
    this.getQuestionAnswerList = this.getQuestionAnswerList.bind(this);
    this.postProductIdToServer = this.postProductIdToServer.bind(this);
    this.searchQuestion = this.searchQuestion.bind(this);
    this.loadMoreAnswers = this.loadMoreAnswers.bind(this);
    this.loadMoreQuestions = this.loadMoreQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestionsByProductID(this.productId);
  }

  componendDidUpdate() {
    if ((this.state.productInfo !== this.props.productInfo) || (this.state.productId !== this.props.product)) {
      this.setState({
        productInfo: this.props.productInfo,
        productId: this.props.product
      });
      this.getQuestionsByProductID(this.props.productId);
    }
  }

  searchQuestion(term) {
    this.setState({
      searchTerm: term
    });
  }

  getQuestionsByProductID () {
    fetch(`/questions?product_id=${this.state.productId}`)
      .then((res) => res.json())
      .then((data) => {
        // more than 2 questions, load more question button will not appear
        if (data.results.length > 2) {
          this.setState({
            isloadQsButtonVisible: true,
          });
        // less than 2 questions, load more question button will not appear
        } else if (data.results.length < 2) {
          this.setState({
            isloadQsButtonVisible: false,
            isloadAsButtonVisible: false,
          });
        }
        this.setState({
          questions: data.results,
          isloadQsButtonVisible: false
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
          console.log(answer.answerer_name);
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
        console.log(`postProductIdToServer function failed to send productId : ${productID.id} to server`);
      },
    });
  }


  loadMoreAnswers() {
    //Sorts the answer array of all questions to get max length
    const answersArray = this.state.questionsAndAnswers.map(e => {
      return e.answers.length;
    });
    const sorted = answersArray.sort(function(a, b) {
      return b - a;
    });
    if ((this.state.answersToShow >= sorted[0]) || (answersArray.length === 0)) {
      this.setState({
        isloadAsButtonVisible: false,
      });
    }
    this.setState((prev) => ({ answersToShow: prev.answersToShow + 2 }));
  }

  loadMoreQuestions() {
    if (this.state.questionsToShow > this.state.questionsAndAnswers.length) {
      this.setState({
        isloadQsButtonVisible: false,
      });
    } else {
      this.setState((prev) => ({ questionsToShow: prev.questionsToShow + 2 }));
      this.getQuestionsApi();
    }
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

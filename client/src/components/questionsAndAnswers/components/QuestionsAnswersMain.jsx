import React from 'react';
import axios from 'axios';
import SearchQuestion from './SearchQuestion.jsx';
import QuestionsAnswersList from './QuestionsAnswersList.jsx';

class QuestionsAnswersMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      productInfo: this.props.productInfo,
      questions: [],
      search: ''
    };
  }

  componentDidMount() {
    this.getQuestions(this.state.productId);
  }

  componentDidUpdate () {
    if ((this.state.productInfo !== this.props.productInfo) || (this.state.productId !== this.props.product)) {
      this.setState({
        productInfo: this.props.productInfo,
        productId: this.props.product
      });
      this.getQuestions(this.state.productId);
    }
  }

  searchQuestions (value) {
    this.setState({
      search: value
    });
  }

  getQuestions (id) {
    axios.get('/questions', {
      params: {
        productId: id
      }
    }).then((result) => {
      this.setState({
        questions: result.data
      });
    }).catch((error) => {
      console.log('Error Getting Questions:', error);
    });
  }

  render () {
    return (
      <div>
        <div>
          <h3>QUESTIONS & ANSWERS</h3>
        </div>
        <div>
          <SearchQuestion searchQuestions={this.searchQuestions.bind(this)}/>
        </div>
        <div>
          <QuestionsAnswersList
            product={this.state.productId}
            questions={this.state.questions}
            productInfo={this.state.productInfo}
            filter={this.state.search}
            darkMode={this.props.darkMode}
            update={this.componentDidMount.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default QuestionsAnswersMain;
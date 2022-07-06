import React from 'react';
import QuestionsAnswersList from './QuestionsAnswersList.jsx';
import interact from './Interact.jsx';

class SearchQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    this.searchQuestion = this.searchQuestion.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      term: e.target.value,
    }, () => {
      this.searchQuestion(e);
    });
  }

  searchQuestion(e) {
    e.preventDefault();
    this.props.search(this.state.term);

  }

  render() {
    return (
      <div>
        <div>
          <h1>QUESTIONS AND ANSWERS</h1>
          <form>
            <input
              onChange={this.onChange}
              onClick={() => {interact('input', 'searchBarClicked')}}
              type='text'
              placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS'
              style={{ width: '370px', height: '37px' }}
            />
          </form>
          <div>{/* <QuestionEntry term={props.term}/> */}</div>
        </div>
      </div>
    )
  }
};

export default SearchQuestion;

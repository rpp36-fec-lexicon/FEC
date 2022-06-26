import React from 'react';
// import QAList from './QAList.jsx'
class SearchQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedTerm: ''
    }
    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler = (term) => {
    this.setState({
      searchedTerm: term
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>QUESTIONS AND ANSWERS</h1>
          <form>
            <input
            onChange={ (e) => {this.inputHandler(e.target.value)}}
            type="text"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS"
            />
          </form>
          <div>
            {/* <QAList question={this.state.searchedTerm}/> */}
          </div>
        </div>
      </div>
    )
  }

}

export default SearchQuestion;
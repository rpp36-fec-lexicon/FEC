import React from 'react';
// import QAList from './QAList.jsx'
class SearchQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedTerm: ''
    }
  }

  inputHandler = (e) => {
    this.setState({
      searchedTerm: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div className='search-question-bar'>
          <h1 className="qa-title">QUESTIONS AND ANSWERS</h1>
          <form>
            <input
            onChange={ e => this.inputHandler(e)}
            type="text"
            onClick={()=>{console.log('test')}}
            label="HAVE A QUESTION? SEARCH FOR ANSWERS"
            />
          </form>
          <div>
            {this.state.searchedTerm}
            {/* <QAList question={this.state.searchedTerm}/> */}
          </div>
        </div>
      </div>
    )
  }
  // return (
  //   <div>
  //     <div>
  //       <input onChange={e => setSearch(e.target.value)} type="text" placeholder="Search..." value={search} />
  //     </div>
  //   </div>
  // )
}

export default SearchQuestion;
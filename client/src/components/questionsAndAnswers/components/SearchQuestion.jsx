import React, { useEffect } from 'react';

const SearchQuestion = (props) => {

  const search = (e) => {
    props.searchQuestions(e.target.value);
  };


  return (
    <div className="search-question">
      <textarea
        onChange={(e) => search(e)}
        type="text"
        cols="144"
        maxLength="200"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS...">
      </textarea>
    </div>
  );

};

export default SearchQuestion;
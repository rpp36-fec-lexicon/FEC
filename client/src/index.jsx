import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchQuestion from './components/questionsAndAnswers/components/SearchQuestion.jsx'

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Atelier</h1>
        <SearchQuestion/>
      </div>
    );
  }
}

export default App;

ReactDOM.createRoot(document.getElementById('app')).render(<App />);



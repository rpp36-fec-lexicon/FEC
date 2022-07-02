import React from 'react';
import ReactDOM from 'react-dom/client';
import RatingsAndReviews from './components/RatingsAndReviews/RatingsAndReviews.jsx';
import App_RelatedAndOutfit from "./components/relatedItems/index.jsx";
import QuestionsAnswersMain from "./components/questionsAndAnswers/components/QuestionsAnswersMain.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71697
    }
  }
  render () {
    return (
      <div>
        <h1>Atelier</h1>
        <RatingsAndReviews />
        {/* <QuestionsAnswersMain productId={this.state.productId}/>
        <App_RelatedAndOutfit /> */}
      </div>
    );
  }
}


export default App;

ReactDOM.createRoot(document.getElementById('app')).render(<App />);



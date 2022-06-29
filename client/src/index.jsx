import React from "react";
import ReactDOM from "react-dom/client";
import App_RelatedAndOutfit from "./components/relatedItems/index.jsx";
import QuestionsAnswersMain from "./components/questionsAndAnswers/components/QuestionsAnswersMain.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 5
    }
  }
  render () {
    return (
      <div>
        <h1>Atelier</h1>
        <App_RelatedAndOutfit />
        <QuestionsAnswersMain productId={this.state.productId}/>
      </div>
    );
  }
}

export default App;

ReactDOM.createRoot(document.getElementById('app')).render(<App />);



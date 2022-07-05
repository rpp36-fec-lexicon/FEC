import React from "react";
import ReactDOM from "react-dom/client";
import RatingsAndReviews from "./components/RatingsAndReviews/RatingsAndReviews.jsx";
import RelatedAndOutfit from "./components/relatedItems/index.jsx";
import QuestionsAnswersMain from "./components/questionsAndAnswers/components/QuestionsAnswersMain.jsx";

class App extends React.Component {
  constructor(props) {
    console.log("pp", props);
    super(props);
    this.state = {
      productId: 72022,
    };
  }
  componentDidMount() {
    // how about making another ajax req to get prodID info
  }

  prodIDChanger(relatedID) {
    console.log("relatedID ", relatedID);
    // this.setState({
    //   productId: relatedID,
    // });
  }

  render() {
    return (
      <div>
        <h1>Atelier</h1>
        {/* <RatingsAndReviews />
        <QuestionsAnswersMain productId={this.state.productId} /> */}
        <RelatedAndOutfit
          prodID={this.state.productId}
          prodIDChanger={this.prodIDChanger.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;

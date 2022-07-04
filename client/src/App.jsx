import React from "react";
import ReactDOM from "react-dom/client";
import RatingsAndReviews from "./components/RatingsAndReviews/RatingsAndReviews.jsx";
import RelatedAndOutfit from "./components/relatedItems/index.jsx";
import QuestionsAnswersMain from "./components/questionsAndAnswers/components/QuestionsAnswersMain.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71708, // 72151 style photo shows pants, but category is shorts
      // 71954 name backpack, photos show shoes
    };
  }
  componentDidMount() {
    // alert("Hi Dina this is the sum of 5+5", 5 + 5);
  }

  prodIDChanger(relatedID) {
    // console.log("id", relatedID);
    this.setState({
      productId: relatedID,
    });
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductOverview from './components/overview/ProductOverview.jsx';
import RatingsAndReviews from './components/ratingsAndReviews/RatingsAndReviews.jsx';
import App_RelatedAndOutfit from "./components/relatedItems/index.jsx";
import QuestionsAnswersMain from "./components/questionsAndAnswers/components/QuestionsAnswersMain.jsx";
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71697
    }
  }

  componentDidMount() {
    this.updateProduct(this.state.productId);
  }

  updateProduct(productId) {
    var query = {productId: productId};
    $.ajax({
      url: '/products/:product_id',
      type: 'POST',
      data: query,
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render () {
    return (
      <div>
        <h1>Atelier</h1>
        <ProductOverview />
        {/* <RatingsAndReviews /> */}
        {/* <QuestionsAnswersMain productId={this.state.productId}/> */}
        {/* <App_RelatedAndOutfit /> */}
      </div>
    );
  }
}


export default App;

ReactDOM.createRoot(document.getElementById('app')).render(<App />);



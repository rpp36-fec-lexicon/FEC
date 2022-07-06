import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductOverview from './components/overview/ProductOverview.jsx';
import RatingsAndReviews from './components/ratingsAndReviews/RatingsAndReviews.jsx';
import RelatedAndOutfit from './components/relatedItems/index.jsx';
import QuestionsAnswersMain from './components/questionsAndAnswers/components/QuestionsAnswersMain.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    // console.log("pp", props);
    super(props);
    this.state = {
      productId: 72022,
      productInfo: undefined,
      styleInfo: [],
      defaultStyle: undefined,
    };
  }
  componentDidMount() {
    this.updateProduct(this.state.productId);
  }

  prodIDChanger(relatedID) {
    // console.log("relatedID ", relatedID);
    // this.setState({
    //   productId: relatedID,
    // });
  }

  updateProduct(productId) {
    var query = { productId: productId };
    $.ajax({
      url: '/products/:product_id',
      type: 'POST',
      data: query,
      success: (data) => {
        // console.log('THIS IS MY DATA!', data);
        this.setState({
          productId: productId,
          productInfo: data,
        });
      },
      error: (err) => {
        console.log(err);
      },
    }).then(() => {
      $.ajax({
        url: '/products/:product_id/styles',
        type: 'POST',
        data: query,
        success: (styles) => {
          // console.log('THIS IS STYLE DATA', styles);
          this.setState({
            styleInfo: styles.results,
            defaultStyle: styles.results.find(
              (product) => product['default?'] === true
            ),
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Atelier</h1>
        <ProductOverview productInfo={this.state.productInfo}/>
        {/* <RatingsAndReviews /> */}
        {/* <QuestionsAnswersMain productId={this.state.productId} key={this.state.productId} /> */}
        {/* <RelatedAndOutfit prodID={this.state.productId} /> */}
        {/* <RelatedAndOutfit
          prodID={this.state.productId}
          prodIDChanger={this.prodIDChanger.bind(this)}
        /> */}
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);

export default App;

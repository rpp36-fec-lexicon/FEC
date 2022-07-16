import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import ProductOverview from "./components/overview/ProductOverview.jsx";
import RatingsAndReviews from "./components/ratingsAndReviews/RatingsAndReviews.jsx";
import RelatedAndOutfit from "./components/relatedItems/index.jsx";
import QuestionsAnswersMain from "./components/questionsAndAnswers/components/QuestionsAnswersMain.jsx";
import $ from "jquery";
const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71719,
      productInfo: undefined,
      styleInfo: [],
      defaultStyle: undefined,
      reviewData: null,
      reviews: null,
      metaData: null,
      rating: null,
      totalNumberOfRatings: null,
      flag: false,
      outfitItems: [],
    };
  }

  componentDidMount() {
    this.prodIDChanger(this.state.productId);

    var pulledItems = storageGetter();
    this.setState({
      outfitItems: pulledItems,
    });
  }

  outfitAdder() {
    // console.log("outfitItems", this.state.outfitItems);
    var outfitContainer = this.state.outfitItems;
    var existingIDs = [];
    for (let i = 0; i < this.state.outfitItems.length; i++) {
      existingIDs.push(this.state.outfitItems[i][0][0].id);
    }
    if (!existingIDs.includes(this.state.productId)) {
      outfitContainer.push([
        [this.state.productInfo],
        [this.state.defaultStyle],
      ]);
    }

    this.setState({
      outfitItems: outfitContainer,
    });
  }

  outfitRemover(id) {
    for (let i = 0; i < this.state.outfitItems.length; i++) {
      if (this.state.outfitItems[i][0][0].id === id) {
        this.state.outfitItems.splice([i], 1);
      }
    }
    this.setState({
      outfitItems: this.state.outfitItems,
    });
  }

  getAllReviewsFunc() {
    return axios.get("/reviews", {
      params: { productId: this.state.productId },
    });
  }

  getAllMetaFunc() {
    return axios.get("/reviews/meta", {
      params: { productId: this.state.productId },
    });
  }

  getProductInfo() {
    return axios.post("/products/:product_id", {
      params: { productId: this.state.productId },
    });
  }

  getProductStyles() {
    return axios.post("/products/:product_id/styles", {
      params: { productId: this.state.productId },
    });
  }

  prodIDChanger(relatedID) {
    this.setState({ productId: relatedID }, () => {
      this.updateProduct(relatedID);
    });
  }

  updateProduct(proId) {
    this.setState({ flag: false });
    Promise.all([
      this.getProductInfo(),
      this.getProductStyles(),
      this.getAllReviewsFunc(),
      this.getAllMetaFunc(),
    ])
      .then((values) => {
        console.log(values[0].data);
        console.log(values[1].data);
        const reviewData = values[2].data;
        const reviews = values[2].data.results;
        const metaData = values[3].data;
        const ratings = metaData.ratings;
        let totalNumberOfRatings = 0;
        let totalRatings = 0;
        let rating;

        if (!Object.keys(ratings)) {
          rating = 0;
        }

        for (var key in ratings) {
          totalNumberOfRatings += parseInt(ratings[key]);
          totalRatings += parseInt(key) * parseInt(ratings[key]);
        }

        rating = totalRatings / totalNumberOfRatings;
        rating = Math.round(10 * rating) / 10;

        var styles = values[1].data.results;
        var defaultStyle = styles.find(
          (product) => product["default?"] === true
        );
        if (defaultStyle === undefined) {
          defaultStyle = styles[0];
        }

        this.setState({
          flag: true,
          productInfo: values[0].data,
          styleInfo: styles,
          defaultStyle: defaultStyle,
          reviews,
          reviewData,
          metaData,
          rating,
          totalNumberOfRatings,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.flag) {
      return (
        <React.Fragment>
          <h1>Atelier</h1>
          <ProductOverview
            productInfo={this.state.productInfo}
            defaultStyle={this.state.defaultStyle}
            styleList={this.state.styleInfo}
            rating={this.state.rating}
            outfitAdder={this.outfitAdder.bind(this)}
            outfitItems={this.state.outfitItems}
          />
          <RelatedAndOutfit
            prodID={this.state.productId}
            prodInfo={this.state.productInfo}
            styleInfo={this.state.styleInfo}
            defaultStyle={this.state.defaultStyle}
            prodIDChanger={this.prodIDChanger.bind(this)}
            outfitAdder={this.outfitAdder.bind(this)}
            outfitRemover={this.outfitRemover.bind(this)}
            outfitItems={this.state.outfitItems}
          />

          <QuestionsAnswersMain
            productId={this.state.productId}
            productInfo={this.state.productInfo}
            key={this.state.productId}
          />
          <RatingsAndReviews
            productId={this.state.productId}
            reviewData={this.state.reviewData}
            reviews={this.state.reviews}
            metaData={this.state.metaData}
            rating={this.state.rating}
            totalNumberOfRatings={this.state.totalNumberOfRatings}
            filterRating={this.filterRating}
          />
        </React.Fragment>
      );
    }
  }
}

const storageGetter = (key = "items", defaultValue = []) => {
  // console.log("get");
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;

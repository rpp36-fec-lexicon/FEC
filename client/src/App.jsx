import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import ProductOverview from "./components/overview/ProductOverview.jsx";
import RatingsAndReviews from "./components/ratingsAndReviews/RatingsAndReviews.jsx";
import RelatedAndOutfit from "./components/relatedItems/index.jsx";
import QuestionsAnswersMain from "./components/questionsAndAnswers/components/QuestionsAnswersMain.jsx";
import $ from "jquery";
import logo from "./../public/logo2.png";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 71697,
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
      outfitItemsIDs: [],
      userInputInfo: 71697,
    };
  }

  componentDidMount() {
    this.prodIDChanger(this.state.productId);

    // eslint-disable-next-line no-use-before-define
    var pulledItems = storageGetter();
    var existingIDs = [];
    for (let i = 0; i < pulledItems.length; i++) {
      existingIDs.push(pulledItems[i][0][0].id);
    }
    this.setState({
      outfitItems: pulledItems,
      outfitItemsIDs: existingIDs,
    });
  }

  userTracker(element, widget, time) {
    axios
      .post("/interaction", { element, widget, time })
      .then((res) => {
        // console.log(
        //   "user event successfully sent to interactions api: ",
        //   res.status,
        //   "event detail: ",
        //   { element, widget, time }
        // );
      })
      .catch((err) => {
        throw new Error("Tracking failed: ", err);
      });
  }

  outfitAdder() {
    var outfitContainer = this.state.outfitItems;
    var existingIDs = [];
    for (let i = 0; i < this.state.outfitItems.length; i++) {
      existingIDs.push(this.state.outfitItems[i][0][0].id);
    }
    if (!existingIDs.includes(this.state.productId)) {
      outfitContainer.push([
        [this.state.productInfo],
        [this.state.defaultStyle],
        [this.state.rating],
      ]);
    }
    $(".MainOutfitAdderBTN").text("Item Added to Outfit");
    $(".MainOutfitAdderBTN").addClass("disabledBTN");
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
    $(".MainOutfitAdderBTN").text(" Add to Outfits");
    $(".MainOutfitAdderBTN").removeClass("disabledBTN");
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

    // adds id to url
    const url = new URL(window.location);
    url.searchParams.set("id", proId);
    window.history.pushState({}, "", url);

    Promise.all([
      this.getProductInfo(),
      this.getProductStyles(),
      this.getAllReviewsFunc(),
      this.getAllMetaFunc(),
    ])
      .then((values) => {
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
        throw new Error("Updating product failed: ", err);
      });
  }

  userInputID(userInput) {
    if (userInput.length === 5) {
      this.setState({
        userInputInfo: userInput,
      });
    } else {
      this.setState({
        userInputInfo: 72287,
      });
    }
  }

  render() {
    if (this.state.flag) {
      return (
        <>
          <div
            className="mainHeader"
            onClick={(e) => {
              let timeOfClick = new Date().toLocaleString("en-US", {
                hour12: false,
              });
              let element = `Selectors: {LocalName: ${e.target.localName}, ClassName: ${e.target.className}, innerHTML: ${e.target.innerHTML}}`;
              this.userTracker(element, "Overview Widget", timeOfClick);
            }}
          >
            <div className="mainHeader-child1">
              <img src={logo} className="logo" alt="Atelier company logo" />
            </div>
            <div className="mainHeader-child2">
              <div className="searchContainer">
                <input
                  className="searchInput"
                  label="userSearch"
                  type="number"
                  onChange={(e) => this.userInputID(e.target.value)}
                ></input>
                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={() => this.prodIDChanger(this.state.userInputInfo)}
                ></i>
              </div>
            </div>
          </div>
          <div className="allComponents">
            <ProductOverview
              userTracker={this.userTracker.bind(this)}
              productId={this.state.productId}
              productInfo={this.state.productInfo}
              defaultStyle={this.state.defaultStyle}
              styleList={this.state.styleInfo}
              rating={this.state.rating}
              outfitAdder={this.outfitAdder.bind(this)}
              outfitItems={this.state.outfitItems}
              outfitItemsIDs={this.state.outfitItemsIDs}
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
              userTracker={this.userTracker.bind(this)}
            />
            <QuestionsAnswersMain
              product={this.state.productId}
              productInfo={this.state.productInfo}
              key={this.state.productId}
              userTracker={this.userTracker.bind(this)}
            />
            <RatingsAndReviews
              productInfo={this.state.productInfo}
              productId={this.state.productId}
              reviewData={this.state.reviewData}
              reviews={this.state.reviews}
              metaData={this.state.metaData}
              rating={this.state.rating}
              totalNumberOfRatings={this.state.totalNumberOfRatings}
              filterRating={this.filterRating}
              getAllReviewsFunc={this.getAllReviewsFunc.bind(this)}
              userTracker={this.userTracker.bind(this)}
            />
          </div>
        </>
      );
    }
  }
}

export const storageGetter = (key = "items") => {
  const savedItems = localStorage.getItem(key);
  const storeageResult = savedItems !== null ? JSON.parse(savedItems) : [];
  return storeageResult;
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
export default App;

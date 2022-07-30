import React from "react";
import axios from "axios";
import SearchQuestion from "./SearchQuestion.jsx";
import QuestionsAnswersList from "./QuestionsAnswersList.jsx";
import Tracker from "../../Tracker.jsx";

class QuestionsAnswersMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.product,
      productInfo: this.props.productInfo,
      questions: [],
      search: "",
    };
  }

  componentDidMount() {
    this.getQuestions(this.state.productId);
  }

  componentDidUpdate() {
    if (
      this.state.productInfo !== this.props.productInfo ||
      this.state.productId !== this.props.product
    ) {
      this.setState({
        productInfo: this.props.productInfo,
        productId: this.props.product,
      });
      this.getQuestions(this.state.productId);
    }
  }

  searchQuestions(value) {
    this.setState({
      search: value,
    });
  }

  getQuestions(id) {
    axios
      .get("/questions", {
        params: {
          productId: id,
        },
      })
      .then((result) => {
        this.setState({
          questions: result.data,
        });
      })
      .catch((error) => {
        console.log("Error Getting Questions:", error);
      });
  }

  render() {
    return (
      <div
        id="qa-module"
        className={"qa_module_container"}
        onClick={(e) => {
          let timeOfClick = new Date().toLocaleString("en-US", {
            hour12: false,
          });
          let element = `Selectors: {LocalName: ${e.target.localName}, ClassName: ${e.target.className}, innerHTML: ${e.target.innerHTML}}`;
          this.props.userTracker(element, "Overview Widget", timeOfClick);
        }}
      >
        {/* <div className="questions-and-answers-header">
          <h3>QUESTIONS & ANSWERS</h3>
        </div> */}
        <div className="questions-and-answers-list">
          <QuestionsAnswersList
            product={this.state.productId}
            questions={this.state.questions}
            productInfo={this.state.productInfo}
            filter={this.state.search}
            update={this.componentDidMount.bind(this)}
          />
        </div>
        <div className="questions-and-answers-search">
          <SearchQuestion searchQuestions={this.searchQuestions.bind(this)} />
        </div>
      </div>
    );
  }
}

export default QuestionsAnswersMain;

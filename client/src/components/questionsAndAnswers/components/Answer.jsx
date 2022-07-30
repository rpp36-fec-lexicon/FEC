import React, { useState, useEffect } from "react";
// import { useTracking } from 'react-tracking';
import axios from "axios";
import AnswerModalThumbnail from "./AnswerModalThumbnail.jsx";

const Answer = (props) => {
  const convertDate = (date) => {
    var updatedDate = new Date(date).toDateString();
    updatedDate = updatedDate.split(" ");
    updatedDate.shift();
    updatedDate[1] = updatedDate[1] + ", ";
    return updatedDate.join(" ");
  };

  const answerHelpful = () => {
    axios
      .put("/answerHelpful", {
        answerId: props.id,
      })
      .then(() => {
        props.update();
        localStorage.setItem(`${props.id} answer`, true);
      })
      .catch((err) => {
        console.log("ERROR ANSWER HELPFUL NOT UPDATED", err);
      });
  };

  const reportAnswer = () => {
    axios
      .put("/reportAnswer", {
        answerId: props.id,
      })
      .then(() => {
        var pressedReportButton = document.getElementById(`${props.id}report`);
        pressedReportButton.innerHTML = "Reported";
        localStorage.setItem(`${props.id} report`, true);
      })
      .catch((err) => {
        console.log("ERROR REPORTING ANSWER", err);
      });
  };

  useEffect(() => {
    const answerButton = document.getElementById(`${props.id}answer`);
    const reportButton = document.getElementById(`${props.id}report`);
    if (localStorage.getItem(`${props.id} answer`)) {
      answerButton.style.pointerEvents = "none";
    } else {
      answerButton.style.pointerEvents = "auto";
    }
    if (localStorage.getItem(`${props.id} report`)) {
      reportButton.style.pointerEvents = "none";
    } else {
      reportButton.style.pointerEvents = "auto";
    }
  });

  if (props.name === "Seller") {
    return (
      <div className="singleAnswer">
        <div>
          {props.answer}
          <div className="thumbnails">
            {props.photos.map((photo, i) => (
              <AnswerModalThumbnail key={i} src={photo} />
            ))}
          </div>
          <div className="answer-meta">
            {" "}
            by
            <div className="seller"> &nbsp;{props.name}</div>
            <div>,&nbsp;{convertDate(props.date)} |&nbsp;</div>
            <button
              onClick={() => answerHelpful()}
              id={props.id + "answer"}
              className="answer-meta-helpful"
            >
              &nbsp;Helpful? <u>Yes({props.helpfulness})</u>&nbsp;&nbsp;
            </button>
            <button
              onClick={() => reportAnswer()}
              id={props.id + "report"}
              className="answer-meta-report"
            >
              &nbsp;<u>Report</u>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="single-answer">
        <div>
          {props.answer}
          <div className="thumbnails">
            {props.photos.map((photo, i) => (
              <AnswerModalThumbnail key={i} src={photo} />
            ))}
          </div>
          <div className="answer-meta">
            by
            <div>&nbsp;{props.name}</div>
            <div>,&nbsp;{convertDate(props.date)} |&nbsp;</div>
            <button
              onClick={() => answerHelpful()}
              id={props.id + "answer"}
              className="answer-meta-helpful"
            >
              &nbsp;Helpful? <u>Yes({props.helpfulness})</u>&nbsp;&nbsp;
            </button>
            <button
              className="answer-meta-report"
              onClick={() => reportAnswer()}
              id={props.id + "report"}
            >
              &nbsp;<u>Report</u>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Answer;

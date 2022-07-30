import React, { useState } from "react";
import axios from "axios";
import AnswerModalThumbnail from "./AnswerModalThumbnail.jsx";
// const cloudinaryAPIKey = process.env.cloudinaryAPIKey;
const instance = axios.create();

const AnswerModal = (props) => {
  const [thumbnails, setThumbnails] = useState([]);
  const [error, setError] = useState(null);

  const validateForm = () => {
    const answerBody = document.getElementById("answer-body");
    const answerUser = document.getElementById("answer-username");
    const answerEmail = document.getElementById("answer-email");
    const showError = document.getElementById("error");

    let errorMessage = [];
    if (answerBody.value === "" || answerBody.value === null) {
      errorMessage.push("Answer field is required");
    }
    if (answerBody.value.length > 1000) {
      errorMessage.push("1000 character limit exceeded");
    }
    if (answerUser.value === "" || answerUser.value === null) {
      errorMessage.push("Username is required");
    }
    if (answerUser.value.length > 60) {
      errorMessage.push("Username cannot exceed 60 characters");
    }
    var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!validateEmail.test(answerEmail.value)) {
      errorMessage.push("Email is invalid");
    }
    if (answerEmail.value.length > 60) {
      errorMessage.push("Email cannot exceed 60 characters");
    }

    if (errorMessage.length > 0) {
      setError("You must enter the following: " + errorMessage.join(", "));
    }
    if (errorMessage.length === 0) {
      setError([]);
      axios
        .post("/addAnswer", {
          body: answerBody.value,
          name: answerUser.value,
          email: answerEmail.value,
          photos: thumbnails,
          questionId: props.id,
        })
        .then(() => {
          setThumbnails([]);
          props.hide();
          props.update();
        })
        .catch((err) => {
          console.log("ERROR POST ANSWER");
        });
    }
  };

  const photoThumbnail = () => {
    var file = document.querySelector("input[type=file").files[0];
    const form = new FormData();

    form.append("file", file);
    form.append("upload_preset", "lexicon");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/lexicon-atelier/image/upload/",
        form,
        { headers: { "X-Requested-With": "MLHttpRequest" } }
      )
      .then((res) => {
        let newUrl = res.data.secure_url;
        setThumbnails(thumbnails.concat(newUrl));
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  if (!props.show) {
    return null;
  }
  if (thumbnails.length < 5) {
    return (
      <div className="questions-and-answers-modal">
        <div className="answer-thumbnail-modal-content">
          <div className="answers-zoomed-photo-modal-header">
            <div
              aria-label="XButton"
              className="attach-photo-close"
              onClick={() => props.hide()}
            >
              &times;
            </div>
            <h3 className="questions-and-answers-modal-title">
              Submit Your Answer
            </h3>
            <div className="questions-and-answers-modal-subtitle">
              {props.name}: {props.question}
            </div>
          </div>
          <div>
            <form>
              <div className="add-answer-body">
                <label>
                  Your Answer<sup>*</sup>:{" "}
                </label>
                <div>
                  <textarea
                    id="answer-body"
                    maxLength="1000"
                    rows="5"
                    cols="70"
                    required
                  ></textarea>
                </div>
              </div>
              <div>
                <label>
                  Your Username<sup>*</sup>:{" "}
                </label>
                <input
                  id="answer-username"
                  maxLength="60"
                  placeholder="Example: jack543!"
                  required
                ></input>
                <div className="disclaimer">
                  <label>
                    For privacy reasons, do not use your full name or email
                    address
                  </label>
                </div>
              </div>
              <div>
                <label>
                  Your Email<sup>*</sup>:{" "}
                </label>
                <input
                  id="answer-email"
                  maxLength="60"
                  placeholder="jack@email.com"
                  required
                ></input>
                <div className="disclaimer">
                  <label>
                    For authentication reasons, you will not be emailed
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <div>
              <label>Attach Up To Five Photos </label>
              <input
                type="file"
                name="photos"
                onChange={() => photoThumbnail()}
                accept="image/*"
                multiple
              ></input>
            </div>
            <div className="thumbnails">
              {thumbnails.map((src, i) => (
                <AnswerModalThumbnail key={i} src={src} />
              ))}
            </div>
            <div id="error" className="error">
              {error}
            </div>
            <div className="answer-submit-button">
              <button className="answer-button" onClick={() => validateForm()}>
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="questions-and-answers-modal">
        <div className="questions-and-answers-modal-content ">
          <div className="questions-and-answers-modal-header">
            <div
              aria-label="XButton"
              className="attach-photo-close"
              onClick={() => props.hide()}
            >
              &times;
            </div>
            <h4 className="questions-and-answers-modal-title">
              Submit Your Answer
            </h4>
            <div className="questions-and-answers-modal-subtitle">
              {props.name}: {props.question}
            </div>
          </div>
          <div className="questions-and-answers-modal-body">
            <form>
              <div className="add-answer-body">
                <label>
                  Your Answer<sup>*</sup>
                </label>
                <div>
                  <textarea
                    id="answer-body"
                    maxLength="1000"
                    rows="3"
                    cols="100"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="add-answer-nickname">
                <label>
                  Your Username<sup>*</sup>:{" "}
                </label>
                <input
                  lable="privInfo"
                  type="text"
                  maxLength="60"
                  placeholder="Example: jack543!"
                  required
                ></input>
                <div className="disclaimer">
                  <label>
                    For privacy reasons, do not use your full name or email
                    address
                  </label>
                </div>
              </div>
              <div className="add-answer-email">
                <label>
                  Your Email<sup>*</sup>:{" "}
                </label>
                <input
                  id="answer-email"
                  maxLength="60"
                  placeholder="jack@email.com"
                  required
                ></input>
                <div className="disclaimer">
                  <label>
                    For authentication reasons, you will not be emailed
                  </label>
                </div>
              </div>
              <div className="thumbnails">
                {thumbnails.map((src, i) => (
                  <AnswerModalThumbnail key={i} src={src} />
                ))}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <div id="error" className="error">
              {error}
            </div>
            <button className="answer-button" onClick={() => validateForm()}>
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default AnswerModal;

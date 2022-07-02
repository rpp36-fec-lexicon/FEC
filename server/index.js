const express = require("express");
const key = require("../config.js");
const axios = require("axios");
require('dotenv').config();

const app = express();

const myAPIKey = process.env.myAPIKey || key;

const QA = require('./QuestionsAnswers.js')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/public"));
const port = 3000;

const baseAPI = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp`;

app.get("/products/:proID", (req, res) => {
  axios({
    method: "GET",
    url: baseAPI + req.url,
    headers: { Authorization: key.token },
  })
    .then((prodInfo) => {
      res.send(prodInfo.data);
    })
    .catch((err) => res.status(400));
});

app.get("/products/:proID/related", (req, res) => {
  axios({
    method: "GET",
    url: baseAPI + req.url,
    headers: { Authorization: key.token },
  })
    .then((relatedProdIDArray) => {
      res.send(relatedProdIDArray.data);
    })
    .catch((err) => res.status(400));
});


app.get("/products/:proID/styles", (req, res) => {
  axios({
    method: "GET",
    url: baseAPI + req.url,
    headers: { Authorization: key.token },
  })
    .then((relatedProdIDStyles) => {
      // console.log("relatedProdIDStyles", relatedProdIDStyles);
      res.send(relatedProdIDStyles.data);
    })
    .catch((err) => res.status(400));
});




// API CALLS FOR RATINGS AND REVIEWS
app.get('/reviews', (req, res) => {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews');
});

app.get('/reviews/meta', (req, res) => {

});

/*
Routes for Questions API
*/

app.get('/questions', (req, res) => {
  QA.qetQuestionsByProductID(req.query.product_id, cb => {
    res.send(cb);
  })
})


app.listen(port, () => {
  // console.log(`listening on ${port}`)
  // console.log('git', key.FEC_Token)
});

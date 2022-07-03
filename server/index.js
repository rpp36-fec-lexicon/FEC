require('dotenv').config();
const express = require("express");
// const key = require("../config.js").TOKEN;
const axios = require("axios");
const QA = require('./QuestionsAnswers.js')
const app = express();
const myAPIKey = process.env.myAPIKey;
const port = 3000;
const baseAPI = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp`;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/public"));

app.get("/products/:proID", (req, res) => {
  axios({
    method: "GET",
    url: baseAPI + req.url,
    headers: { Authorization: myAPIKey },
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
    headers: { Authorization: myAPIKey },
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
    headers: { Authorization: myAPIKey },
  })
    .then((relatedProdIDStyles) => {
      // console.log("relatedProdIDStyles", relatedProdIDStyles);
      res.send(relatedProdIDStyles.data);
    })
    .catch((err) => res.status(400));
});




// API CALLS FOR RATINGS AND REVIEWS
app.get('/reviews', (req, res) => {
  const productId = req.query.productId;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productId}`,
    { headers: {
      'Authorization': key
    }})
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(404).send('error fetching reviews');
    })
});

app.get('/reviews/meta', (req, res) => {
  const productId = req.query.productId;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${productId}`,
    {headers: {
      'Authorization': key
    }})
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(404).send('error getting meta');
    })
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

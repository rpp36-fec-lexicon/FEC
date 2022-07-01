require('dotenv').config();
const express = require('express');
const app = express();
const myAPIKey = process.env.myAPIKey;
const axios = require('axios');
const QA = require('./QuestionsAnswers.js');
const data = require('./product.js');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/public'));
const port = 3000;

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

/*
Route for Products API
*/

app.get('/products', (req, res) => {
  data.getProducts((err, data) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send(err);
    } else {
      console.log(data);
      res.status(200);
      res.send(data);
    }
  });
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
  // console.log('git', key.FEC_Token)
});

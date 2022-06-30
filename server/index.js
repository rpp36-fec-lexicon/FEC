require('dotenv').config();
const express = require('express');
const app = express();
const key = require('../config.js');
const myAPIKey = process.env.myAPIKey || key;
const axios = require('axios');
const QA = require('./QuestionsAnswers.js')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/public'));
const port = 3000;
const axios = require('axios');

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
  console.log(`listening on ${port}`)
  // console.log('git', key.FEC_Token)
});

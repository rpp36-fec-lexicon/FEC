require('dotenv').config();
const express = require('express');
const key = require('../config.js').TOKEN;
const app = express();
const myAPIKey = process.env.myAPIKey || key;
const QA = require('./QuestionsAnswers.js')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/public'));
const port = 3000;



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
  console.log(`listening on ${port}`)
  // console.log('git', key.FEC_Token)
});

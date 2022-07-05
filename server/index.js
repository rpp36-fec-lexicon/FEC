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
  const productId = req.query.productId;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productId}`,
    { headers: {
      'Authorization': myAPIKey
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
      'Authorization': myAPIKey
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

app.post('/products/:product_id', (req, res) => {
  console.log(req.body.productId);
  // res.render('products' + req.body.productId);
  data.getProductInfo(req.body.productId, (err, data) => {
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

const express = require('express');
const app = express();

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


app.listen(port, () => {
  console.log(`listening on ${port}`)
});

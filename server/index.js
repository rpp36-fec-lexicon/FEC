const express = require('express');
const key = require('../config.js')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/public'));
const port = 3000;

app.get('/', (req, res) => {
  console.log('in here??');
});

app.listen(port, () => {
  console.log(`listening on ${port}`)
  // console.log('git', key.FEC_Token)
});

const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();
const myAPIKey = process.env.myAPIKey;
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'

const getProducts = (cb) => {
  const config ={
    method: 'GET',
    url: url + `/products`,
    headers: { 'Authorization': myAPIKey}
  };
  axios(config)
  .then((res) => {
     cb(null, res.data);
  })
  .catch((error) => {
    console.log('problem with GET products request');
    cb(error);
  });
}

module.exports= {
  getProducts
}
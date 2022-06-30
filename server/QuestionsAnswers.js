const axios = require('axios')
const myAPIKey = process.env.myAPIKey;
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/'

const qetQuestionsByProductID = (productID, cb) => {
  const config ={
    method: 'GET',
    url: url + `qa/questions?product_id=${productID}&count=100`,
    headers: { Authorization: myAPIKey}
  };
  axios(config)
  .then(res => {
    return cb(res.data);
  })
  .catch(() => {
    console.log('problem with GET qa/questions request');
  });
}

module.exports= {
    qetQuestionsByProductID
}
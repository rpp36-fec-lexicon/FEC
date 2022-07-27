// const axios = require('axios');
// const baseAPI = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
// const myAPIKey = process.env.myAPIKey;

const logInteractions = (userEventData) => {

  axios.post(`${baseAPI}/interactions`, userEventData, {
    headers: {
      Authorization: myAPIKey,
    },
  })
    .then((res) => {
      console.log('interaction successful', res.status);
    })
    .catch((err) => {
      console.log('interaction failed', err);
    });
};

module.exports = {
  logInteractions
};
const axios = require('axios');
const myAPIKey = process.env.myAPIKey;
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

const qetQuestionsByProductID = (productID, cb) => {
  const config = {
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
};

const addQuestion = (question) => {
  const questionData = {
    body: question.body,
    name: question.name,
    email: question.email,
    product_id: question.product_id,
  };

  axios.post(`${url}qa/questions`, questionData, {
    headers: {
      Authorization: myAPIKey,
    },
  })
    .then(() => {
      // console.log('Question was posted');
    })
    .catch(() => {
      // console.log('error');
    });
};

const interact = (info) => {
  const data = {
    element: info.element,
    widget: info.widget,
    time: info.time,
  };
  axios.post(`${url}interactions`, data, {
    headers: {
      Authorization: myAPIKey
    },
  })
    .then(() => {
    })
    .catch(() => {
      console.log('interaction error');
    });
};

module.exports = {
  qetQuestionsByProductID,
  addQuestion,
  interact
};
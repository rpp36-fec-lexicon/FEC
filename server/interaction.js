const logInteractions = (data) => {
  const params = {
    element: data.element,
    widget: data.widget,
    time: data.time,
  };
  axios.post(`${baseAPI}interactions`, params, {
    headers: {
      Authorization: myAPIKey,
    },
  })
    .then(() => {
      console.log('interaction successful');
    })
    .catch(() => {
      console.log('interaction failed');
    });
};

module.exports = {
  logInteractions
};
const express = require("express");
const key = require("../config.js");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/public"));
const port = 3000;
const baseAPI = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp`;

app.get("/products/:proID", (req, res) => {
  axios({
    method: "GET",
    url: baseAPI + req.url,
    headers: { Authorization: key.token },
  })
    .then((prodInfo) => {
      res.send(prodInfo.data);
    })
    .catch((err) => res.status(400));
});

app.get("/products/:proID/related", (req, res) => {
  axios({
    method: "GET",
    url: baseAPI + req.url,
    headers: { Authorization: key.token },
  })
    .then((relatedProdIDArray) => {
      res.send(relatedProdIDArray.data);
    })
    .catch((err) => res.status(400));
});


app.get("/products/:proID/styles", (req, res) => {
  axios({
    method: "GET",
    url: baseAPI + req.url,
    headers: { Authorization: key.token },
  })
    .then((relatedProdIDStyles) => {
      // console.log("relatedProdIDStyles", relatedProdIDStyles);
      res.send(relatedProdIDStyles.data);
    })
    .catch((err) => res.status(400));
});






app.listen(port, () => {
  // console.log(`listening on ${port}`)
  // console.log('git', key.FEC_Token)
});

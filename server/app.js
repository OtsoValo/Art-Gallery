// const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  next();
});
app.use(express.static(path.resolve(__dirname, '/public')));

app.get('/api/favicon.png', function (req, res) {
  let faviconSrc = path.resolve(__dirname, 'public/img/favicon.png');
  res.sendFile(faviconSrc);
});
app.get('/api/hello', function (req, res) {
  res.send('GET request to say hi');
});

app.listen(9010, () => {
  console.log('app is listening at port:9010');
});

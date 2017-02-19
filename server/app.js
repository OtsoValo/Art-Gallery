// const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const mps = require('./serial');
const smallmps = require('./smallmps');

app.use(function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  next();
});

// app.use(express.static(path.resolve(__dirname, '/public')));

app.get('/api/hello', function (req, res) {
  res.send('GET request to say hi');
});

app.get('/api/masterpiece', function(req, res){
  let imgName = req.query.id + '.jpg';
  let imgSrc = path.resolve(__dirname, '../prepare/masterpieces/', imgName);
  res.sendFile(imgSrc);
});

app.get('/api/smallmps', function(req, res){
  let imgName = req.query.id + '.jpg';
  let imgSrc = path.resolve(__dirname, '../prepare/small_mps/', imgName);
  res.sendFile(imgSrc);
});

app.get('/api/masterpieces', function(req, res){
  res.json(mps);
});

app.get('/api/smallmpsList', function(req, res){
  res.json(smallmps);
});

app.listen(9010, () => {
  console.log('app is listening at port:9010');
});

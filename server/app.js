// const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const mps = require('./serial');
const smallmps = require('./smallmps');

const totalCount = smallmps.length;

app.use(function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  next();
});

// app.use(express.static(path.resolve(__dirname, '/public')));
// 返回粒子效果配置
app.get('/api/particle', function (req, res) {
  let jsonSrc = path.resolve(__dirname, './repo/particles.json');
  res.sendFile(jsonSrc);
});
// 返回单项完整图片
app.get('/api/masterpiece', function (req, res) {
  let imgName = req.query.id + '.jpg';
  let imgSrc = path.resolve(__dirname, '../prepare/masterpieces/', imgName);
  res.sendFile(imgSrc);
});
// 返回单项缩略图
app.get('/api/smallmps', function (req, res) {
  let imgName = req.query.id + '.jpg';
  let imgSrc = path.resolve(__dirname, '../prepare/small_mps/', imgName);
  res.sendFile(imgSrc);
});
// 返回完整图片路径列表
app.get('/api/masterpiece/list', function (req, res) {
  res.json(mps);
});
// 返回缩略图路径列表
app.get('/api/smallmps/list', function (req, res) {
  let size = parseInt(req.query.size) || 8;
  let page = parseInt(req.query.page) || 0;
  let from = page * size;
  let to = (page + 1) * size;
  res.json({
    totalCount: totalCount,
    from: from,
    to: to,
    listData: smallmps.slice(from, to)
  });
});

app.listen(9010, () => {
  console.log('app is listening at port:9010');
});

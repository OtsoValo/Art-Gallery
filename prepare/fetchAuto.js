/**
 * 根据serial.txt从百度百科或维基百科中爬取相关数据
 */
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const path = require('path');

const baike = {
  _: 'http://baike.baidu.com/item/'
}
const wiki = {
  _: 'https://zh.wikipedia.org/wiki/'
};
const youhuaaa = {
  _: 'http://www.youhuaaa.com/search.php'
};

const baseTxtPath = path.resolve(__dirname, 'serial.txt');
const paintBasePath = path.resolve(__dirname, 'serialDetail');

fs.readFile(baseTxtPath, 'utf8', function (err, data) {
  if (err) throw err;
  let paintList = data.split('\n');
  paintList.forEach(function (item) {
    let splitArr = item.split(' ');
    let [serial, author, paint] = splitArr;
    serial = serial.slice(3);
    let url = baike._ + encodeURIComponent(paint);
    if (serial.length > 0) {
      // fetchFullMsg(url, { serial, author, paint });
    }
  });
});
function fetchFullMsg(url, opt) {
  request(url, { encoding: 'utf8' }, function (err, resp, body) {
    if (!err && resp.statusCode === 200) {
      let $ = cheerio.load(body);
      let txt = $('.para').text();
      log('Text preview: ' + txt.slice(0, 10) + '...');
      if (txt.length > 0) {
        let txtPath = path.resolve(paintBasePath, opt.serial + '.txt');
        fs.writeFileSync(txtPath, txt);
        log('Fetched ' + [opt.serial, opt.author, opt.paint].join(', '));
      }
    }
  });
}
function log(...args) {
  console.log(...args);
}

// request.post({ url: youhuaaa._, form: {SKeyword: '呐喊'} }, function(err, resp, body){
// });

// fetchFullMsg('http://baike.baidu.com/item/%E7%94%9F%E6%B4%BB%E7%9A%84%E6%AC%A2%E4%B9%90', {serial: 1999});
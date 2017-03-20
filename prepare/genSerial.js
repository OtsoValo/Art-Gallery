const fs = require('fs');
const path = require('path');

const begin = 1043;
const end = 1300;
const sym = '<$>';

const serialTxt = path.resolve(__dirname, 'serial.txt');
fs.stat(serialTxt, function (err, stats) {
  if (err) {
    let cnt = begin;
    while (cnt <= end) {
      fs.writeFileSync(serialTxt, sym + cnt + '\n', {flag: 'a'});
      cnt++;
    }
  };
  console.log(stats);
});

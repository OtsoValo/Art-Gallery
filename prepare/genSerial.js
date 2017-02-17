// 生成序列号文件
const fs = require('fs');
const path = require('path');

const B = 1043;
const E = 1300;
const SYM = '<$>';

const serialTxt = path.resolve(__dirname, 'serial.txt');
fs.stat(serialTxt, function (err, stats) {
  if (err) {
    let cnt = B;
    while (cnt <= E) {
      fs.writeFileSync(serialTxt, SYM + cnt + '\n', {flag: 'a'});
      cnt++;
    }
  };
  console.log(stats);
});

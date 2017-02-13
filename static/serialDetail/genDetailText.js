// 生成序列号文件
const fs = require('fs');
const path = require('path');
const baseFile = path.resolve(__dirname, '../serial.txt');

fs.readFile(baseFile, 'utf8', (err, data) => {
  if (err) { throw err; }
  let paintList = data.split('\n');
  paintList.forEach((item) => {
    let itemStr = item.trim().slice(3);
    let serial = itemStr.split(' ')[0];
    let detailText = path.resolve(__dirname, serial + '.txt');
    fs.stat(detailText, function (err, stats) {
      if (err) {
        fs.writeFileSync(detailText, itemStr + '\n', { flag: 'a' });
        console.log(['序列#', itemStr, ' >>>文件创建完成'].join(''));
      }
    });
  });
});

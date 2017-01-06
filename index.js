var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.createConnection('localhost','AGdata');

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
  //一次打开记录
  console.log("Already Open");
});
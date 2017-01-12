const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  next();
});
app.use(express.static(__dirname + '/public'));

app.get('/api/hello', function (req, res) {
  console.log('requesting hello');
  res.send('GET request to say hi');
});

app.listen(9010, () => {
  console.log('app is listening at port:9010');
});
const mongoose = require('mongoose');
const models = require('./models');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/artoex');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connect to database: artoex');
});

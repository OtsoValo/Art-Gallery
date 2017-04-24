const mongoose = require('mongoose');
const models = require('./models');
mongoose.connect('mongodb://localhost:27017/artoex');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connect to database: artoex');
	// let yiro = new models.User({
	// 	account: 'yiro2',
	// 	gender: 'f',
	// 	age: 21,
	// 	pwd: 'yiro0818',
	// 	email: '18814128288@163.com'
	// })

	// yiro.save((err, yiro) => {
	// 	if (err) return console.error(err)
	// 	console.log('yiro save: ', yiro)
	// })

	// yiro.findAllEmail((err, emails) => {
	// 	console.log(emails);
	// })
})
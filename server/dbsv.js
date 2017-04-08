const mongoose = require('mongoose')
const models = require('./models')
mongoose.connect('mongodb://localhost:27017/artoex')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
	console.log('connect to database: artoex')

	let yiro = new models.User({
		account: 'yiro',
		gender: 'm',
		age: 22,
		pwd: 'yiro0817',
		email: '18814128243@163.com'
	})
	
	yiro.save((err, yiro) => {
		if (err) return console.error(err)
		console.log('yiro save: ', yiro)
	})
})
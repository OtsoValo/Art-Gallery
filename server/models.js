const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	account: String,
	gender: String,
	age: Number,
	pwd: String,
	email: String
})
UserSchema.methods.findAllEmail = function (cb) {
	return this.model('User').find({ email: this.email }, cb)
}
UserSchema.statics.findByAcc = function (account, cb) {
	return this.find({ account: new RegExp(account, "i") }, cb)
}

const PaintingSchema = mongoose.Schema({
	url: String,
	name: String,
	artist: String,
	size: {
		width: Number,
		height: Number,
		rule: String
	},
	age: {
		year: Number,
		month: Number
	},
	style: {
		type: String,
		default: '未知~'
	},
	descr: {
		type: String,
		default: '木有找到~'
	},
	site: {
		type: String,
		default: '木有找到~'
	},
	comments: [{ body: String, date: Date, userId: String }]
})

module.exports = {
	User: mongoose.model('User', UserSchema),
	Painting: mongoose.model('Painting', PaintingSchema)
}
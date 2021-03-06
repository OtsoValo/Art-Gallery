const mongoose = require('mongoose');

// 用户模型
const UserSchema = mongoose.Schema({
	account: String,
	pwd: String,
	email: String
});

// 艺术家模型
const ArtistSchema = mongoose.Schema({
	name: String,
	im: String,
	imMin: String,
	birth: Date,
	death: Date,
	intro: String,
	bigStories: [
		{ time: String, content: String }
	],
	works: Array
});

// 绘画模型
const PaintingSchema = mongoose.Schema({
	name: String,
	im: String,
	imMin: String,
	voice: String,
	// 艺术家的id
	aid: String,
	author: String,
	size: {
		width: Number,
		height: Number,
		rule: String
	},
	begin: Date,
	end: Date,
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
	}
});

module.exports = {
	User: mongoose.model('User', UserSchema),
	Artist: mongoose.model('Artist', ArtistSchema),
	Painting: mongoose.model('Painting', PaintingSchema)
}
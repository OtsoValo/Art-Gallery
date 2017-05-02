const mongoose = require('mongoose');

// 暂不做用户登录权限
const UserSchema = mongoose.Schema({
	account: String,
	gender: String,
	age: Number,
	pwd: String,
	email: String
});

// 艺术家
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
	// 该艺术家作品的id集合
	works: Array
});

ArtistSchema.statics.findByName = function(name, cb){
	return this.find({ name: new RegExp(name, 'ig')}, cb);
};

// 绘画
const PaintingSchema = mongoose.Schema({
	name: String,
	im: String,
	imMin: String,
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
})

module.exports = {
	User: mongoose.model('User', UserSchema),
	Artist: mongoose.model('Artist', ArtistSchema),
	Painting: mongoose.model('Painting', PaintingSchema)
}
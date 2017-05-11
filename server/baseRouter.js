/**
 * 基本路由（游客和登录用户）
 */
const baseRouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const models = require('./models');
const CODE = require('./code');
const API = require('./api');

// 返回上传图片路径
baseRouter.get(API.GET_IMG, (req, res) => {
	const fileName = req.query.file;
	let filePath = path.resolve(__dirname, '../static/uploads/', fileName);
	fs.access(filePath, err => {
		if (err) { filePath = path.resolve(__dirname, '../static/backup/anonymous.jpg') };
		res.sendFile(filePath);
	});
});

// 单首音频文件
baseRouter.get(API.GET_AUDIO, (req, res) => {
	const fn = req.query.fn;
	res.sendFile(path.resolve(__dirname, '../static/voice/', `${fn}.mp3`));
})

// 单张缩略图
baseRouter.get(API.GET_THUMB, (req, res) => {
	const id = req.query.id;
	res.sendFile(path.resolve(__dirname, 'thumbnails', `${id}.jpg`));
});

// 单张画作
baseRouter.get(API.GET_SINGLE_PAINTING, (req, res) => {
	const id = req.query.id;
	res.sendFile(path.resolve(__dirname, '../static/paintings/', `${id}.jpg`));
});

// 轮播使用
baseRouter.get(API.GET_CAROUSEL_PAITINGS, (req, res) => {
	const size = req.query.size;
	let ary = [];
	models.Painting.find({}, (err, paintings) => {
		if (err) {
			res.json({
				code: CODE.ERROR,
				data: []
			});;
		} else {
			ary = _.sampleSize(paintings, size);
			res.json({
				code: CODE.SUCCESS,
				data: ary
			});
		}
	})
});

// 缩略图使用
baseRouter.get(API.GET_PAGE_PAINTINGS, (req, res) => {
	const page = req.query.page;
	const pageSize = req.query.pageSize;
	const range = [(page - 1) * pageSize, page * pageSize];
	models.Painting.find({}, (err, paintings) => {
		if (err) {
			res.json({
				code: CODE.ERROR,
				total: 0,
				data: []
			});
		} else {
			let total = paintings.length;
			let rawAry = _.slice(paintings, range[0], range[1]);
			res.json({
				code: CODE.SUCCESS,
				total: total,
				data: rawAry
			});
		}
	});
});

// 所有艺术家
baseRouter.get(API.GET_ALL_ARTISTS, (req, res) => {
	const idImAry = [];
	models.Artist.find({}, (err, artists) => {
		if (err) {
			res.json({
				code: CODE.ERROR,
				data: []
			});
		} else {
			artists.forEach(artist => {
				idImAry.push({
					name: artist.name,
					id: artist._id,
					imMin: artist.imMin
				});
			});
			res.json({
				code: CODE.SUCCESS,
				data: idImAry
			});
		}
	});
});

// 某画作所有信息
baseRouter.get(API.GET_PAITING_INFO, (req, res) => {
	const id = req.query.id;
	models.Painting.findById(id, (err, painting) => {
		if (err) {
			res.json({
				code: CODE.ERROR,
				data: {}
			});
		} else {
			res.json({
				code: CODE.SUCCESS,
				data: painting
			});
		}
	});
});

// 某艺术家所有信息
baseRouter.get(API.GET_ARTIST_INFO, (req, res) => {
	const id = req.query.id;
	models.Artist.findById(id, (err, artist) => {
		if (err) {
			res.json({
				code: CODE.ERROR,
				data: {}
			});
		} else {
			res.json({
				code: CODE.SUCCESS,
				data: artist
			});
		}
	});
});

module.exports = baseRouter;

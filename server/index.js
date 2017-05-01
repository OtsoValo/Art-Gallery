const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

const _ = require('lodash');

// 数据库处理
const dbsv = require('./dbsv');
const models = require('./models');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let start = 1043;
let end = 1300;

const CODE = {
	SUCCESS: 200,
	ERROR: 500
};
const uploadSavePath = path.resolve(__dirname, '../static/uploads');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadSavePath);
	},
	filename: function (req, file, cb) {
		let affix = /\.[^\.]+$/.exec(file.originalname)[0];
		cb(null, `${file.fieldname}-${Date.now()}${affix}`);
	}
});
const upload = multer({ storage: storage });

app.use(function (req, res, next) {
	res.set({
		'Access-Control-Allow-Origin': '*'
	});
	next();
});

// 单张缩略图
app.get('/view/thumbnail', (req, res) => {
	const id = req.query.id;
	res.sendFile(path.resolve(__dirname, 'thumbnails', `${id}.jpg`));
});

// 单张画作
app.get('/view/painting', (req, res) => {
	const id = req.query.id;
	res.sendFile(path.resolve(__dirname, '../static/paintings/', `${id}.jpg`));
});

// 轮播使用
app.get('/view/paintingList', (req, res) => {
	const size = req.query.size;
	let ary = [];
	models.Painting.find({}, function (err, paintings) {
		if (err) {
			res.json({
				code: CODE.ERROR,
				data: []
			});
			return;
		}
		ary = _.sampleSize(paintings, size);
		res.json({
			code: CODE.SUCCESS,
			data: ary
		});
	})
});

// 缩略图使用
app.get('/view/thumbnailList', (req, res) => {
	const page = req.query.page;
	const pageSize = req.query.pageSize;
	const range = [(page - 1) * pageSize + start, page * pageSize + start];
	const ary = [];
	for (let i = range[0]; i < range[1]; i++) {
		if (i > end) continue;
		ary.push(`/view/thumbnail?id=${i}`);
	}
	res.json({
		total: end - start,
		data: ary
	});
});

// 所有艺术家
app.get('/view/artists', (req, res) => {
	const idImAry = [];
	models.Artist.find({}, function (err, artists) {
		if (err) {
			res.json({
				code: CODE.ERROR,
				data: []
			});
			return;
		}
		artists.forEach(artist => {
			idImAry.push({
				name: artist.name,
				id: artist._id,
				im: artist.im
			});
		});
		res.json({
			code: CODE.SUCCESS,
			data: idImAry
		});
	});
});

// 某艺术家所有信息（先模拟假数据好了）
app.get('/view/artistInfo', (req, res) => {
	const id = req.query.id;
	models.Artist.findById(id, function (err, artist) {
		let code = CODE.SUCCESS;
		if (err) {
			code = CODE.ERROR
		}
		res.json({
			code: code,
			data: artist
		});
	});
});

// 接收画作图片上传
app.post('/view/fileUpload/painting', upload.single('painting'), (req, res) => {
	const filename = req.file.filename;
	res.json({
		code: CODE.SUCCESS,
		data: `/view/uploadImg?file=${filename}`
	});
});

// 接收艺术家图片上传
app.post('/view/fileUpload/artist', upload.single('artist'), (req, res) => {
	const filename = req.file.filename;
	res.json({
		code: CODE.SUCCESS,
		data: `/view/uploadImg?file=${filename}`
	});
});

// 返回上传图片路径
app.get('/view/uploadImg', (req, res) => {
	const filename = req.query.file;
	let filepath = path.resolve(__dirname, '../static/uploads/', filename);
	fs.access(filepath, err => {
		if (err) { filepath = path.resolve(__dirname, '../static/backup/anonymous.jpg') };
		res.sendFile(filepath);
	});
});

// 存入画作
app.post('/view/newPainting', (req, res) => {
	const onePainting = new models.Painting(req.body);
	onePainting.save((err, painting) => {
		let code = CODE.SUCCESS;
		if (err) {
			code = CODE.ERROR
		}
		res.json({
			code: code,
			data: painting
		});
	});
});

// 存入艺术家
app.post('/view/newArtist', (req, res) => {
	const oneArtist = new models.Artist(req.body);
	oneArtist.save((err, artist) => {
		let code = CODE.SUCCESS;
		if (err) {
			code = CODE.ERROR
		}
		res.json({
			code: code,
			data: artist
		});
	})
});

// 修改画作
app.patch('view/editArtist', (req, res) => {

});

// 修改艺术家
app.patch('view/editPainting', (req, res) => {

});

app.listen(9010, () => {
	console.log('app is listening at port:9010');
});

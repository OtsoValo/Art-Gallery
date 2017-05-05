const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

const _ = require('lodash');
const images = require('images');
// 数据库处理
const dbsv = require('./dbsv');
const models = require('./models');
const generateVoice = require('./voiceFactory');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CODE = {
	SUCCESS: 200,
	ERROR: 500
};
const MIN_QUAL = 80;
const MIN_WIDTH = 300;

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
	models.Painting.find({}, (err, paintings) => {
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
	const range = [(page - 1) * pageSize, page * pageSize];
	models.Painting.find({}, (err, paintings) => {
		let total = paintings.length;
		let rawAry = _.slice(paintings, range[0], range[1]);
		res.json({
			total: total,
			data: rawAry
		});
	});
});

// 所有艺术家
app.get('/view/artists', (req, res) => {
	const idImAry = [];
	models.Artist.find({}, (err, artists) => {
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
				imMin: artist.imMin
			});
		});
		res.json({
			code: CODE.SUCCESS,
			data: idImAry
		});
	});
});

// 某画作所有信息
app.get('/view/paintingInfo', (req, res) => {
	const id = req.query.id;
	models.Painting.findById(id, (err, painting) => {
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

// 某艺术家所有信息
app.get('/view/artistInfo', (req, res) => {
	const id = req.query.id;
	models.Artist.findById(id, (err, artist) => {
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

// 接收画作图片上传并实现压缩制作缩略图
app.post('/view/fileUpload/painting', upload.single('painting'), (req, res) => {
	const fileName = req.file.filename;
	const filePath = req.file.path;
	const affix = /\.[^\.]+$/.exec(fileName)[0];
	const timestamp = /\d+/ig.exec(fileName)[0];
	const minFileName = `${req.file.fieldname}-${timestamp}-min${affix}`;
	images(filePath).size(MIN_WIDTH).save(path.resolve(uploadSavePath, minFileName), { quality: MIN_QUAL });
	res.json({
		code: CODE.SUCCESS,
		data: `/view/uploadImg?file=${fileName}`,
		minData: `/view/uploadImg?file=${minFileName}`
	});
});

// 接收艺术家图片上传并实现压缩制作缩略图
app.post('/view/fileUpload/artist', upload.single('artist'), (req, res) => {
	const fileName = req.file.filename;
	const filePath = req.file.path;
	const affix = /\.[^\.]+$/.exec(fileName)[0];
	const timestamp = /\d+/ig.exec(fileName)[0];
	const minFileName = `${req.file.fieldname}-${timestamp}-min${affix}`;
	images(filePath).size(MIN_WIDTH).save(path.resolve(uploadSavePath, minFileName), { quality: MIN_QUAL });
	res.json({
		code: CODE.SUCCESS,
		data: `/view/uploadImg?file=${fileName}`,
		minData: `/view/uploadImg?file=${minFileName}`
	});
});

// 返回上传图片路径
app.get('/view/uploadImg', (req, res) => {
	const fileName = req.query.file;
	let filePath = path.resolve(__dirname, '../static/uploads/', fileName);
	fs.access(filePath, err => {
		if (err) { filePath = path.resolve(__dirname, '../static/backup/anonymous.jpg') };
		res.sendFile(filePath);
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

// 修改艺术家
app.patch('/view/editArtist', (req, res) => {
	const theArtist = req.body;
	const aid = theArtist._id;
	models.Artist.update({ _id: aid }, theArtist, (err) => {
		let code = CODE.SUCCESS;
		if (err) code = CODE.ERROR;
		res.json({
			code: code
		});
	});
});

// 修改画作
app.patch('/view/editPainting', (req, res) => {
	const thePainting = req.body;
	const pid = thePainting._id;
	models.Painting.update({ _id: pid }, thePainting, (err) => {
		let code = CODE.SUCCESS;
		if (err) code = CODE.ERROR;
		res.json({
			code: code
		});
	})
});

// 删除某个艺术家，及其对应的所有画作
app.delete('/view/deleteArtist', (req, res) => {
	const aid = req.query.aid;
	models.Artist.findByIdAndRemove({ _id: aid }, (err) => {
		let code = CODE.SUCCESS;
		if (err) code = CODE.ERROR;
		res.json({
			code: code
		});
	});
});

// 删除某幅画作
app.delete('/view/deletePainting', (req, res) => {
	const pid = req.query.pid;
	models.Painting.findByIdAndRemove({ _id: pid }, (err) => {
		let code = CODE.SUCCESS;
		if (err) code = CODE.ERROR;
		res.json({
			code: code
		});
	});
});

app.listen(9010, () => {
	console.log('app is listening at port:9010');
});

const express = require('express');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const multer = require('multer');

const _ = require('lodash');
const images = require('images');
const session = require('express-session');

// 数据库处理
const dbsv = require('./dbsv');
const models = require('./models');
const generateVoice = require('./voiceFactory');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.enable('trust proxy');
app.use(session({
	secret: 'special key',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true, maxAge: 1000 * 60 * 60 }
}));

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

// 来来来用户注册
app.post('/view/user/regist', (req, res) => {
	new models.User(req.body).save((err, user) => {
		if (err) {
			res.json({
				code: CODE.ERROR,
				data: {}
			});
		} else {
			res.json({
				code: CODE.SUCCESS,
				data: user
			});
		}
	});
});

// 来来来用户登录
app.post('/view/user/login', (req, res) => {
	const account = req.body.account;
	const pwd = req.body.pwd;
	const uid = req.body.uid
	// 检查用户账号和密码是否和数据库中相匹配
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

// 单首音频文件
app.get('/view/audio', (req, res) => {
	const fn = req.query.fn;
	res.sendFile(path.resolve(__dirname, '../static/voice/', `${fn}.mp3`));
})

// 轮播使用
app.get('/view/paintingList', (req, res) => {
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
app.get('/view/thumbnailList', (req, res) => {
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
app.get('/view/artists', (req, res) => {
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
app.get('/view/paintingInfo', (req, res) => {
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
app.get('/view/artistInfo', (req, res) => {
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

// 语音生成
function makeVoiceText(vod) {
	return `画作《${vod.name}》由艺术家${vod.author}于${new Date(vod.begin).getFullYear()}年到${new Date(vod.end).getFullYear()}年创作。艺术创作风格为${vod.style}，尺寸${vod.size.width}乘以${vod.size.height}${vod.size.rule}，现收藏于${vod.site}······
	关于此画作，${vod.descr}`;
}

// 存入画作
app.post('/view/newPainting', (req, res) => {
	const voiceSpeed = req.body.voiceSpeed;
	const voiceName = (_.values(querystring.parse(req.body.im))[0]).split('.')[0];
	const voiceText = makeVoiceText(req.body);
	const onePainting = _.cloneDeep(req.body);
	generateVoice(voiceText, voiceName + '.mp3', voiceSpeed);
	onePainting.voice = `/view/audio?fn=${voiceName}`;
	delete onePainting.voiceSpeed;
	new models.Painting(onePainting).save((err, painting) => {
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

// 存入艺术家
app.post('/view/newArtist', (req, res) => {
	const oneArtist = new models.Artist(req.body);
	oneArtist.save((err, artist) => {
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
	})
});

// 修改艺术家
app.patch('/view/editArtist', (req, res) => {
	const theArtist = req.body;
	const aid = theArtist._id;
	models.Artist.update({ _id: aid }, theArtist, (err) => {
		if (err) {
			res.json({
				code: CODE.ERROR
			});
		} else {
			res.json({
				code: CODE.SUCCESS
			});
		}
	});
});

// 修改画作
app.patch('/view/editPainting', (req, res) => {
	const voiceSpeed = req.body.voiceSpeed;
	const voiceName = (_.values(querystring.parse(req.body.im))[0]).split('.')[0];
	const voiceText = makeVoiceText(req.body);
	const thePainting = _.cloneDeep(req.body);
	const pid = thePainting._id;
	generateVoice(voiceText, voiceName + '.mp3', voiceSpeed);
	thePainting.voice = `/view/audio?fn=${voiceName}`;
	delete thePainting.voiceSpeed;
	models.Painting.update({ _id: pid }, thePainting, (err) => {
		if (err) {
			res.json({
				code: CODE.ERROR
			});
		} else {
			res.json({
				code: CODE.SUCCESS
			});
		}
	})
});

// 抽取删除图片公共函数
function deleteLocalFile(query_im, query_imMin, delete_voice = false) {
	const im_name = _.values(querystring.parse(decodeURIComponent(query_im)))[0];
	const imMin_name = _.values(querystring.parse(decodeURIComponent(query_imMin)))[0];
	const im_path = path.resolve(__dirname, '../static/uploads/', im_name);
	const imMin_path = path.resolve(__dirname, '../static/uploads/', imMin_name);
	fs.unlink(im_path);
	fs.unlink(imMin_path);
	if (delete_voice) {
		const voice_path = path.resolve(__dirname, '../static/voice/', im_name.split('.')[0] + '.mp3');
		fs.unlink(voice_path);
	}
}

// 删除某个艺术家，及其对应的所有画作及其图片
app.delete('/view/deleteArtist', (req, res) => {
	const aid = req.query.aid;
	deleteLocalFile(req.query.im, req.query.imMin);
	models.Artist.findByIdAndRemove({ _id: aid }, (err) => {
		if (err) {
			res.json({
				code: CODE.ERROR
			});
		} else {
			res.json({
				code: CODE.SUCCESS
			});
			// 为了对应把画作的图片及音频删掉也是累啊
			models.Painting.find({ aid: aid }, (err, p) => {
				if (err) return;
				p.forEach(obj => {
					deleteLocalFile(obj.im, obj.imMin);
				})
				// 最后再把数据库里相关数据删掉
				models.Painting.deleteMany({ aid: aid }, (err) => {
					if (err) return;
					console.log(`已删除该艺术家（id：${aid}）的所有作品`);
				});
			});
		}

	});
});

// 删除某幅画作以及其图片
app.delete('/view/deletePainting', (req, res) => {
	const pid = req.query.pid;
	deleteLocalFile(req.query.im, req.query.imMin, true);
	models.Painting.findByIdAndRemove({ _id: pid }, (err) => {
		if (err) {
			res.json({
				code: CODE.ERROR
			});
		} else {
			res.json({
				code: CODE.SUCCESS
			});
		}
	});
});

app.listen(9010, () => {
	console.log('app is listening at port:9010');
});

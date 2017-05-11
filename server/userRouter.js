/**
 * 已登录用户请求路由
 */
const userRouter = require('express').Router();
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const querystring = require('querystring');
const multer = require('multer');
const images = require('images');
const generateVoice = require('./voiceFactory');
const models = require('./models');
const CODE = require('./code');
const API = require('./api');

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

// 接收画作图片上传并实现压缩制作缩略图
userRouter.post(API.PAINTING_IMG_UPLOAD, upload.single('painting'), (req, res) => {
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
userRouter.post(API.ARTIST_IMG_UPLOAD, upload.single('artist'), (req, res) => {
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

// 语音生成
function makeVoiceText(vod) {
	return `画作《${vod.name}》由艺术家${vod.author}于${new Date(vod.begin).getFullYear()}年到${new Date(vod.end).getFullYear()}年创作。艺术创作风格为${vod.style}，尺寸${vod.size.width}乘以${vod.size.height}${vod.size.rule}，现收藏于${vod.site}······
	关于此画作，${vod.descr}`;
}

// 存入画作
userRouter.post(API.NEW_PAINTING, (req, res) => {
	const voiceSpeed = req.body.voiceSpeed;
	const voiceName = (_.values(querystring.parse(req.body.im))[0]).split('.')[0];
	const voiceText = makeVoiceText(req.body);
	const onePainting = _.cloneDeep(req.body);
	generateVoice(voiceText, voiceName + '.mp3', voiceSpeed);
	onePainting.voice = `/view/audio?fn=${voiceName}`;
	if(onePainting.style.length === 0) onePainting.style = '未知';
	if(onePainting.descr.length === 0) onePainting.descr = '暂无描述。';
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
userRouter.post(API.NEW_ARTIST, (req, res) => {
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
userRouter.patch(API.EDIT_ARTIST, (req, res) => {
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
userRouter.patch(API.EDIT_PAINTING, (req, res) => {
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
userRouter.delete(API.DELETE_ARTIST, (req, res) => {
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
userRouter.delete(API.DELETE_PAITING, (req, res) => {
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

module.exports = userRouter;

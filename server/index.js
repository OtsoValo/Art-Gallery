const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const CODE = require('./code');
const API = require('./api');

// 数据库处理
const dbsv = require('./dbsv');
const models = require('./models');
const authen = require('./authen');
const baseRouter = require('./baseRouter');
const userRouter = require('./userRouter');

const PORT = 9010;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1);
const mongo_store = new MongoStore({
	url: 'mongodb://localhost:27017/artoex'
});
app.use(session({
	secret: 'artoex key',
	store: mongo_store,
	resave: false,
	saveUninitialized: false,
	// 让它溜达一周
	cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.use(function (req, res, next) {
	res.set({
		'Access-Control-Allow-Origin': '*'
	});
	next();
});

function loadUser(req, res, next) {
	if (req.session.sid) {
		const sid = req.session.sid;
		const user = {
			account: sid.split(';')[0],
			uid: sid.split(';')[1]
		};
		res.json({
			code: CODE.SUCCESS,
			account: user.account,
			uid: user.uid
		});
	} else {
		res.json({
			code: CODE.FAIL
		});
	}
}
function requireAuthen(req, res, next) {
	if (req.session.sid) {
		next();
	} else {
		res.json({
			code: CODE.UNLOGIN
		});
	}
}
app.get(API.BASE_CHECK_LOGIN, loadUser);
app.all(API.USER_ALL, requireAuthen);

// 来来来用户注册
app.post(API.BASE_REGIST, (req, res) => {
	const ud = _.cloneDeep(req.body);
	ud.pwd = authen.cryptPwd(ud.pwd);
	new models.User(ud).save((err, user) => {
		if (err) {
			res.json({
				code: CODE.ERROR,
				data: {}
			});
		} else {
			res.json({
				code: CODE.SUCCESS,
				data: {
					account: user.account,
					email: user.email
				}
			});
		}
	});
});

// 来来来用户登录
app.post(API.BASE_LOGIN, (req, res) => {
	const account = req.body.account;
	const pwd = req.body.pwd;
	// 检查用户账号和密码是否和数据库中相匹配
	models.User.findOne({ account: account }, (err, user) => {
		if (err) {
			res.json({
				code: CODE.ERROR,
				data: {}
			});
		} else {
			// 检测用户账号和密码是否匹配
			if (authen.cryptPwd(pwd) === user.pwd) {
				// 登录成功同时开启session
				req.session.sid = `${user.account};${user._id}`;
				res.json({
					code: CODE.SUCCESS,
					data: {
						account: user.account,
						uid: user._id
					}
				});
			} else {
				// 登录失败
				res.json({
					code: CODE.FAIL,
					data: {}
				});
			}
		}
	})
});

// 来来来用户登出
app.post(API.BASE_LOGOUT, (req, res) => {
	req.session.destroy(err => {
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

app.use(baseRouter);
app.use(userRouter);

app.listen(PORT, () => {
	console.log('HTTP Server is running on: https://localhost:%s', PORT);
});
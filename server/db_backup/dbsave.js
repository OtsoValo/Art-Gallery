/**
 * 备份画作和艺术家、用户的数据为本地json
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/artoex');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connect to database: artoex');
});
const fs = require('fs');
const path = require('path');
const models = require('../models');

const ts = new Date();
const tsdir = `Y${ts.getFullYear()}M${ts.getMonth() + 1}D${ts.getDate()}h${ts.getHours()}m${ts.getMinutes()}`;
const tsdir_path = path.resolve(__dirname, tsdir);

try{
	fs.accessSync(tsdir_path);
}catch(err){
	fs.mkdirSync(tsdir_path);
}

const users_bak_path = path.resolve(__dirname, tsdir, 'backup_users.json');
const paintings_bak_path = path.resolve(__dirname, tsdir, 'backup_paintings.json');
const artists_bak_path = path.resolve(__dirname, tsdir, 'backup_artists.json');

const saveUsers = new Promise((resolve, reject) => {
	models.User.find({}, (err, users) => {
		if (err) return;
		return fs.writeFile(users_bak_path, JSON.stringify(users), err => {
			console.log('Users files output done.');
			resolve();
		});
	});
});

const savePaintings = new Promise((resolve, reject) => {
	models.Painting.find({}, (err, paintings) => {
		if (err) return;
		return fs.writeFile(paintings_bak_path, JSON.stringify(paintings), err => {
			console.log('Paintings files output done.');
			resolve();
		});
	});
});

const saveArtists = new Promise((resolve, reject) => {
	models.Artist.find({}, (err, artists) => {
		if (err) return;
		return fs.writeFile(artists_bak_path, JSON.stringify(artists), err => {
			console.log('Artists files output done.');
			resolve();
		});
	});
});

Promise.all([saveUsers, savePaintings, saveArtists]).then(() => {
	console.log('already save all.');
	mongoose.disconnect();
});



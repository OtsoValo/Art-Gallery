/**
 * 将文字转语音朗诵的mp3
 * http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=sometext
 */

const qs = require('querystring');
const path = require('path');
const fs = require('fs');
const request = require('request');
const SIZE = 300;
function collectQs(voiceText, speed) {
	return qs.stringify({
		"lan": "zh",
		"ie": "UTF-8",
		"spd": speed,
		"text": voiceText
	});
}
function generateVoice(voiceText = '', fileName = `demo-${Date.now()}.mp3`, speed = 4) {
	// 文本过长时需截断后多次请求后再拼接，暂定每次转换500个字符
	const times = Math.ceil(voiceText.length / SIZE);
	const voicePath = path.resolve(__dirname, '../static/voice', fileName);
	function splitTextBySize(times, size, wrapper) {
		let split = 0;
		let splitTextAry = [];
		for (let i = 0; i < times; i++) {
			splitTextAry.push(wrapper(voiceText.slice(split, split + size), speed));
			split = split + size;
		}
		return splitTextAry;
	}
	// console.log(splitTextBySize(times, SIZE, collectQs));
	const qsAry = splitTextBySize(times, SIZE, collectQs);
	const promiseList = [];
	const allBufRaw = [];
	for (let i = 0; i < times; i++) {
		promiseList.push(new Promise((resolve, reject) => {
			let tempAry = []
			request(`http://tts.baidu.com/text2audio?${qsAry[i]}`).on('data', chunk => {
				tempAry.push(chunk);
			}).on('end', err => {
				allBufRaw.push({
					index: i,
					data: Buffer.concat(tempAry)
				});
				resolve();
			});
		}));
	}
	Promise.all(promiseList).then(() => {
		const allBuf = new Array(times);
		allBufRaw.forEach(raw => {
			allBuf[raw.index] = raw.data;
		});
		fs.writeFile(voicePath, Buffer.concat(allBuf), err => {
			if (err) {
				console.log('mp3 failed');
				return;
			}
			console.log('mp3 created!');
		});
	});
}

module.exports = generateVoice;
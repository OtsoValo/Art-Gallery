/**
 * 将文字转语音朗诵的mp3
 * http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=sometext
 */

const qs = require('querystring');
const path = require('path');
const fs = require('fs');
const request = require('request');

function generateVoice(voiceText = "", fileName = `demo-${Date.now()}.mp3`, speed = 4) {
	const data = qs.stringify({
		"lan": "zh",
		"ie": "UTF-8",
		"spd": speed,
		"text": voiceText
	});
	const voicePath = path.resolve(__dirname, '../static/voice', fileName);
	request(`http://tts.baidu.com/text2audio?${data}`).pipe(fs.createWriteStream(voicePath));
}

// generateVoice("钓鱼要到岛上钓，不到岛上钓不到。红公鸡尾巴灰，灰公鸡尾巴红。");
module.exports = generateVoice;
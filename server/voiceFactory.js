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

const short_text = `一段短文本案发地方下结尾张佳琪罗接触`;
const long_text = `
1927年，达利与超现实主义诗人艾吕雅的妻子加拉相识。尽管加拉比达利年长10岁，两人仍倾心相爱并很快走到了一起。从此，加拉成为达利的伴侣和守护神，也是他的模特儿和艺术灵感之泉。
《由飞舞的蜜蜂引起的梦》描绘的是加拉的一个梦境。画面上，裸体的加拉悬浮在一块礁石上休憩，而礁石则漂浮在海面上。在加拉身旁，一只红色石榴飘浮在礁石边，一只小蜜蜂正专心致至地围绕着石榴“工作”。加拉的左上方，大石榴裂开了口，裂口中窜出一条大鱼，鱼夸张的大嘴中又跃出两条斑斓猛虎，张牙舞爪地扑向加拉柔软的躯体。猛虎前面，一把枪直指加拉，尖尖的刺刀头点在加拉的臂膀上，引起蜂蛰般的疼痛。远处，一只大象驮着尖顶方塔，迈着被极度拉长的竹杆般的四条腿走在海面上。这样的大象，我们在他1946年的《圣安东尼奥的诱惑》中又一次看到。一场由绕石榴飞舞的蜜蜂而引起的梦就这样呈现在我们眼前，它的颜色清澈明亮，形象逼真写实，但却毫无逻辑性可言。“这一切象征什么y对这样一幅画中的石榴、蜜蜂、老虎、大象、大海……可以赋予它几种甚至上百种意义的解释；而每一种解释都有深刻和浓厚的色情含义。”(Angelo De Fiore等著，乐华等译：《西洋巨匠美术丛书 达利》文物出版社第24页。)
达利不仅画画，还从事雕塑、电影拍摄、写作、设计等工作。他曾与他人合作完成电影《一条安达鲁犬》、《黄金时代》，撰写《萨尔瓦多·达利的秘密》、《一个天才的日记》，为芭蕾舞设计布景、服装，设计珠宝“皇家之心”、“时间之眼”，还有著名的“螯虾电话”等。经他手的每件作品，无一例外地留有超现实主义的梦幻痕迹。1982年，加拉去世后，他把他的全部财产捐赠给西班牙政府，建立了“加拉——萨尔瓦多·达利基金会”。1989年1月23日，达利离世，被安葬在他自己设计和装饰的剧场博物馆内。达利，这个名字曾经意味着功成名就和荒诞不经，时至今日，它依然如此。
达利认为艺术家要将潜意识的形象精确地纪录下来，所以他采用"具象"手法，精确地复制非正常逻辑思维所产生的幻象，把毫不相干的事物全部组合在一起，使画面中充满戏剧效果，带给人以视觉与新心灵的震撼。`;
// generateVoice(long_text);
module.exports = generateVoice;
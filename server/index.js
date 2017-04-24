const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let start = 1043;
let end = 1300;
let uploadIndex = 0;
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
	const ary = new Array(size);
	for (let i = 0; i < size; i++) {
		ary[i] = `/view/painting?id=${start + parseInt(Math.random() * 250)}`;
	}
	res.json(ary);
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

// 某艺术家图片
app.get('/view/artist', (req, res) => {
	const mark = req.query.mark;
	res.sendFile(path.resolve(__dirname, '../static/artists/', `${mark}.jpg`));
});

// 某艺术家所有信息（先模拟假数据好了）
app.get('/view/artistInfo', (req, res) => {
	const mark = req.query.mark;
	const heWorkAry = [];
	const range = [1071, 1082];
	for (let i = range[0]; i < range[1]; i++) {
		heWorkAry.push(`/view/thumbnail?id=${i}`);
	}
	res.json({
		im: `/view/artist?mark=${mark}`,
		info: {
			name: '毕加索',
			life: ['1881', '1973'],
			intro: '西班牙画家、雕塑家。法国共产党党员。是现代艺术的创始人，西方现代派绘画的主要代表。他是西班牙人，自幼有非凡的艺术才能，他的父亲是个美术教师，又曾在美术学院接受过比较严格的绘画训练，具有坚实的造型能力。',
			achievement: `毕加索是位多产画家，据统计，他的作品总计近37000件，包括：油画1885幅，素描7089幅，版画20000幅，平版画6121幅。
			毕加索的一生辉煌之至，他是有史以来第一个活着亲眼看到自己的作品被收藏进卢浮宫的画家。在1999年12月法国一家报纸进行的一次民意调查中，他以40%的高票当选为20世纪最伟大的十位画家之首。对于作品，毕加索说：“我的每一幅画中都装有我的血，这就是我的画的含义。”全世界前10名最高拍卖价的画作里面，毕加索的作品就占据4幅。毕加索一生中画法和风格几经变化。也许是对人世无常的敏感与早熟，加上家境不佳，毕加索早期的作品风格充满了早熟的忧郁，早期画近似表现派的主题。在求学期间，毕加索努力地研习学院派的技巧和传统的主题，而产生了象《第一次圣餐式》这样以宗教题材为描绘对象的作品。
			德加的柔和的色调，与罗特列克所追逐的上流社会的题材，也是毕加索早年学习的对象。在《嘉列特磨坊》、《喝苦艾酒的女人》等画作中，总看到用罗特列克手法经营着浮动的声光魅影，暧昧地流动着款款哀伤。毕加索十四岁那年与父母移居巴塞罗那，见识了当地的新艺术与思想。然而正当他跃跃欲试之际，却碰上当时西班牙殖民地战争失利。政治激烈的变动导致人民一幕幕悲惨的景象，身为重镇的巴塞罗那更是首当其冲。也许是这种兴奋与绝望的双重刺激，使得毕加索潜意识里孕育着蓝色时期的忧郁动力。迁至巴黎的毕加索，既落魄又贫穷，住进了一处怪异而破旧的住所“洗衣船”，这里当时是一些流浪艺术家的聚会所。也正是在此时，芳华十七的奥丽薇在一个飘雨的日子，翩然走进了毕加索的生命中。于是爱情的滋润与甜美软化了他这颗本已对生命固执颓丧的心灵，笔下沉沦痛苦的蓝色，也开始有了跳跃的情绪。细细缓缓地燃烧掉旧有的悲伤，此时整个画风膨胀着幸福的温存与情感归属的喜悦。
			玫瑰红时期的作品，人物表情虽依然冷漠，却已注重和谐的美感与细微人性的关注。整体除了色彩的丰富性外，已由先前蓝色时期那种无望的深渊中抽离。摒弃先前贫病交迫的悲哀、缺乏生命力的象征，取而代之的是对人生百态充满兴趣、关注及信心。在《穿衬衣的女子》中，一袭若隐若现的薄纱衬衣，轻柔地勾勒着自黑暗中涌现的侗体，坚定的延伸，流露出年轻女子的傲慢与自信。鬼魅般地流动着纤细隐约的美感。整体气氛的传达幽柔细致，使得神秘的躯体在氤氲中垂怜着病态美；拼贴艺术形成的主因，源于毕加索急欲突破空间的限制，而神来一笔的产物。实际上拼贴并非首创于毕加索，在19世纪的民俗工艺中就已经存在，但却是毕加索将之引至画面上，而脱离工艺的地位。首张拼贴作品《藤椅上的静物》与1913年的《吉他》，都是以拼贴手法实现立体主义的最佳诠释。后期画注目于原始艺术，简化形象。1915-1920年，画风一度转入写实。1930年又明显的倾向于超现实主义。第二次世界大战时，毕加索作油画《格尔尼卡》抗议德、意法西斯对西班牙北部小镇格尔尼卡进行狂轰滥炸。这幅画是毕加索最著名的一幅以立体主义、现实主义和超现实主义手法相结合的抽象画，剧烈变形、扭曲和夸张的笔触以及几何彩块堆积、造型抽象，表现了痛苦、受难和兽性，表达了毕加索多种复杂的情感。晚期制作了大量的雕塑、版画和陶器等，亦有杰出的成就。
			毕加索从十九世纪末从事艺术活动，一直持续到二十世纪七十年代，毕加索是整个二十世纪最具有影响力的现代派画家。毕加索的作品对现代西方艺术流派有着很大的影响。毕加索是个不断变化艺术手法的探求者，印象派、后期印象派、野兽派的艺术手法都被他汲取改选为自己的风格。他的才能在于，他的各种变异风格中，都保持自己粗犷刚劲的个性，而且在各种手法的使用中，都能达到内部的统一与和谐。他有过登峰造极的境界，他的作品不论是陶瓷、版画、雕刻都如童稚般的游戏。在他一生中，从来没有特定的老师，也没有特定的子弟，但凡是在二十世纪活跃的画家，没有一个人能将毕加索打开的前进道路完全迂回而进。
			1973年，他静静地离去了，走完了九十二岁的漫长生涯，如愿以偿地度过了一生。`
		},
		timelines: [
			{
				time: '1900年至1903年蓝色时期',
				content: `由1900年起毕加索一直往来于西班牙及巴黎之间。1904年在巴黎定居，住在著名的“洗衣坊”。在巴黎，他结交了马克斯·雅各布、范唐吉、隆尔蒙、阿波里耐和拉平·阿吉尔的房东的女儿马德莱娜，他为马德莱娜绘了几幅肖像。其时他的作品仍受到在巴塞罗那大行其道的象征主义影响。毕加索当时的生活条件很差，又受到德加、雅西尔与土鲁斯·劳特累克画风的影响，加上在西班牙受教育时染上的西班牙式的忧伤主义，这时期的作品弥漫着一片阴沉的蓝郁。`
			},
			{
				time: '1904年至1906年粉红时期',
				content: `1906年毕加索结识了马蒂斯。其后又认识了德兰和布拉克，与费尔南德·奥利维耶在蒙马特同住。其时他的经济已好转，生活比前愉快，画作用色变为轻快的粉红；绘画对象亦由蓝色时期的乞丐、瘦弱小孩和悲戚妇女转向街头艺人、杂耍艺人及风华正茂的妇女。`
			},
			{
				time: '1906年至1910年非洲时期(黑人时期)',
				content: `1906年毕加索从德兰的非洲面具中得到启发，直至年底，其作品一直受非洲面具影响，此即为毕加索的非洲时期。他笔下的人体健硕而深沉，这种特征，在1907年的《阿威农的姑娘》中显露无遗，由不同组件组成的人体可从几个角度来观看，揭示毕加索的立体主义时期的来临。然而，整个时期仍有受塞尚影响的痕迹。`
			},
			{
				time: '1910年至1914年分析立体主义',
				content: `毕加索大部分的艺术家朋友都由蒙马特迁到蒙帕纳塞，他亦随他们迁居。其时的立体主义体验达到巅峰。雅克·比斯这样评论他：“作品由素描建构，色与调弱化到最起码的灰色与浅暗橘黄色；形体是几何图形化与综合而成的，造成迹近压抑其可辨认身份的效果，闯出桎梏，最终与形体剥离。”仿如从一面棱镜的焦点去看一个单一影象的多元角度。生活本来就是如此，然而毕加索把它延伸到肖像上。他与布拉克制作出第一批拼贴画。`
			},
			{
				time: '1914年综合立体主义',
				content: `1914年，战争使立体主义画家分道扬镳，各奔前程。毕加索重拾自由与个人在色彩上的品味，还有那旺盛的精力。无论从风格与绘画的对象上，他的“立体印象派”创作变得更加自由。纵观他的所有作品，他并未把自己局限于立体主义，而是继续从各方面探索。例如，1915至1916年的作品是自然主义的；1917年的却是现实主义。`
			},
			{
				time: '1917年至20年代新古典时期',
				content: `1927年他邂逅了极年轻的玛丽·泰蕾兹·瓦尔特，她成为他的模特儿，且为他诞下女儿马姬。此时，毕加索并没有与妻子离婚，却又与一名热情女画家兼摄影师多娜·马尔同居，他为马尔绘过几张画。他们的关系维持了差不多十年。在大奥古斯丁路的新工作坊内，毕加索创作了大型制作《格尔尼卡》，其间做了许多筹备制作工作。`
			}
		],
		works: heWorkAry
	})
});

// 所有艺术家
app.get('/view/artists', (req, res) => {
	res.json(['bjs', 'kdsj', 'mk', 'mds']);
});

// 接收画作图片上传
app.post('/view/fileUpload/painting', upload.single('painting'), (req, res) => {
	const filename = req.file.filename;
	res.json({
		msg: '画作图片上传成功',
		data: `/view/uploadImg?file=${filename}`
	});
});

// 接收艺术家图片上传
app.post('/view/fileUpload/artist', upload.single('artist'), (req, res) => {
	const filename = req.file.filename;
	res.json({
		msg: '艺术家图片上传成功',
		data: `/view/uploadImg?file=${filename}`
	});
});

// 返回上传图片路径
app.get('/view/uploadImg', (req, res) => {
	const filename = req.query.file;
	res.sendFile(path.resolve(__dirname, '../static/uploads/', filename));
});

// 存入画作
app.post('/view/newPainting', (req, res) => {
	res.json({
		msg: '存入画作成功'
	});
});

// 存入艺术家
app.post('/view/newArtist', (req, res) => {
	res.json({
		msg: '存入艺术家成功'
	})
});

app.listen(9010, () => {
	console.log('app is listening at port:9010');
});

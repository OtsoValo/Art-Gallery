<template>
	<div class="app-admin">
		<Tabs class="m-admin"
		      value="paintingNew"
		      type="card">
			<Tab-pane label="绘画"
			          icon="plus"
			          name="paintingNew"
			          class="w-pane">
				<Form :label-width="120"
				      class="w-form">
					<Form-item label="上传画作">
						<Upload action="/view/fileUpload/painting"
						        :on-success="uploadSuccP"
						        name="painting">
							<Button type="ghost"
							        icon="ios-cloud-upload-outline">上传文件</Button>
						</Upload>
					</Form-item>
					<Form-item label="画作名称">
						<Input placeholder="请输入..."
						       style="width: 400px"
						       v-model="painting.name"></Input>
					</Form-item>
					<Form-item label="画作作者">
						<Radio-group v-model="painting.author">
							<Radio v-for="(artist, index) in artists" :label="artist.name" :key="index"></Radio>
						</Radio-group>
						<span class="u-tips">（如若没有指定作者，请先添加该艺术家）</span>
					</Form-item>
					<Form-item label="画作尺寸">
						<Input-number v-model="painting.size.width"></Input-number> ×
						<Input-number v-model="painting.size.height"></Input-number>
						<Input placeholder="标量单位..."
						       style="width: 100px"
						       v-model="painting.size.rule"></Input>
					</Form-item>
					<Form-item label="创作时间">
						<Date-picker type="year"
						             placement="bottom-start"
						             placeholder="开始日期"
						             format="开始于yyyy年"
						             v-model="painting.begin"
						             style="width: 200px; display: inline-block;"></Date-picker>
						<Date-picker type="year"
						             placement="bottom-start"
						             placeholder="结束日期"
						             format="结束于yyyy年"
						             v-model="painting.end"
						             style="width: 200px; display: inline-block;"></Date-picker>
					</Form-item>
					<Form-item label="画作风格">
						<Input placeholder="请输入..."
						       style="width: 400px"
						       v-model="painting.style"></Input>
					</Form-item>
					<Form-item label="画作描述">
						<Input placeholder="可以参考百度百科或者维基百科嘛..."
						       type="textarea"
						       :rows="4"
						       style="width: 800px"
						       v-model="painting.descr"></Input>
					</Form-item>
					<Form-item label="馆藏地址">
						<Input placeholder="请输入..."
						       style="width: 400px"
						       v-model="painting.site"></Input>
					</Form-item>
					<Form-item>
						<Button type="primary"
						        size="large"
						        @click="savePainting">存入画作</Button>
					</Form-item>
				</Form>
				<div class="w-display">
					<Icon class="u-camera"
					      type="image"
					      v-show="painting.im === ''"
					      size="40"></Icon>
					<img :src="painting.im">
				</div>
			</Tab-pane>
			<Tab-pane label="绘画"
			          icon="edit"
			          name="paintingEdit"
			          class="w-pane">
	
			</Tab-pane>
	
			<Tab-pane label="艺术家"
			          icon="plus"
			          name="artistNew"
			          class="w-pane">
				<Form :label-width="120"
				      class="w-form">
					<Form-item label="上传艺术家肖像">
						<Upload action="/view/fileUpload/artist"
						        :on-success="uploadSuccA"
						        name="artist">
							<Button type="ghost"
							        icon="ios-cloud-upload-outline">上传文件</Button>
						</Upload>
					</Form-item>
					<Form-item label="艺术家名称">
						<Input placeholder="请输入..."
						       style="width: 400px"
						       v-model="artist.name"></Input>
					</Form-item>
					<Form-item label="出生（逝世）日期">
						<Date-picker type="date"
						             placement="bottom-start"
						             placeholder="出生日期"
						             format="出生于yyyy年MM月dd日"
						             v-model="artist.birth"
						             style="width: 200px; display: inline-block;"></Date-picker>
						<Date-picker type="date"
						             placement="bottom-start"
						             placeholder="逝世日期"
						             format="逝世于yyyy年MM月dd日"
						             v-model="artist.death"
						             style="width: 200px; display: inline-block;"></Date-picker>
					</Form-item>
					<Form-item label="艺术家介绍">
						<Input placeholder="可以参考百度百科或者维基百科嘛..."
						       type="textarea"
						       :rows="4"
						       style="width: 400px"
						       v-model="artist.intro"></Input>
					</Form-item>
					<Form-item label="生平大事记">
						<Slider v-model="artist.bigStoryNum"
						        :step="10"
						        show-stops
						        :tip-format="formatStory"></Slider>
					</Form-item>
					<!--生平大事-->
					<Form-item v-for="(bigStory, index) in artist.bigStories"
					           :label="`第${String(index + 1)}个时期`"
					           :key="index">
						<Input placeholder="请输入该时期标题..."
						       type="textarea"
						       :rows="2"
						       style="width: 400px;"
						       v-model="bigStory.time"></Input>
						<Input placeholder="请输入该时期大概描述..."
						       type="textarea"
						       :rows="2"
						       style="width: 400px"
						       v-model="bigStory.content"></Input>
					</Form-item>
					<Form-item label="主要作品">
						<Input placeholder="请填写..."
						       type="textarea"
						       :rows="4"
						       style="width: 400px"
						       v-model="artist.works"></Input>
					</Form-item>
					<Form-item>
						<Button type="primary"
						        size="large"
						        @click="saveArtist">存入艺术家</Button>
					</Form-item>
				</Form>
				<div class="w-display">
					<Icon class="u-camera"
					      type="image"
					      v-show="artist.im === ''"
					      size="40"></Icon>
					<img :src="artist.im">
				</div>
			</Tab-pane>
			<Tab-pane label="艺术家"
			          icon="edit"
			          name="artistEdit"
			          class="w-pane">
	
			</Tab-pane>
		</Tabs>
	
		<Back-top></Back-top>
	</div>
</template>

<script>
import TIPS from '../common/TIPS.js';
export default {
	name: 'AppAdmin',
	data() {
		return {
			painting: {
				name: '',
				im: '',
				author: '',
				size: {
					width: 0,
					height: 0,
					rule: ''
				},
				begin: '',
				end: '',
				style: '',
				descr: '',
				site: ''
			},
			artist: {
				name: '',
				im: '',
				birth: '',
				death: '',
				intro: '',
				bigStoryNum: 30,
				bigStories: [],
				works: ''
			},
			artists: []
		};
	},
	methods: {
		formatStory(val) {
			return `${val / 10}个重要时期`;
		},
		minusAlert(nodesc) {
			this.$Notice.warning({
				title: '关于生平大事记',
				desc: nodesc ? '' : '已经帮你减少了一个重要时期啦，不过可能会清空生平大事记已填写的一些数据哦。请慎重！'
			});
		},
		plusNotice(nodesc) {
			this.$Notice.success({
				title: '关于生平大事记',
				desc: nodesc ? '' : '已经帮你增加了一个重要时期啦，接下来就交给你了，要负责任地填写好哦~'
			});
		},
		uploadSuccP(res) {
			this.painting.im = res.data;
		},
		uploadSuccA(res) {
			this.artist.im = res.data;
		},
		savePainting() {
			let paintingData = _.cloneDeep(this.painting);
			paintingData.aid = (_.find(this.artists, a => {return a.name === paintingData.author;})).id;
			this.$http.post('/view/newPainting', paintingData).then(res => {
				if (res.status >= 200 && res.status < 400) {
					this.$Notice.success({ title: res.data.msg });
					// 重置所有表单信息
					this.painting = {
						name: '',
						im: '',
						author: '',
						size: {
							width: 0,
							height: 0,
							rule: ''
						},
						begin: '',
						end: '',
						style: '',
						descr: '',
						site: ''
					};
				} else {
					this.$Notice.warning({ title: TIPS.NET_ERR });
				}
			});
		},
		saveArtist() {
			let artistData = _.cloneDeep(this.artist);
			artistData.works = artistData.works.split(',');
			delete artistData.bigStoryNum;
			this.$http.post('/view/newArtist', artistData).then(res => {
				if (res.status >= 200 && res.status < 400) {
					this.$Notice.success({ title: res.data.msg });
					// 重置所有表单信息
					this.artist = {
						name: '',
						im: '',
						birth: '',
						death: '',
						intro: '',
						bigStoryNum: 30,
						bigStories: [],
						works: ''
					};
					this.genStories(3);
				} else {
					this.$Notice.warning({ title: TIPS.NET_ERR });
				}
			});
		},
		genStories(num) {
			// 初始化先预定三个重要时期
			let i = 0;
			while (i < num) {
				this.artist.bigStories.push({ time: '', content: '' });
				i++;
			}
		}
	},
	watch: {
		'artist.bigStoryNum': function (val) {
			const numAfter = val / 10;
			const numBefore = this.artist.bigStories.length;
			const bigStories = this.artist.bigStories;
			// 生成重要时期填写所需的表单
			if (numAfter > numBefore) {
				bigStories.push({
					time: '',
					content: '',
				});
				this.plusNotice(false);
			} else {
				bigStories.splice(numAfter);
				this.minusAlert(false);
			}
		}
	},
	mounted() {
		this.genStories(this.artist.bigStoryNum / 10);
		this.$http.get('/view/artists').then(res => {
			this.artists = res.data.data;
		});
	}
}
</script>

<style scoped lang="scss">
.app-admin {}

.m-admin {
	max-width: 1400px;
	min-width: 1400px;
	margin: 20px auto;
	.u-tips{
		color: #bbb;
	}
	.w-pane {
		padding: 20px 0;
		.w-form {
			float: left;
			width: auto;
			margin-right: 40px;
		}
		.w-display {
			position: relative;
			float: left;
			width: 400px;
			height: 400px;
			border-radius: 4px;
			border: 1px solid #ddd;
			overflow: hidden;
			background: url('../assets/geometry.png') repeat;
			&>img {
				display: block;
				margin: 0;
				left: 0;
				position: absolute;
				width: 100%;
				top: 50%;
				transform: translateY(-50%);
			}
			.u-camera {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
}
</style>
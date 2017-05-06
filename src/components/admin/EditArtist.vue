<template>
	<div class="admin-edit-artist">
		<Form :label-width="120"
		      class="w-form">
			<Form-item label="修改艺术家肖像">
				<Upload action="/view/fileUpload/artist"
				        :on-success="uploadSucc"
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
				<Date-picker type="month"
				             placement="bottom-start"
				             placeholder="出生日期"
				             format="出生于yyyy年MM月"
				             :editable="false"
				             v-model="artist.birth"
				             style="width: 200px; display: inline-block;"></Date-picker>
				<Date-picker type="month"
				             placement="bottom-start"
				             placeholder="逝世日期"
				             format="逝世于yyyy年MM月"
				             :editable="false"
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
				        @click="updateArtist">更新艺术家</Button>
			</Form-item>
		</Form>
	
		<div class="w-display">
			<Icon class="u-camera"
			      type="image"
			      v-show="artist.im === ''"
			      size="40"></Icon>
			<img :src="artist.im"
			     v-show="artist.im">
		</div>
	</div>
</template>

<script>
import TIPS from '../../common/TIPS';
export default {
	name: 'EditArtist',
	data() {
		return {
			artist: {
				name: '',
				im: '',
				imMin: '',
				birth: '',
				death: '',
				intro: '',
				bigStoryNum: 30,
				bigStories: [],
				works: '',
				_id: ''
			}
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
		uploadSucc(res) {
			this.$Notice.success({ title: TIPS.UPLOAD_ARTIST_SUCC });
			this.artist.im = res.data;
			this.artist.imMin = res.minData;
		},
		plusNotice(nodesc) {
			this.$Notice.success({
				title: '关于生平大事记',
				desc: nodesc ? '' : '已经帮你增加了一个重要时期啦，接下来就交给你了，要负责任地填写好哦~'
			});
		},
		genStories(num) {
			// 初始化先预定三个重要时期
			let i = 0;
			while (i < num) {
				this.artist.bigStories.push({ time: '', content: '' });
				i++;
			}
		},
		updateArtist() {
			let artistData = _.cloneDeep(this.artist);
			let comma = artistData.works.includes(',') ? ',' : '，';
			artistData.works = artistData.works.split(comma);
			delete artistData.bigStoryNum;
			this.$http.patch('/view/editArtist', artistData).then(res => {
				if (res.status >= 200 && res.status < 400) {
					this.$Notice.success({ title: TIPS.UPDATE_ARTIST_SUCC });
					// 成功后跳转回艺术家组件
					this.$router.push({ path: '/artist', query: { aid: this.artist._id } });
				} else {
					this.$Notice.warning({ title: TIPS.NET_ERR });
				}
			});
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
			} else if (numAfter < numBefore) {
				bigStories.splice(numAfter);
				this.minusAlert(false);
			}
		}
	},
	mounted() {
		this.genStories(this.artist.bigStoryNum / 10);
		const aid = this.$route.query.aid;
		if (!aid) {
			this.$router.push({ path: '/404notfound' });
		} else {
			this.$http.get(`/view/artistInfo?id=${aid}`).then(res => {
				const artistData = res.data.data;
				artistData.works = artistData.works.join('，');
				_.assign(this.artist, artistData);
				this.artist.bigStoryNum = this.artist.bigStories.length * 10;
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./formBase.scss";
.admin-edit-artist {
	max-width: 1400px;
	min-width: 1400px;
	margin: 20px auto;
	@include form;
}
</style>
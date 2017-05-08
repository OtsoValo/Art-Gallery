<template>
	<div class="admin-edit-painting">
		<Form :label-width="120"
		      class="w-form">
			<Form-item label="修改画作图片">
				<Upload action="/view/user/fileUpload/painting"
				        :on-success="uploadSucc"
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
					<Poptip trigger="hover"
					        content="如若没有指定作者，请先添加该艺术家"
					        placement="top">
						<Radio v-for="(artist, index) in artists"
						       :label="artist.name"
						       :key="index"></Radio>
					</Poptip>
				</Radio-group>
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
				             :editable="false"
				             v-model="painting.begin"
				             style="width: 200px; display: inline-block;"></Date-picker>
				<Date-picker type="year"
				             placement="bottom-start"
				             placeholder="结束日期"
				             format="结束于yyyy年"
				             :editable="false"
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
				       :rows="8"
				       style="width: 800px"
				       v-model="painting.descr"></Input>
			</Form-item>
			<Form-item label="馆藏地址">
				<Input placeholder="请输入..."
				       style="width: 400px"
				       v-model="painting.site"></Input>
			</Form-item>
			<Form-item label="生成语音速度">
				<Slider v-model="painting.voiceSpeed"
				        :step="10"
				        :min="10"
				        :max="90"
				        show-stops
				        :tip-format="formatVoice"></Slider>
				<Alert show-icon style="width: 800px;">
					语音生成规则
					<template slot="desc">语音根据以上填写的所有文本自动生成（画作名称 + 画作作者 + 画作尺寸 + 创作时间 + 画作风格 + 馆藏地址 + 画作描述）。语音生成模型为：“画作《呐喊》由艺术家爱德华·蒙克于1893年到1893年创作。风格为表现主义，尺寸91乘以73.5 cm，现收藏于蒙克博物馆。（接下来是一长段的画作描述）”。</template>
				</Alert>
			</Form-item>
			<Form-item>
				<Button type="primary"
				        size="large"
				        @click="updatePainting">修改画作</Button>
			</Form-item>
		</Form>
		<div class="w-display">
			<Icon class="u-camera"
			      type="image"
			      v-show="painting.im === ''"
			      size="40"></Icon>
			<img :src="painting.im"
			     v-show="painting.im">
		</div>
	</div>
</template>

<script>
import TIPS from '../../common/TIPS';
export default {
	name: 'EditPainting',
	data() {
		return {
			painting: {
				aid: '',
				name: '',
				im: '',
				imMin: '',
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
				site: '',
				voiceSpeed: 40
			},
			artists: []
		};
	},
	filters: {
		showName(val) {
			return val + '$';
		}
	},
	methods: {
		formatVoice(val) {
			return `语速 ${val / 10}`;
		},
		uploadSucc(res) {
			this.$Notice.success({ title: TIPS.UPLOAD_PAINTING_SUCC });
			this.painting.im = res.data;
			this.painting.imMin = res.minData;
		},
		updatePainting() {
			let paintingData = _.cloneDeep(this.painting);
			paintingData.voiceSpeed = paintingData.voiceSpeed/10;
			this.$http.patch('/view/user/editPainting', paintingData).then(res => {
				if (res.status >= 200 && res.status < 400) {
					if(res.data.code === 100){
						this.$Notice.warning({ title: TIPS.NO_RIGHT });
						return;
					}
					this.$Notice.success({ title: TIPS.UPDATE_PAINTING_SUCC });
					this.$router.push({ path: '/painting' });
				} else {
					this.$Notice.warning({ title: TIPS.NET_ERR });
				}
			});
		}
	},
	mounted() {
		this.$http.get('/view/artists').then(res => {
			this.artists = res.data.data;
		});
		const pid = this.$route.query.pid;
		if (!pid) {
			this.$router.push({ path: '/404notfound' });
		} else {
			this.$http.get(`/view/paintingInfo?id=${pid}`).then(res => {
				const paintingData = res.data.data;
				_.assign(this.painting, paintingData);
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./formBase.scss";
.admin-edit-painting {
	max-width: 1400px;
	min-width: 1400px;
	margin: 20px auto;
	@include form;
}
</style>
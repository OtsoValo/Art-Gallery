<template>
	<div class="app-painting">
		<!--轮播大图-->
		<header class="m-carousel">
			<Carousel autoplay
			          :autoplay-speed="carouselSpeed"
			          v-model="greatIndex">
				<Carousel-item v-for="(great, index) in greatAry"
				               :key="index">
					<div class="w-great"
					     @click="seeThumb(great)">
						<img :src="great.im"
						     alt="首焦图">
					</div>
				</Carousel-item>
			</Carousel>
	
			<div class="ctrl-carousel" :class="{'ctrl-carousel-hide': ctrl.hide}">
				<Button class="ctrl-btn"
				        type="ghost"
				        shape="circle"
						size="large"
						@click="ctrl.hide = !ctrl.hide"
				        icon="ios-analytics"></Button>
				<Form :label-width="60">
					<Form-item class="w-ctrlform"
					           label="(￣３￣)">
						<Slider class="w-slider"
						        v-model="ctrl.size"
						        :min="30"
						        :max="90"
								show-stops
						        :tip-format="formatSizeTips"
						        :step="10"></Slider>
					</Form-item>
					<Form-item class="w-ctrlform"
					           label="(￣３￣)">
						<Slider class="w-slider"
						        v-model="ctrl.speed"
						        :min="20"
						        :max="100"
								show-stops
						        :tip-format="formatSpeedTips"
						        :step="10"></Slider>
					</Form-item>
				</Form>
			</div>
		</header>
	
		<!--分割线-->
		<section class="m-divider">
			<Steps class="w-steps"
			       :current="stepCur"
			       size="small">
				<Step title="增加艺术家"
				      content="先去后台添加一枚艺术家哦~"></Step>
				<Step title="增加画作"
				      content="再去后台选择添加已添加的艺术家画作！"></Step>
				<Step title="更新或删除画作"
				      content="当然可以更新画作信息，或者直接删除画作"></Step>
				<Step title="更新或删除艺术家"
				      content="删除某艺术家及对应所有画作，小心操作哦！"></Step>
			</Steps>
		</section>
	
		<!--缩略图-->
		<section class="m-stage">
			<div class="w-thumb"
			     v-for="thumb in thumbAry"
			     @click="seeThumb(thumb)">
				<img class="u-thumbim"
				     :src="thumb.imMin"
				     alt="缩略图">
			</div>
		</section>
	
		<!--分页-->
		<section class="m-paginbox">
			<Page class="w-pagin"
			      :page-size="pageSize"
			      :total="totalSize"
			      show-total
			      @on-change="changePage"></Page>
		</section>
	
		<!--单幅画作的详细信息-->
		<Modal v-model="paintingModal"
		       class="w-modal"
		       :width="modalWidth"
		       :styles="{top: '20px', marginBottom: '20px'}">
			<p slot="header"
			   style="color:#666; text-align:center; font-size:20px; line-height: 1;">
				<span>{{modalData.name}}</span>
			</p>
			<div style="text-align:center;">
				<img ref="modal-im"
				     id="modal-im"
				     :src="modalData.im"
				     :alt="modalData.name">
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">画作名称</Tag>
					</Col>
					<Col span="20">
					<p class="u-intro">{{modalData.name}}</p>
					</Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">画作作者</Tag>
					</Col>
					<Col span="20">
					<p class="u-intro">
						<Badge dot><a href="javascript:void(0);"
							   @click="seeArtist(modalData.aid)">{{modalData.author}}</a></Badge>
					</p>
					</Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">画作创作年份</Tag>
					</Col>
					<Col span="20">
					<p class="u-intro">{{modalData.begin | timeNormal}} - {{modalData.end | timeNormal}}</p>
					</Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">创作风格</Tag>
					</Col>
					<Col span="20">
					<p class="u-intro">{{modalData.style}}</p>
					</Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">尺寸</Tag>
					</Col>
					<Col span="20">
					<p class="u-intro">{{modalData.size.width}} × {{modalData.size.height}} {{modalData.size.rule}}</p>
					</Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">画作介绍</Tag>
					</Col>
					<Col span="20">
					<p class="u-intro"
					   v-for="descr in modalData.descr.split('\n')">{{descr}}</p>
					</Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">藏馆或收藏地址</Tag>
					</Col>
					<Col span="20">
					<p class="u-intro">{{modalData.site}}</p>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Row v-if="user_login">
					<Col span="12">
					<Button icon="edit"
					        style="margin-right:10px;"
					        @click="updatePainting"
					        long>更改画作信息</Button>
					</Col>
					<Col span="12">
					<Button type="error"
					        icon="trash-a"
					        style="margin-left:10px;"
					        @click="deleteModal = true"
					        long>删除该画作</Button>
					</Col>
				</Row>
			</div>
		</Modal>
		<!--删除确认弹窗-->
		<Modal v-model="deleteModal"
		       width="360">
			<p slot="header"
			   style="color:#f60;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>删除确认</span>
			</p>
			<div style="text-align:center">
				<p>此艺术家删除后，其对应的所有画作也会删除。</p>
				<p>是否继续删除？</p>
			</div>
			<div slot="footer">
				<Button type="error"
				        size="large"
				        long
				        :loading="del_loading"
				        @click="deletePainting">删除</Button>
			</div>
		</Modal>
	
		<AudioPlayer ref="audioPlayer"
		             class="m-audioplayer"
		             :audio-src="modalData.voice"
		             :audio-name="modalData.name"></AudioPlayer>
	</div>
</template>

<script>
import TIPS from '../common/TIPS';
import AudioPlayer from './AudioPlayer';
export default {
	name: 'AppPainting',
	data() {
		return {
			greatIndex: 0,
			carouselSize: 6,
			carouselSpeed: 4000,
			page: 1,
			pageSize: 30,
			totalSize: 0,
			greatAry: [],
			thumbAry: [],
			paintingModal: false,
			modalData: {
				name: '默认背景音频',
				size: {},
				descr: '',
				voice: '/view/audio?fn=stone_road'
			},
			modalWidth: 1200,
			stepCur: 0,
			deleteModal: false,
			del_loading: false,
			ctrl: {
				size: 60,
				speed: 40,
				hide: true
			}
		};
	},
	components: { AudioPlayer },
	filters: {
		timeNormal(val) {
			const dval = new Date(val);
			return `${dval.getFullYear()}`;
		}
	},
	computed: {
		'user_login': function () {
			return this.$eventhub.global_is_loading;
		}
	},
	watch: {
		'paintingModal': function (modal_open) {
			if (!modal_open) {
				this.$refs.audioPlayer.pause();
				this.modalData = {
					name: '默认背景音频',
					size: {},
					descr: '',
					voice: '/view/audio?fn=stone_road'
				};
			}
		},
		'ctrl.size': function (val) {
			this.carouselSize = val / 10;
			this.$http.get(`/view/paintingList?size=${this.carouselSize}`).then(res => {
				this.greatAry = res.data.data;
			});
		},
		'ctrl.speed': function (val) {
			this.carouselSpeed = val * 100;
		}
	},
	methods: {
		formatSizeTips(val) {
			return `总共轮播${val / 10}幅`;
		},
		formatSpeedTips(val) {
			return `轮播速度每${val / 10}秒一幅`;
		},
		changePage(page) {
			this.page = page;
			// 获取缩略图
			this.$http.get(`/view/thumbnailList?page=${page}&pageSize=${this.pageSize}`).then(res => {
				this.totalSize = res.data.total;
				this.thumbAry = res.data.data;
			});
		},
		seeThumb(thumb) {
			this.paintingModal = true;
			this.$refs.audioPlayer.pause();
			this.modalData = thumb;
			// 自动匹配图片宽度
			this.$nextTick(() => {
				const outerWidth = 40;
				const modalIm = document.getElementById('modal-im');
				modalIm.onload = () => {
					this.modalWidth = modalIm.width + outerWidth;
				};
				// 防止图片宽度为0时溢出，这个奇怪的bug哈
				const imWidth = modalIm.width === 0 ? 1200 : modalIm.width;
				this.modalWidth = imWidth + outerWidth;
			});
		},
		seeArtist(aid) {
			this.$router.push({ path: '/artist', query: { aid: aid } });
		},
		updatePainting() {
			const pid = this.modalData._id;
			this.$router.push({ path: '/editPainting', query: { pid: pid } });
		},
		deletePainting() {
			const pid = this.modalData._id;
			const im = encodeURIComponent(this.modalData.im);
			const imMin = encodeURIComponent(this.modalData.imMin);
			this.del_loading = true;
			this.$http.delete(`/view/user/deletePainting?pid=${pid}&im=${im}&imMin=${imMin}`).then(res => {
				this.del_loading = false;
				this.deleteModal = false;
				this.paintingModal = false;
				// 获取轮播首图
				this.$http.get(`/view/paintingList?size=${this.carouselSize}`).then(res => {
					this.greatAry = res.data.data;
				});
				this.changePage(this.page);
				if (res.data.code === 200) {
					this.$Notice.success({ title: TIPS.DELETE_PAINTING_SUCC });
				} else {
					this.$Notice.error({ title: TIPS.DELETE_PAINTING_FAIL });
				}

			});
		}
	},
	mounted() {
		// 获取轮播首图
		this.$http.get(`/view/paintingList?size=${this.carouselSize}`).then(res => {
			this.greatAry = res.data.data;
		});
		this.changePage(this.page);

		const stepLoop = setInterval(() => {
			if (this.stepCur >= 3) {
				this.stepCur = 0;
			} else {
				this.stepCur++;
			}
		}, 3000);
	}
}
</script>

<style scoped lang="scss">
$bouceInOut: cubic-bezier(0.68, -0.55, 0.27, 1.55);
.app-painting {
	position: relative;
	.m-audioplayer {
		position: fixed;
		z-index: 2001;
		left: 20px;
		bottom: 60px;
	}
	.m-carousel {
		position: relative;
		background: url('../assets/gplaypattern.png') repeat;
		border-bottom: 1px solid #eee;
		min-width: 1000px;
		.w-great {
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			width: 100%;
			height: 640px;
			overflow: hidden;
			&>img {
				display: block;
				height: 90%;
			}
		}
		.ctrl-carousel {
			position: absolute;
			width: 360px;
			height: auto;
			background: #fff;
			padding: 8px 64px 8px 64px;
			right: -40px;
			bottom: 20px; // border: 1px solid #39f;
			box-shadow: 0 0 8px #888;
			border-radius: 42px 0 0 42px;
			transition: right .3s #{$bouceInOut};
			.w-ctrlform {
				margin-bottom: 0;
				.w-slider {
					margin-top: -2px;
				}
			}
			.ctrl-btn {
				position: absolute;
				top: 50%;
				left: 12px;
				transform: translateY(-50%);
			}
		}
		.ctrl-carousel-hide {
			right: -300px;
		}
	}

	.m-divider {
		margin: 20px auto 0;
		width: 800px;
	}

	.m-stage {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		max-width: 1920px;
		min-width: 1000px;
		margin: 0 auto;
		padding-top: 10px;
		.w-thumb {
			position: relative;
			height: 120px;
			overflow: hidden;
			margin: 8px;
			border-radius: 4px;
			background: #eee;
			&:hover {
				cursor: pointer;
				box-shadow: 0 0 8px #888;
			}
			.u-thumbim {
				height: 100%;
				transform: scale(1, 1);
				transition: transform .3s ease-out;
				&:hover {
					transform: scale(1.5, 1.5);
				}
			}
		}
	}

	.m-paginbox {
		position: relative;
		width: 100%;
		min-height: 60px;
		margin: 20px 0;
		.w-pagin {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
}

.w-modal {
	.modal-intro {
		margin: 10px;
		text-align: left;
		.u-intro {
			margin-top: 6px;
		}
	}
}
</style>
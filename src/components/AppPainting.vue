<template>
	<div class="app-painting">
		<header class="m-carousel">
			<Carousel autoplay
			          :autoplay-speed="4000"
			          v-model="greatIndex">
				<template v-for="great in greatAry">
					<Carousel-item>
						<div class="w-great">
							<img :src="great.im"
							     alt="首焦图">
						</div>
					</Carousel-item>
				</template>
			</Carousel>
		</header>
		<section class="m-stage">
			<div class="w-thumb"
			     v-for="thumb in thumbAry"
			     @click="seeThumb(thumb)">
				<img class="u-thumbim"
				     :src="thumb.imMin"
				     alt="缩略图">
			</div>
		</section>
		<section class="m-paginbox">
			<Page class="w-pagin"
			      :page-size="pageSize"
			      :total="totalSize"
			      show-total
			      @on-change="changePage"></Page>
		</section>
		<Modal v-model="paintingModal"
		       class="w-modal"
		       :width="modalWidth"
		       :styles="{top: '20px'}">
			<p slot="header"
			   style="color:#666; text-align:center; font-size:20px; line-height: 1;">
				<span>{{modalData.name}}</span>
			</p>
			<div style="text-align:center">
				<img id="modal-im"
				     :src="modalData.im"
				     :alt="modalData.name">
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">画作名称</Tag>
					</Col>
					<Col span="20"><p class="u-intro">{{modalData.name}}</p></Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">画作作者</Tag>
					</Col>
					<Col span="20"><p class="u-intro"><Badge dot><a href="#">{{modalData.author}}</a></Badge></p></Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">画作创作年份</Tag>
					</Col>
					<Col span="20"><p class="u-intro">{{modalData.begin | timeNormal}} - {{modalData.end | timeNormal}}</p></Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">创作风格</Tag>
					</Col>
					<Col span="20"><p class="u-intro">{{modalData.style}}</p></Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">尺寸</Tag>
					</Col>
					<Col span="20"><p class="u-intro">{{modalData.size.width}} × {{modalData.size.height}} {{modalData.size.rule}}</p></Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">画作介绍</Tag>
					</Col>
					<Col span="20"><p class="u-intro"  v-for="descr in modalData.descr.split('\n')">{{descr}}</p></Col>
				</Row>
				<Row class="modal-intro">
					<Col span="4">
					<Tag type="border"
					     color="blue">藏馆或收藏地址</Tag>
					</Col>
					<Col span="20"><p class="u-intro">{{modalData.site}}</p></Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="ghost"
				        size="large"
				        long>更改画作信息</Button>
			</div>
		</Modal>
		<Back-top></Back-top>
	</div>
</template>

<script>

export default {
	name: 'AppPainting',
	data() {
		return {
			greatIndex: 0,
			carouselSize: 5,
			page: 1,
			pageSize: 40,
			totalSize: 0,
			greatAry: [],
			thumbAry: [],
			paintingModal: false,
			modalData: {},
			modalWidth: 1200
		};
	},
	filters: {
		timeNormal(val) {
			const dval = new Date(val);
			return `${dval.getFullYear()}`;
		}
	},
	methods: {
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
			this.modalData = thumb;
			this.$nextTick(() => {
				const modalIm = document.getElementById('modal-im');
				const outerWidth = 40;
				this.modalWidth = modalIm.width + outerWidth;
			});
		}
	},
	mounted() {
		// 获取轮播首图
		this.$http.get(`/view/paintingList?size=${this.carouselSize}`).then(res => {
			this.greatAry = res.data.data;
		});
		this.changePage(this.page);
	}
}
</script>

<style scoped lang="scss">
.m-carousel {
	background: url('../assets/geometry.png') repeat;
	min-width: 1000px;
	.w-great {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 600px;
		overflow: hidden;
		&>img {
			display: block;
			height: 90%;
		}
	}
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
		width: 150px;
		height: 150px;
		overflow: hidden;
		margin: 8px;
		border-radius: 8px;
		background: #eee;
		&:hover {
			cursor: pointer;
			box-shadow: 0 0 8px #888;
		}
		.u-thumbim {
			position: absolute;
			width: 100%;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			transition: width .5s ease;
			&:hover {
				width: 150%;
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

.w-modal {
	.modal-intro {
		margin: 10px;
		text-align: left;
		.u-intro {
			margin-top: 5px;
		}
	}
}
</style>
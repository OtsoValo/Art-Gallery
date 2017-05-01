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
			<template v-for="thumb in thumbAry">
				<div class="w-thumb">
					<img :src="thumb"
					     alt="缩略图">
				</div>
			</template>
		</section>
		<section class="m-paginbox">
			<Page class="w-pagin"
			      :page-size="pageSize"
			      :total="totalSize"
			      show-total
			      @on-change="changePage"></Page>
		</section>
	
		<Back-top></Back-top>
	</div>
</template>

<script>

export default {
	name: 'AppPainting',
	data() {
		return {
			greatIndex: 0,
			carouselSize: 3,
			page: 1,
			pageSize: 40,
			totalSize: 0,
			greatAry: [],
			thumbAry: []
		};
	},
	computed: {
	},
	methods: {
		changePage(page) {
			this.page = page;
			// 获取缩略图
			this.$http.get(`/view/thumbnailList?page=${page}&pageSize=${this.pageSize}`).then(res => {
				this.totalSize = res.data.total;
				this.thumbAry = res.data.data;
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
		&>img {
			position: absolute;
			height: 100%;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
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
</style>
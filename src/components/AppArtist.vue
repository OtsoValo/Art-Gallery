<template>
	<div class="app-artist">
		<header class="m-artist-list">
			<div class="u-artist"
			     v-for="ids in artistIds"
			     :class="{'u-active': ids.id === artistId}"
			     @click="choseArtist(ids)">
				<img :src="ids.imMin"
				     alt="作家">
			</div>
		</header>
		<div class="m-artist-detail">
			<section class="w-im">
				<img :src="artistData.im">
			</section>
			<div class="right-area">
				<section class="w-intro">
					<h2>{{artistData.name}}（{{artistData.birth | timeNormal}} - {{artistData.death | timeNormal}}）</h2>
					<p>{{artistData.intro}}</p>
				</section>
	
				<Timeline class="w-timeline">
					<Timeline-item v-for="(story, index) in artistData.bigStories"
					               :key="index">
						<h4 class="time">{{story.time}}</h4>
						<p class="content" v-for="cont in story.content.split('\n')">{{cont}}</p>
					</Timeline-item>
				</Timeline>
			</div>
	
			<section class="w-works">
				<Card style="width:600px">
					<p slot="title">
						<Icon type="ios-film-outline"></Icon>
						经典作品
					</p>
					<ul>
						<li v-for="(work, index) in artistData.works">
							<Tag class="u-tag"
							     type="dot">{{work}}</Tag>
							<span class="u-stars">
									<Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star"></Icon>
								</span>
						</li>
					</ul>
				</Card>
	
			</section>
		</div>
	
		<Back-top></Back-top>
	</div>
</template>

<script>
export default {
	name: 'AppArtist',
	data() {
		return {
			artistIds: [],
			artistId: '',
			artistData: {}
		};
	},
	computed: {
	},
	filters: {
		timeNormal(val) {
			const dval = new Date(val);
			return `${dval.getFullYear()}/${dval.getMonth() + 1}`;
		}
	},
	methods: {
		choseArtist(ids) {
			this.artistId = ids.id;
			this.$http.get(`/view/artistInfo?id=${this.artistId}`).then(res => {
				this.artistData = res.data.data;
			});
		}
	},
	mounted() {
		this.$http.get('/view/artists').then(res => {
			this.artistIds = res.data.data;
			this.artistId = res.data.data[0].id;
			this.$http.get(`/view/artistInfo?id=${this.artistId}`).then(res => {
				this.artistData = res.data.data;
			});
		});
	}
}
</script>

<style scoped lang="scss">
@mixin im {
	position: relative;
	overflow: hidden;
	margin: 8px;
	border-radius: 8px;
	background: #eee;
	&>img {
		position: absolute;
		height: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}

@mixin maxmin {
	max-width: 1400px;
	min-width: 1400px;
}

@keyframes scaleQute {
	0% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1.1, 1.1);
	}
	100% {
		transform: scale(1, 1);
	}
}

.m-artist-list {
	@include maxmin;
	margin: 20px auto 0;
	overflow: hidden;
	.u-artist {
		float: left;
		width: 60px;
		height: 60px;
		@include im;
		&.u-active {
			box-shadow: 0 0 12px #333;
		}
		&:hover {
			animation: scaleQute .3s;
			cursor: pointer;
		}
	}
}

.m-artist-detail {
	@include maxmin;
	margin: 20px auto;
	.w-im {
		float: left;
		display: inline-block;
		width: 150px;
		height: 150px;
		margin-right: 20px;
		background: #eee;
		border-radius: 8px;
		overflow: hidden;
		&>img {
			display: block;
			width: 100%;
		}
	}
	.right-area {
		max-width: 1200px;
		float: left;
		.w-intro {
			display: inline-block;
			vertical-align: top;
		}
		.w-timeline {
			margin-top: 20px;
		}
	}
	.w-works {
		@include maxmin;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-left: 170px;
		.u-tag {
			max-width: 70%;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.u-stars {
			float: right;
			margin-top: 8px;
		}
	}
}
</style>
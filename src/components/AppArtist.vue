<template>
	<div class="app-artist">
		<header class="m-artist-list">
			<div class="u-artist"
			     v-for="im in imAry"
			     :class="{'u-active': im === imActive}">
				<img :src="im"
				     alt="作家">
			</div>
		</header>
		<div class="m-artist-detail">
			<section class="w-im">
				<img :src="im">
			</section>
			<div class="right-area">
				<section class="w-intro">
					<h2>{{info.name}}（{{info.life && info.life[0]}} - {{info.life && info.life[1]}}）</h2>
					<p>{{info.intro}}</p>
				</section>
	
				<Timeline class="w-timeline">
					<Timeline-item v-for="(timeline, index) in timelines"
					               :key="index">
						<h4 class="time">{{timeline.time}}</h4>
						<p class="content">{{timeline.content}}</p>
					</Timeline-item>
				</Timeline>
			</div>
	
			<section class="w-works">
				<div class="u-work"
				     v-for="work in works">
					<img :src="work">
				</div>
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
			artists: [],
			activeArtist: 'bjs',
			im: '',
			info: {},
			timelines: [],
			works: []
		};
	},
	computed: {
		imAry() {
			return _.map(this.artists, artist => {
				return `/view/artist?mark=${artist}`;
			});
		},
		imActive() {
			return `/view/artist?mark=${this.activeArtist}`;
		}
	},
	mounted() {
		this.$http.get('/view/artists').then(res => {
			this.artists = res.data;
			this.activeArtist = res.data[0];
			this.$http.get(`/view/artistInfo?mark=${this.activeArtist}`).then(res => {
				this.im = res.data.im;
				this.info = res.data.info;
				this.timelines = res.data.timelines;
				this.works = res.data.works;
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
@keyframes scaleQute{
	0%{
		transform: scale(1, 1);
	}
	50%{
		transform: scale(.8, .8);
	}
	100%{
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
		box-shadow: 0 0 8px #888;
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
		justify-content: center;
		.u-work {
			width: 100px;
			height: 100px;
			&:hover {
				cursor: pointer;
				box-shadow: 0 0 8px #888;
			}
			@include im;
		}
	}
}
</style>
<template>
	<div class="app-artist">
		<header class="m-artist-list">
			<nav>
				<div class="u-artist"
				     v-for="ids in artistIds"
				     :class="{'u-active': ids.id === artistId}"
				     @click="choseArtist(ids.id)">
					<img :src="ids.imMin"
					     alt="作家">
				</div>
			</nav>
		</header>
		<div class="m-artist-detail">
			<section class="left-area">
				<figure class="w-im">
					<img :src="artistData.im">
				</figure>
				<Button class="w-modify"
				        icon="edit"
				        @click="updateArtist(artistData._id)">修改艺术家信息</Button>
				<Button class="w-modify"
				        type="error"
				        icon="trash-a"
				        @click="deleteModal = true">删除该艺术家</Button>
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
						<p class="content"
						   v-for="cont in story.content.split('\n')">{{cont}}</p>
					</Timeline-item>
				</Timeline>
			</div>
	
			<section class="w-works">
				<Card style="width:1200px">
					<p slot="title">
						<Icon type="ios-film-outline"></Icon>
						经典作品
					</p>
					<ul>
						<li class="w-workline"
						    v-for="(work, index) in artistData.works">
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
				        @click="deleteArtist(artistData._id)">删除</Button>
			</div>
		</Modal>
		<Back-top></Back-top>
	</div>
</template>

<script>
import TIPS from '../common/TIPS';
export default {
	name: 'AppArtist',
	data() {
		return {
			artistIds: [],
			artistId: '',
			artistData: {},
			deleteModal: false,
			del_loading: false
		};
	},
	filters: {
		timeNormal(val) {
			const dval = new Date(val);
			return `${dval.getFullYear()}/${dval.getMonth() + 1}`;
		}
	},
	watch: {
		'$route': 'routeArtist'
	},
	methods: {
		// 用于从其他页面指定路由跳转过来相应艺术家
		routeArtist() {
			const aid = this.$route.query.aid;
			if (aid !== this.artistId) {
				this.choseArtist(aid);
			}
		},
		choseArtist(aid) {
			this.artistId = aid;
			this.$router.push({ query: { aid: this.artistId } });
			this.$http.get(`/view/artistInfo?id=${this.artistId}`).then(res => {
				this.artistData = res.data.data;
			});
		},
		updateArtist(aid) {
			this.$router.push({ path: 'editArtist', query: { aid: aid } });
		},
		deleteArtist(aid) {
			this.del_loading = true;
			const im = encodeURIComponent(this.artistData.im);
			const imMin = encodeURIComponent(this.artistData.imMin);
			this.$http.delete(`/view/deleteArtist?aid=${aid}&im=${im}&imMin=${imMin}`).then(res => {
				// 重新刷新获取所有艺术家
				this.del_loading = false;
				this.deleteModal = false;
				this.getAllArtists(false);
				if(res.data.code === 200){
					this.$Notice.success({ title: TIPS.DELETE_ARTIST_SUCC });
				} else {
					this.$Notice.error({ title: TIPS.DELETE_ARTIST_FAIL });
				}
			});
		},
		getAllArtists(noDel = true) {
			this.$http.get('/view/artists').then(res => {
				this.artistIds = res.data.data;
				let aid = this.$route.query.aid;
				if (aid && noDel) {
					this.artistId = aid;
				} else {
					this.artistId = res.data.data[0].id;
					this.$router.push({ query: { aid: this.artistId } });
				}
				this.$http.get(`/view/artistInfo?id=${this.artistId}`).then(res => {
					this.artistData = res.data.data;
				});
			});
		}
	},
	mounted() {
		this.getAllArtists();
	}
}
</script>

<style scoped lang="scss">
[v-clock] {
	display: none;
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
	background: url('../assets/gplaypattern.png') repeat;
	border-bottom: 1px solid #eee;
	padding: 20px 0;
	overflow: hidden;
	nav {
		@include maxmin;
		margin: 0 auto;
		.u-artist {
			position: relative;
			float: left;
			height: 80px;
			overflow: hidden;
			margin: 8px;
			border-radius: 4px;
			background: #eee;
			&>img {
				height: 100%;
			}
			&.u-active {
				box-shadow: 0 0 12px #333;
			}
			&:hover {
				animation: scaleQute .3s;
				cursor: pointer;
			}
		}
	}
}

.m-artist-detail {
	@include maxmin;
	margin: 20px auto;
	.left-area {
		float: left;
		display: block;
		max-width: 150px;
		margin-right: 20px;
		text-align: center;
		.w-im {
			width: 150px;
			height: auto;
			background: #eee;
			border-radius: 8px;
			overflow: hidden;
			&>img {
				display: block;
				width: 100%;
			}
		}
		.w-modify {
			width: 100%;
			margin-top: 10px;
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
		padding-left: 170px;
		.w-workline {
			padding: 4px;
			transition: background .8s ease;
			.u-tag {
				max-width: 70%;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.u-stars {
				float: right;
				margin-top: 8px;
			}
			&:hover {
				background: #f9f9f9;
			}
		}
	}
}
</style>
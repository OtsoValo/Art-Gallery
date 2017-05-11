<template>
	<div class="audio-player">
		<div class="player-shell"
		     :class="{'shell-padding': audio.mini === false}">
			<div class="shell-head"
			     @click="miniSwitch">
				<img :class="{'rolling': audio.playing}"
				     class="w-wheel"
				     src="../assets/iview_wheel.png">
			</div>
			<audio ref="audiooo"
			       :src="audioSrc"></audio>
			<div class="w-ctrl"
			     v-show="audio.mini === false">
				<Button-group>
					<Button>{{audioName}}</Button>
					<Button type="primary"
					        icon="play"
					        @click="play"></Button>
					<Button type="primary"
					        icon="pause"
					        @click="pause"></Button>
					<Button type="primary"
					        icon="refresh"
					        @click="restart"></Button>
				</Button-group>
			</div>
			<div class="shell-tail"
			     @click="miniSwitch"
			     v-show="audio.mini === false">
				<img :class="{'rolling': audio.playing}"
				     class="w-wheel"
				     src="../assets/iview_wheel.png">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AudioPlayer',
	props: {
		audioSrc: {
			type: String,
			default: '/view/audio?fn=stone_road'
		},
		audioName: {
			type: String,
			default: '无名氏音频'
		}
	},
	data() {
		return {
			audio: {
				playing: false,
				mini: false
			}
		}
	},
	watch: {
	},
	methods: {
		play() {
			const audiooo = this.$refs.audiooo;
			audiooo.play();
			this.audio.playing = true;
		},
		pause() {
			const audiooo = this.$refs.audiooo;
			audiooo.pause();
			this.audio.playing = false;
		},
		restart() {
			const audiooo = this.$refs.audiooo;
			audiooo.currentTime = 0;
			audiooo.play();
			this.audio.playing = true;
		},
		miniSwitch() {
			this.audio.mini = !this.audio.mini;
		}
	},
	mounted() {
		const audiooo = this.$refs.audiooo;
		audiooo.addEventListener('ended', () => {
			this.audio.playing = false;
		});
	}
}
</script>

<style lang="scss" scoped>
$wheelSize: 50px;
$playerBg: #333;
$playerWidth: 300px;
$padding: 10px;
$shadow: 0 0 12px #444;
@mixin playerBasic {
	position: relative;
	display: block;
	height: $wheelSize;
}

@mixin shell_ball {
	position: absolute;
	width: $wheelSize;
	height: $wheelSize;
	background: $playerBg;
	border-radius: 50%;
	box-shadow: $shadow;
}

.rolling {
	animation: roll 2s linear infinite;
}

@keyframes roll {
	0% {
		transform: translate(-50%, -50%) rotateZ(0);
	}
	100% {
		transform: translate(-50%, -50%) rotateZ(360deg);
	}
}

.audio-player {
	@include playerBasic;
	.shell-padding {
		padding-left: $wheelSize/2+10;
		padding-right: $wheelSize/2+10;
	}
	.player-shell {
		position: relative;
		height: 100%;
		background: $playerBg;
		margin-left: $wheelSize/2;
		box-shadow: $shadow;
		.shell-head {
			@include shell_ball;
			top: 0;
			left: -$wheelSize/2;
		}
		.shell-tail {
			@include shell_ball;
			top: 0;
			right: -$wheelSize/2;
		}
		.shell-head,
		.shell-tail {
			cursor: pointer;
			img.w-wheel {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 120%;
				display: block;
			}
		}
		.w-ctrl {
			position: relative;
			display: inline-block;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>
<template>
	<div class="app-painting">
		<mu-grid-list :cols="6">
			<mu-grid-tile v-for="url in urlAry" title="未知的一幅画" subTitle="作者我也想知道是谁">
				<img :src="url" alt="">
				<mu-icon-button icon="face" slot="action"/>
			</mu-grid-tile>
		</mu-grid-list>
	</div>
</template>

<script>
export default {
	name: 'AppPainting',
	data() {
		return {
		}
	},
	computed: {
		urlAry(){
			let start = 1043,
				end = 1300,
				urlAry = [];
			while(start <= end){
				urlAry.push(`/view/painting?id=${start}`);
				start++;
			}
			return urlAry;
		}
	}
}
</script>

<style scoped>

</style>
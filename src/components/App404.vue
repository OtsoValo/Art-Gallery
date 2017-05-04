<template>
	<div class="app-404">
		<figure class="m-404-body">
			<img src="../assets/404code.jpg" alt="404">
		</figure>
	</div>
</template>

<script>
export default {
	name: 'App404'
}
</script>

<style lang="scss" scoped>
.app-404{
	max-width: 1400px;
	min-width: 800px;
	margin: 0 auto;
	.m-404-body{
		&>img{
			display: block;
			margin: 20px auto;
		}
	}
}
</style>
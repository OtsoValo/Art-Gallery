<template>
	<div class="app-404">
		<figure class="m-404code">
			<img src="../assets/404code.jpg"
			     alt="404">
		</figure>
		<section class="m-404guide">
			<Alert show-icon
			       class="w-404notice">
				<h3>哦不~页面走丢了，可能有以下几个原因哦</h3>
				<Icon type="ios-lightbulb-outline"
				      slot="icon"></Icon>
				<template slot="desc">
					<ol>
						<li>有可能输入非法的页面路径哦，可以
							<Badge dot><a href="javascript:void(0);"
								   @click="routeIndex">返回首页</a>
							</Badge>
						</li>
						<li>有可能资源走丢了，让我们<a href="javascript:void(0);"
							   @click="routeBefore">回到上一步</a></li>
						<li>也有可能是服务器出问题了，请用力<a href="javascript:void(0);"
							   @click="routeIndex">回到最初</a>的美好试试吧</li>
					</ol>
				</template>
			</Alert>
		</section>
	</div>
</template>

<script>
export default {
	name: 'App404',
	methods: {
		routeIndex() {
			this.$router.push({ path: '/painting' });
		},
		routeBefore() {
			this.$router.go(-1);
		}
	}
}
</script>

<style lang="scss" scoped>
.app-404 {
	max-width: 1400px;
	min-width: 1000px;
	margin: 20px auto;
	.m-404code {
		img {
			margin: 0 auto;
			display: block;
		}
	}
	.m-404guide {
		width: 450px;
		margin: 0 auto;
		.w-404notice {
			background: #fff;
			border: none;
		}
	}
}
</style>
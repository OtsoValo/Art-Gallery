<template>
	<div id="app">
		<Menu mode="horizontal"
		      theme="light"
		      :active-name="defaultLink"
		      @on-select="routePage">
			<Menu-item name="painting">
				<Icon type="ios-color-filter"></Icon>
				画廊
			</Menu-item>
			<Menu-item name="artist">
				<Icon type="beer"></Icon>
				艺术家展厅
			</Menu-item>
			<Menu-item name="style">
				<Icon type="pizza"></Icon>
				风格拼图
			</Menu-item>
			<Menu-item name="explore">
				<Icon type="ios-infinite"></Icon>
				无尽探索
			</Menu-item>
			<Submenu name="admin"
			         v-if="isLogin === true"
			         style="z-index: 99;">
				<template slot="title">
					<Icon type="ios-gear"></Icon>
					后台
				</template>
				<Menu-group title="增加处理">
					<Menu-item name="newArtist">新增一个艺术家</Menu-item>
					<Menu-item name="newPainting">新增一幅画作</Menu-item>
				</Menu-group>
				<Menu-group title="编辑更新">
					<Menu-item name="editArtist"
					           disabled>编辑某个艺术家</Menu-item>
					<Menu-item name="editPainting"
					           disabled>编辑某幅画作</Menu-item>
				</Menu-group>
			</Submenu>
	
			<div class="power-admin">
				<Poptip trigger="hover"
				        placement="bottom"
				        :content="user.uid">
					<a class="w-user-identify"
					   href="javascript:void(0);"
					   @click="canDoLogout">{{user.account}} :) </a>
				</Poptip>
				<Button type="ghost"
				        v-if="isLogin === false"
				        @click="registModal = true">注册</Button>
				<Button type="ghost"
				        v-if="isLogin === false"
				        @click="loginModal = true">登录</Button>
				<img class="w-logo"
				     src="./assets/favicon.png"
				     alt="LOGO">
			</div>
		</Menu>
	
		<!--登录弹窗-->
		<Modal v-model="loginModal"
		       width="360">
			<p slot="header"
			   style="color:#39f;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>登录</span>
			</p>
			<div style="text-align:center">
				<Input v-model="login.account"
				       size="large">
				<span slot="prepend">账号</span>
				</Input>
				<br/>
				<Input v-model="login.pwd"
				       type="password"
				       size="large">
				<span slot="prepend">密码</span>
				</Input>
			</div>
			<div slot="footer">
				<Button type="primary"
				        size="large"
				        long
				        :loading="login.loading"
				        @click="doLogin">确认</Button>
			</div>
		</Modal>
		<!--注册弹窗-->
		<Modal v-model="registModal"
		       width="360">
			<p slot="header"
			   style="color:#39f;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>注册</span>
			</p>
			<div style="text-align:center">
				<Input v-model="regist.account"
				       size="large">
				<span slot="prepend">账号</span>
				</Input>
				<br/>
				<Input v-model="regist.pwd"
				       type="password"
				       size="large">
				<span slot="prepend">密码</span>
				</Input>
				<br/>
				<Input v-model="regist.email"
				       size="large">
				<span slot="prepend">邮箱</span>
				</Input>
			</div>
			<div slot="footer">
				<Button type="primary"
				        size="large"
				        long
				        :loading="regist.loading"
				        @click="doRegist">确认</Button>
			</div>
		</Modal>
	
		<!--登出弹窗-->
		<Modal v-model="logoutModal"
		       width="360">
			<p slot="header"
			   style="color:#f60;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>登出</span>
			</p>
			<div style="text-align:center">
				<p>登出后，无法对画作及艺术家等数据进行操作。</p>
				<p>是否继续登出？</p>
			</div>
			<div slot="footer">
				<Button type="error"
				        size="large"
				        long
				        :loading="logout.loading"
				        @click="doLogout">登出</Button>
			</div>
		</Modal>
		<div class="app-view">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			defaultLink: 'painting',
			loginModal: false,
			registModal: false,
			logoutModal: false,
			isLogin: false,
			user: {
				account: '游客',
				uid: 'noop~'
			},
			login: {
				account: '',
				pwd: '',
				loading: false
			},
			regist: {
				account: '',
				pwd: '',
				email: '',
				loading: false
			},
			logout: {
				loading: false
			}
		};
	},
	methods: {
		routePage(name) {
			this.$router.push({ path: name });
		},
		changeMenu() {
			this.defaultLink = this.$route.path.split('/')[1];
		},
		doRegist() {
			const registData = _.cloneDeep(this.regist);
			this.regist.loading = true;
			delete registData.loading;
			this.$http.post('/view/regist', registData).then(res => {
				if (res.data.code === 200) {
					this.$Notice.success({
						title: '注册成功啦，赶紧去登录吧~'
					});
					this.registModal = false;
					this.loginModal = true;
				} else {
					this.$Notice.warning({
						titls: '注册失败啦，请重新尝试！'
					});
				}
				this.regist.loading = false;
			});
		},
		doLogin() {
			const loginData = _.cloneDeep(this.login);
			this.login.loading = true;
			delete loginData.loading;
			this.$http.post('/view/login', loginData).then(res => {
				const resd = res.data;
				if (resd.code === 200) {
					this.$Notice.success({
						title: '登录成功，现拥有操作后台权限'
					});
					this.user.account = resd.data.account;
					this.user.uid = resd.data.uid;
					this.isLogin = true;
					this.loginModal = false;
				} else if (resd.code === 400) {
					this.$Notice.error({
						title: '账号密码匹配失败，请重新尝试！'
					});
				} else {
					this.$Notice.warning({
						title: '服务器出错，请重新尝试'
					});
				}
				this.login.loading = false;
			});
		},
		canDoLogout() {
			if (this.isLogin) {
				this.logoutModal = true;
			}
		},
		doLogout() {
			if (!this.isLogin) return;
			this.logout.loading = true;
			this.$http.post('/view/logout').then(res => {
				const resd = res.data;
				if (resd.code === 200) {
					this.$Notice.success({
						title: '登出成功'
					});
					this.isLogin = false;
					this.user = {
						account: '游客',
						uid: 'noop~'
					};
					this.logoutModal = false;
				} else {
					this.$Notice.warning({
						title: '服务器出错，请重新尝试'
					});
				}
				this.logout.loading = false;
			});
		}
	},
	watch: {
		'$route': 'changeMenu'
	},
	mounted() {
		const curPath = this.$route.path;
		this.defaultLink = curPath.split('/')[1];
		this.$http.get('/view/meet').then(res => {
			const resd = res.data;
			if (resd.code === 200) {
				this.user.account = resd.account;
				this.user.uid = resd.uid;
				this.isLogin = true;
			} else {
				this.isLogin = false;
			}
		});
	}
}
</script>

<style scoped lang="scss">
#app {
	.power-admin {
		float: right;
		height: 100%;
		.w-user-identify {
			margin-right: 10px;
		}
		.w-logo {
			display: block;
			float: right;
			height: 36px;
			margin: 12px;
		}
	}
}
</style>

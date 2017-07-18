<template>
	<div class="login">
		<div class="img1" style="width:0px"></div>
		<div style="width:100%;height:100%;background-color:rgb(255, 255, 255);overflow: hidden;text-align:center;">
	
			<p style="position:absolute;top:260px;text-align:center;color:white;font-size:2em;width:100%;margin-top:35px;">
				<span>迪锐克斯 DXRacer 分销管理系统</span>
			</p>
			<div id="M-p" style="width:1920px;height:250px;position:absolute;left:50%;margin-left:-960px;background-size:100% 100%;background-image:url(${pageContext.request.contextPath }/static/images/bg2.png);top:380px;">
				<div style="width:700px;margin:0px auto;position:relative;left:-55px;">
					<div style="width:450px;height:265px;display:inline-block;position:relative;top:-250px;background-image:url(${pageContext.request.contextPath }/static/images/28.png);left:130px;background-size:100% 100%;">
						<div>
							<span style='width:36px;height:36px;display:inline-block;background-color: red;line-height:36px'>
							</span>
							<input style="width:320px;height:36px;padding-left:10px;" name="business_id" id="business_id" v-model="business_id" placeholder="企业编号" value="">
						</div>
	
						<div style='margin-top:5px;'>
							<span style='width:36px;height:36px;display:inline-block;background-color: red;line-height:36px'>
							</span>
							<input style="width:320px;height:36px;padding-left:10px;" name="username" id="username" v-model="username" placeholder="用户名" value="">
						</div>
						<div style="margin-top:5px">
							<span style='width:36px;height:36px;display:inline-block;background-color: red;line-height:36px'>
							</span>
							<input type="password" placeholder="密码" style="width:320px;height:36px;padding-left:10px;" id="password" v-model="password" name="password" value="">
						</div>
						<div style="margin-top:20px">
							<button v-on:click="_login" id="example">登录</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import api from '../service/base.js'
export default {
	// name: 'hello',
	// data() {
	// 	return {
	// 		msg: '迪锐克斯 dxdacer官网登录'
	// 	}
	// },
	methods: {
          // 用户登录
        _login() {
            if (!this.username || !this.password || !this.business_id ) {
                alert('请填写完整')
                return
            }
            var data={
              'username':this.username,
              'password':this.password,
              'business_id':this.business_id
            }
            api.signin(data).then(res => {
                    if(res.data.code == "success") {
                      this.$router.replace('/demoserver')
                    }else{
						alert(res.data.message)
					}
                    

                }).catch(error => {
                 alert('网络错误')
                })
        }
	}
}


</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
input:-webkit-autofill {
	-webkit-box-shadow: 0 0 0px 1000px white inset;
}

input {
	background-color: rgb(255, 255, 255)!important;
	/* outline: none; */
	box-shadow: 2px 4px -6px #000;
}

html {
	width: 100%!important;
	height: 100%;
}

@media (max-width:768px) {
	body {
		position: absolute!important
	}
	#M-p {
		left: 0px!important;
		margin-left: 0px!important;
		width: 100%!important;
		top: 200px!important;
		background-image: url()!important;
	}
	#M-p>div {
		width: 100%!important;
		left: 0px!important;
	}
	.img {
		width: 0px!important;
	}
	.img:nth-of-type(1) {
		position: absolute!important;
		top: -20px!important;
		width: 220px!important;
		margin-top: 10px;
		left: calc((100% - 220px) / 2)!important;
	}
	.img1 {
		width: 100%!important;
		background-image: url(/static/images/b-p.png)!important;
		position:absolute;
		top:0px!important;
		background-size: 100% 100%!important
	}
	#M-p>div>img {
		width: 0px!important;
		height: 68px!important
	}
	#M-p>div>div {
		left: 0px!important;
		width: 100%!important;
		height: 210px!important;
		background-size: '100% 100%'!important;
		background-image: url()!important
	}
	/* input {
		width: calc(100% - 70px)!important;
		background-color: rgb(255, 255, 255)!important;
	} */
	button {
		width: calc(100% - 20px)!important
	}
	p {
		top: 170px!important;
		color: #E50113!important;
		padding: 15px 0px!important;
		font-size: 1.2em!important;
		margin-top: 0px!important
	}
	p span {
		border-top: '1px solid #E50113'!important;
		padding-top: 10px!important
	}
}
</style>

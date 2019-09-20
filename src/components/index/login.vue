<template>
  <div id="login" class="login">
    <div id="container">
      <div id="content" class="content">
        <img src="../../assets/image2.jpg" height="150px" width="200px">
        <input type="text" placeholder="Username" v-model="user.userName" @keydown.enter="jump1">
        <br><br>
        <input type="password" placeholder="Password" v-model="user.pwd" @keydown.enter="jump1">
        <br><br>
        <div id="input2"></div>
        <br v-show="!show"><span class="wun" v-show="show">用户名或密码错误</span>
        <button class="button" @click="jump1" @keydown.enter="jump1">Sign in</button>
        <div id="forget" class="forget">
          <p>Forget Password?</p>
          <p @click="jumpRegister">Sign Up</p>
        </div>
      </div>
    </div>
    <Modal v-model="modal1" title="请选择系统" :mask-closable="false" :closable="false">
      <div style="display: flex;justify-content: center">
        <Button type="primary" style="margin-right: 15px" @click="jumpTest">测试管理系统</Button>
        <Button type="error" @click="jumpSense">感知数据管理</Button>
      </div>

      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        flag: true,
        jump: '#',
        user: {
          userName: '',
          pwd: '',
          registerDate: '2019',
          onLine:false,
        },
        show: false,
        modal1:false,
      }
    },
    created:function(){
      localStorage.removeItem("isLogin");
    },
    methods: {
      jump1() {
        console.log('user',this.user);
        console.log('11');
        let that = this;
        this.$router.replace('/systempresent');
        this.$http(
          {
            url: 'login/user/login',
            method: "post",
            dataType: "json",
            data:{
              userName: this.user.userName,
              pwd: this.user.pwd,
              registerDate: this.user.registerDate,
              onLine:this.user.onLine,
            }
          })
          .then(function (response) {
            console.log(response);
            console.log('success');
            let name = that.user.userName;
            localStorage.setItem("isLogin", name);
            that.$store.commit('changeLogin');
            console.log('islogin',that.$store.state.isLogin);
            console.log('usename',name);
            that.modal1=true;
            // this.$Spin.hide();
          })
          .catch(function (error) {
            console.log(error);
            // this.$Spin.hide();
          })
      },
      jumpRegister() {
        this.$router.replace('/register');
      },
      jumpTest(){
        this.$router.replace('/testindex');
      },
      jumpSense(){
        this.$router.replace('/perceiveindex')
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--返回状态码200：登陆成功，返回306：用户名或者密码错误，返回302：跳转至登录界面-->
<style scoped>
  .login {
    background: url("../../assets/seu.jpg") no-repeat;
    background-size: 100% 100%;
    height: 100%;
    position: relative;
    width: 100%;
  }

  input {
    width: 320px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid black;
    padding-left: 5px;
    background-color: white;
  }

  input:hover {
    width: 320px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid red;
    padding-left: 5px;
    background-color: white;
  }

  .content {
    width: 400px;
    height: 460px;
    opacity: 0.95;
    background-color: white;
    position: absolute;
    margin: auto;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    text-align: center;
  }

  .button {
    width: 320px;
    height: 50px;
    border-radius: 5px;
    background-color: rgba(2, 76, 110, 0.99);
    border: 1px solid black;
    color: white;
  }

  .button:hover {
    width: 320px;
    height: 50px;
    border-radius: 5px;
    background-color: rgba(2, 112, 147, 0.99);
    border: 1px solid black;
    color: white;
    cursor: pointer;
  }

  .forget {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding-top: 10px;
    padding-left: 40px;
    padding-right: 40px;
  }

  .forget p {
    background-color: white;
    font-size: small;
    cursor: pointer;
  }

  .forget p:hover {
    background-color: white;
    font-size: small;
    cursor: pointer;
    color: blue;
  }

  .wun {
    color: red;
    font-size: 16px;
  }
</style>

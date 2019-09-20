<template>
  <div id="index">
    <layout>
      <header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <router-link to="/developer">
              <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>
                开发者
              </MenuItem>
            </router-link>
            <router-link to="/description">
              <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>
                使用说明
              </MenuItem>
            </router-link>
            <router-link to="#">
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-analytics"/>
                  {{username}}
                </template>
                <MenuGroup title="欢迎您">
                  <MenuItem name="3-1" v-show="show1" to="/login">
                    请登录
                  </MenuItem>
                  <MenuItem name="3-2" v-show="show2" to="/testinformation">
                    进入测试系统
                  </MenuItem>
                  <MenuItem name="3-2" v-show="show2" to="/perceiveindex">
                    进入感知系统
                  </MenuItem>
                  <MenuItem name="3-3" v-show="show2" >
                    <div @click="release">注销</div>
                  </MenuItem>
                </MenuGroup>
              </Submenu>
            </router-link>
          </div>
        </Menu>
      </header>
      <Content :style="{height: '100vh', marginTop:'-64px'}">
        <router-view></router-view>
      </Content>
      <footer class="footer">Copyright 2018-2019 ©Cza</footer>
    </layout>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        username: '',
        show1: true,
        show2: false,
        title: ''
      }
    },
    created: function () {
      var name = localStorage.getItem("isLogin");
      if (name) {
        this.username = "欢迎您，" + name;
        this.show2 = true;
        this.show1 = false;
        this.title = "欢迎您";
      } else {
        this.username = '登录';
        this.show1 = true;
        this.show2 = false;
      }
    },
    methods: {
      release: function () {
        let that = this;
        this.$http(
          {
            url: 'login/user/logOff',
            method: "post",
            dataType: "json",
            data:{}
          })
          .then(function (response) {
            console.log(response);
            console.log('注销成功');
            localStorage.removeItem("isLogin");
            that.show1 = true;
            that.show2 = false;
            that.username = "登录";
            that.$router.replace('/')
            // this.$Spin.hide();
          })
          .catch(function (error) {
            console.log(error);
            // this.$Spin.hide();
          })
      },
    }
  }
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }

  layout {
    height: 100%;
  }

  #index {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 100px;
    background-image: url('../../assets/WSN.png');
    background-size: 100% 100%;
  }

  .layout-nav {
    float: right;
    padding-right: 500px;
  }

  .footer {
    width: 100%;
    font-size: large;
    position: fixed;
    bottom: 0px;
    text-align: center;
  }
</style>

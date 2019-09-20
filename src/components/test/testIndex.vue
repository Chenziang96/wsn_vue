<template>
  <div id="testindex">
    <Menu mode="horizontal" :theme="theme1" active-name="1" class="testindex">
      <MenuItem name="1" class="wsn" to="/">
        物联网测试平台
      </MenuItem>
      <MenuItem name="2" class="testin" to="/testinformation">
        <Icon type="ios-paper"/>
        系统介绍
      </MenuItem>
      <MenuItem name="3" to="/testarrangement">
        <Icon type="ios-code"/>
        节点管理
      </MenuItem>
      <MenuItem name="4" to="/netSelf">
        <Icon type="ios-cloud"/>
        自主组网
      </MenuItem>
      <MenuItem name="5" to="/testperformance">
        <Icon type="ios-stats"/>
        性能测试
      </MenuItem>
      <MenuItem name="6" to="/performancecomparison">
        <Icon type="ios-bulb"/>
        性能对比
      </MenuItem>
      <MenuItem name="7" to="/historyinquiry">
        <Icon type="logo-buffer"/>
        历史查询
      </MenuItem>
      <router-link to="#">
        <Submenu name="8">
          <template slot="title">
            <Icon type="ios-analytics"/>
            {{username}}
          </template>
          <MenuGroup title="欢迎您">
            <MenuItem name="3-1" v-show="show1" to="/login">
              请登录
            </MenuItem>
            <MenuItem name="3-2" v-show="show2" to="/">
              返回首页
            </MenuItem>
            <MenuItem name="3-3" v-show="show2">
              <div @click="release">注销</div>
            </MenuItem>
          </MenuGroup>
        </Submenu>
      </router-link>
      <Button type="warning" class="testbutton" to="/perceiveindex">感知模块</Button>
    </Menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'testIndex',
    data() {
      return {
        theme1: 'dark',
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
      this.$router.replace('/testinformation')
    },
    methods: {
      release: function () {
        let that = this;
        this.$http(
          {
            url: 'login/user/logOff',
            method: "post",
            dataType: "json",
            data: {}
          })
          .then(function (response) {
            console.log(response);
            console.log('注销成功');
            localStorage.removeItem("isLogin");
            that.$store.commit('deleteLogin');
            console.log('islogin',that.$store.state.isLogin);
            that.show1 = true;
            that.show2 = false;
            that.username = "登录";
            that.$router.replace('/login')
            // this.$Spin.hide();
          })
          .catch(function (error) {
            console.log(error);
            // this.$Spin.hide();
          })
      }
    }

  }
</script>

<style scoped>
  .testindex {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1180px;
  }

  .wsn {
    font-size: large;
  }

  .testin {
    margin-left: 60px;
  }

  .testbutton {
    margin-left: 60px;
  }
</style>

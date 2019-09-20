<template>
  <div class="systemPresent">
    <div class="layout">
      <Menu mode="horizontal" :theme="theme1" active-name="1" class="testindex" style="background-color: black">
        <MenuItem name="1" class="wsn">
          多应用物联网实验平台
        </MenuItem>
      </Menu>
    </div>
    <div class="main">
      <div class="button">
        <Button type="primary" @click="jumpTest">进入测试系统</Button>
        <Button type="primary" style="margin-left: 50px " @click="jumpSense">进入感知管理</Button>
      </div>
      <router-view></router-view>
    </div>


  </div>

</template>

<script>
  export default {
    name: "systemPresent",
    data() {
      return{
        theme1: 'dark',
      }
    },
    methods:{
      jumpTest(){
        this.$router.replace('/testindex');
      },
      jumpSense(){
        this.$router.replace('/perceiveindex')
      }
    },
    mounted() {
      this.$router.push('systemTopology')
    }
  }
</script>

<style scoped>
  .wsn{
    font-size: large;
  }
  .main{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 5px;
    flex-wrap: wrap;
  }
  .button{
    width: 60%;
    display: flex;
    justify-content: center;
  }

</style>

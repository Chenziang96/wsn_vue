<template>
  <div class="performanceComparison">
    <div class="title">丢包率测试结果对比</div>
    <div class="tag">
      <div :class="{delay:click1, chosen:click2}" @click="delay">时延测试</div>&nbsp;/&nbsp;<div :class="{loss:click3,chosen:click4}" @click="delay1">丢包率测试</div>
    </div>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "performanceComparison",
    data() {
      return {
        click1: false,
        click2: true,
        click3:true,
        click4:false
      }
    },
    methods: {
      delay: function () {
        this.$router.replace("/netdelay");
        this.click1= false;
        this.click2= true;
        this.click3= true;
        this.click4= false;
      },
      delay1: function () {
        this.$router.replace("/netloss");
        this.click3= false;
        this.click4= true;
        this.click1= true;
        this.click2= false;
      }
    },
    mounted(){
      this.$router.replace("/netdelay")
    }
  }
</script>

<style scoped>
  .performanceComparison {
    margin: 0px auto;
    bottom: 20px;
    height: 670px;
    width: 1000px;
  }

  .title {
    font-size: 25px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .tag {
    margin-top: 5px;
    font-size: 13px;
    width: 1000px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: flex-start;
  }

  .delay {
    width: 53px;
    cursor: pointer;
  }
  .chosen{
    font-weight: bold;
    font-size: 13px;
  }
  .loss {
    width: 65px;
    cursor: pointer;
  }
</style>

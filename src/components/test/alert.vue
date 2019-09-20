<template>
    <div class="alert">
      <div class="alertbody">
        <div class="alerttitle">
          提示
        </div>
        <div class="alertmain">
          <Modal></Modal>
         系统启动成功！
        </div>
        <div class="btn">
          <Button type="success" class="success" @click="btnback">确认</Button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'alert',
  methods: {
    btnback () {
      this.$router.replace('/testinformation')
    }
  }
}
</script>

<style scoped>
  .alert{
    background-color: gray;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(55,55,55,.6);
    height: 100%;
    width: 100%;
  }
  .alertbody{
    width:370px;
    height: 250px;
    background-color: white;
    border-radius: 6px;
    position: absolute;
    margin: auto;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px
  }
  .btn{
    text-align: center;
  }
  .success{
    bottom: 5px;
    margin-top: 5px;
  }
  .alerttitle{
    width: 100%;
    height: 70px;
    font-size: 18px;
    color: black;
    padding-left: 10px;
    padding-top: 5px;
  }
  .alertmain{
    width: 100%;
    height: 130px;
    font-size:22px;
    color: black;
    text-align: center;
    padding-top: 20px;
  }

</style>

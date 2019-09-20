<template>
  <div id="testinformation" class="testinformation">
    <div class="head">
      <div class="title">系统简介</div>
      <br>
      <div class="maintext">
        物联网感知层测试床系统是为物联网感知层提供的一种协议测试系统。物联网感知层具有规模大，节点数量多，节点能耗低等特点。用户开发的传感器网络如果不经过测试容易造成系统不稳定、寿命短、传输时延长和有效节点比例低等问题。同时未经测试的物联网感知层在投入使用时，很有可能会遭受各种恶意攻击（如女巫攻击、黑洞攻击、虫洞攻击等），给使用者带来一定的损失。
        物联网感知层测试床系统提供了一个供用户测试的软硬件平台，使用该测试床对协议进行测试，可以有效模拟物联网感知层部署的真实场景，从而对用户协议的各项性能进行测试和研究，促进物联网感知层协议的改进和完善。
      </div>
      <div class="testName">请输入测试名：</div>
      <div style="margin-top: 20px">
        <Input v-model="testName" placeholder="输入测试名" style="width: 100px;margin-left: 10px"/>
        <Button type="success" style="height: 42px;width: 100px;font-size: 15px;margin-left: 5px"
                @click="startConnection" v-show="buttonShow">启动系统
        </Button>
        <Button type="primary" style="height: 42px;width: 100px;font-size: 15px;margin-left: 5px" v-show="buttonShow1"
                @click="resConnection">重新测试
        </Button>
      </div>

      <Modal
        v-model="modal1"
        title="系统状态提示">
        <div>系统启动成功</div>
        <br>
        <div>testid为:{{testId}}</div>
        <div slot="footer">
          <Button type="primary" size="large" @click="handleSubmit">关闭</Button>
        </div>
      </Modal>
    </div>
    <div style="display: flex;flex-wrap: wrap;font-size: 22px;width:1000px;color: black">
      当前系统状态：
    </div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>

</template>

<script>
  import {postTestName} from "../../request/api";
  import {getControlCenterId} from "../../request/api";
  import {getNodeInformation1} from "../../request/api";
  import {getNodeInformation} from "../../request/api";

  export default {
    name: "testinformation",
    data() {
      return {
        clc: 'start',
        buttonShow: '',
        buttonShow1: '',
        isA: true,
        alertshow: false,
        modal1: false,
        testId: '',
        testName: '',
        isRouterAlive:true,
        controlId:'',
        items:'',
        sendData: {
          testName: '',
          testId: '',
          userName: '',
          testTime: ''
        },
      }
    },
    mounted() {
      this.sendData.userName = localStorage.getItem('isLogin');
      this.items = JSON.parse(sessionStorage.getItem('systemTopology'));
      this.testName = sessionStorage.getItem('startConnection');
      if (this.testName) {
        this.buttonShow = false;
        this.buttonShow1 = true;
      }else {
        this.buttonShow = true;
        this.buttonShow1 = false;
      }
      this.$router.push('/childtopology')
    },
    methods: {
      handleSubmit() {
        this.modal1 = false;
      },
      ok() {
        this.$Message.info('Clicked ok');
      },
      cancel() {
        this.$Message.info('Clicked cancel');
      },
      sendTestName() {
        let that = this;
        this.sendData.testId = this.testId;
        let myDate = new Date();
        console.log(myDate);
        let day = myDate.getDate();
        let month = myDate.getMonth();
        let year = myDate.getFullYear();
        let hour = myDate.getHours();
        let minute = myDate.getMinutes();
        let second = myDate.getSeconds();
        let time = year + '-' + month + '-' + day + '\\' + hour + ':' + minute + ':' + second;
        console.log(time);
        this.sendData.testTime = time;
        that.sendData.testName = that.testName;
        postTestName(that.sendData)
          .then((response) => {
            console.log("修改");
            console.log(response);
            this.modal1 = true;
            that.buttonShow = false;
            that.buttonShow1 = true;
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      },
      mapItem(){
        let that = this;
        console.log('11231',this.items);
        for(var i=4;i<10;i++){
          that.items[i].back_active=true;
          that.items[i].active=true;
        }
        console.log(this.items);
        sessionStorage.setItem('systemTopology',JSON.stringify(this.items));
      },
      startConnection: function () {
        let that = this;
        this.mapItem();
        this.reload();
        if (this.testName) {
          this.$http.get('/api/datatransmission/startConnection')
            .then((response) => {
              console.log("成功");
              console.log(response);
              this.getTestid();
              sessionStorage.setItem('startConnection', this.testName);
            })
            .catch(function (error) {
              console.log(error);
            })
        } else {
          this.$Message.error('请输入测试名');
        }
      },
      resConnection() {
        if (this.testName) {
          this.$http.get('/api/datatransmission/restartConnection')
            .then((response) => {
              console.log("成功");
              console.log(response);
              sessionStorage.setItem('startConnection', this.testName);
              this.getTestid();
            })
            .catch(function (error) {
              console.log(error);
            })
        } else {
          this.$Message.error('请输入测试名');
        }
      },
      getTestid: function () {
        this.$http.get('/api/datatransmission/getTestId')
          .then((response) => {
            console.log("成功1");
            console.log(response);
            this.testId = response.data;
            sessionStorage.setItem("testId", JSON.stringify(response.data));
            this.getNodeIfm();
            this.sendTestName();
            this.getControlCenterId();
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      getControlCenterId(){
        getControlCenterId.then((res) => {
          console.log("获取控制中心号成功");
          console.log(res);
          this.controlId = res.data;
          var obj = this.controlId;
          sessionStorage.setItem("controlCenterId", JSON.stringify(obj));

        })
          .catch(function (error) {
            console.log(error);
          })
      },
      getNodeIfm: function () {
        let that = this;
        getNodeInformation().then(res => {
          console.log("控制中心1成功");
          console.log('res', res);
          that.getNodeIfm1();
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      getNodeIfm1() {
        getNodeInformation1().then(res => {
          console.log("控制中心2成功");
          console.log('res', res);
        })
          .catch(function (error) {
            console.log(error);
          })
      }
    }
  }

</script>

<style scoped>
  .head {
    background-color: gainsboro;
    width: 60%;
    height: 380px;
    min-width: 1000px;
    flex-wrap: wrap;
  }

  .testinformation {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-wrap: wrap;
  }

  .title {
    font-size: 50px;
    color: black;
    margin-left: 40px;
    margin-top: 20px;
  }

  .maintext {
    font-size: 20px;
    color: black;
    text-indent: 2em;
    font-family: "微软雅黑";
    margin-left: 30px;
    margin-right: 30px;
  }

  .testName {
    font-size: 16px;
    color: black;
    font-weight: bold;
    float: left;
    margin-top: 30px;
    margin-left: 30px;
  }
</style>

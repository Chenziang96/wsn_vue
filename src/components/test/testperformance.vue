<template>
  <div class="performancetest">
    <div class="title">
      <div class="sub_title">
        <Icon class="icon" type="ios-apps"/>
        {{testKind}}
      </div>
      <transition name="fade">
        <div class="header4">
          <div :class="{inner4:color41,inner4_click:color42}" @click="click4">网络时延测试</div>
        </div>
      </transition>
      <transition name="fade">
        <div class="header5">
          <div :class="{inner5:color51,inner5_click:color52}" @click="click5">网络平均路径长度</div>
        </div>
      </transition>
      <transition name="fade">
        <div class="header">
          <div :class="{inner:color11,inner_click:color12}" @click="click1">丢包率测试</div>
        </div>
      </transition>
      <transition name="fade">
        <div class="header1">
          <div :class="{inner1:color21,inner1_click:color22}" @click="click2">网络吞吐量测试</div>
        </div>
      </transition>
      <transition name="fade">
        <div class="header3">
          <div :class="{inner3:color31,inner3_click:color32}" @click="click3">网络联通度测试</div>
        </div>
      </transition>

    </div>
    <div class="setting">
      <Input search placeholder="请输入待搜索节点" style="width: 300px"/>
      <Button type="primary" class="Button_set" @click="buttonSet">请设置参数</Button>
    </div>
    <Modal v-model="modal1" title="测试参数设置" :mask-closable="false" :closable="false">
      <div style="font-size:14px;font-weight:bold">请选择控制中心号：</div>
      <Select v-model="testData.controlCenterNum" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div style="font-size:14px;font-weight:bold;margin-top: 5px">请选中要进行的测试：</div>
      <div class="checkbox" style="margin-top: 5px">
        <Checkbox v-model="testData.timeDelayTest" style="font-size: 14px">网络时延测试</Checkbox>
        <Checkbox v-model="testData.pathLengthTest" style="font-size: 14px">网络平均路径长度</Checkbox>
        <Checkbox v-model="testData.packetLossTest" style="font-size: 14px">丢包率测试</Checkbox>
        <Checkbox v-model="testData.throughPutTest" style="font-size: 14px">网络吞吐量测试</Checkbox>
        <Checkbox v-model="testData.connectivityDegreeTest" style="font-size: 14px">网络联通度测试</Checkbox>
      </div>
      <div style="font-size:14px;font-weight: bold">请设置参数：</div>
      <div class="input">
        <Form ref="testData" :model="testData" :rules="ruleValidate" label-position="left" :label-width="150">
          <FormItem label="周期数:" style="font-size: 14px" prop="cycleNumber">
            <Input v-model="testData.cycleNumber" style="width: 250px"/>
          </FormItem>
          <FormItem label="周期长度:" style="font-size: 14px" prop="cycleLength">
            <Input v-model="testData.cycleLength" style="width: 250px"/>
          </FormItem>
          <FormItem label="周期间隔:" style="font-size: 14px" prop="cycleInterval">
            <Input v-model="testData.cycleInterval" style="width: 250px"/>
          </FormItem>
          <FormItem label="测试包长度(字节):" style="font-size: 14px" prop="packetLength">
            <Input v-model="testData.packetLength" style="width: 250px"/>
          </FormItem>
          <FormItem label="测试包发送间隔（秒）:" style="font-size: 14px" prop="packetInterval">
            <Input v-model="testData.packetInterval" style="width: 250px"/>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button size="large" @click="handleReset('testData')" :disabled="buttonDisable">取消提交</Button>
        <Button type="primary" size="large" @click="handleSubmit('testData')" :loading="buttonLoading">确定提交</Button>
      </div>
    </Modal>
    <router-view v-if="isRouterAlive"></router-view>
  </div>

</template>

<script>
  import {sendTestData} from "../../request/api";
  import {getEndFlag} from "../../request/api";
  import {startNewCycle} from "../../request/api";
  import {getTestData} from "../../request/api";

  export default {
    name: "performancetest",
    data() {
      return {
        loading: true,
        controlCenterId:'',
        cityList: [
          {
            value: '1',
            label: '控制中心1'
          },
          {
            value: '2',
            label: '控制中心2'
          }
        ],
        ruleValidate: {
          cycleNumber: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          cycleLength: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          cycleInterval: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          packetLength: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          packetInterval: [{required: true, message: '内容不能为空', trigger: 'blur'}],
        },
        testData: {
          cycleLength: "",   //周期长度
          cycleNumber: "",   //周期数
          cycleInterval: "", //周期间隔（秒）
          packetLength: "",  //测试包长度（字节）
          packetInterval: "",//测试包发送间隔（秒）
          packetLossTest: false,//是否参与丢包率测试
          pathLengthTest: false,//是否参与平均路径长度测试
          throughPutTest: false,//是否参与吞吐量测试
          timeDelayTest: false,//是否参与网络时延测试
          connectivityDegreeTest: false,//是否参与联通度测试
          controlCenterNum:'',//控制中心号
        },
        color11: true,
        color12: false,
        color21: true,
        color22: false,
        color31: true,
        color32: false,
        color41: true,
        color42: false,
        color51: true,
        color52: false,
        testKind: "节点信息",
        modal1: false,
        buttonLoading: false,
        buttonDisable: false,
        isRouterAlive:true,
        items:'',
      }
    },
    methods: {
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      },
      mapItem(){
        let that = this;
        console.log('11231',this.items);
        for(var i=10;i<17;i++){
          that.items[i].active=true;
        }
        console.log(this.items);
        sessionStorage.setItem('systemTopology',JSON.stringify(this.items));
        this.reload();
      },
      uploads() {
        sessionStorage.setItem("controlCenterId", JSON.stringify(this.testData.controlCenterNum));
        this.buttonLoading = true;
        this.buttonDisable = true;
        let postData = this.testData;
        sendTestData(postData).then(rs => {
          console.log('11');
          this.$Message.success('提交成功,请等待测试结束');
          this.startNew();
        }).catch(err => {
          console.log(err);
          console.log('发送错误');
          this.$Message.error('发送失败,请稍后再试');
          this.buttonLoading = false;
          this.buttonDisable = false;
        })
      },
      startNew() {
        startNewCycle(this.testData.controlCenterNum).then(rs => {
          console.log('开始新测试');
          this.getFlag();
        }).catch(err => {
          console.log(err);
        })
      },
      getFlag() {
        let that = this;
        let flag = 0;
        this.interval = setInterval(function () {
          getEndFlag().then((res) => {
            console.log(res);
            flag = res.data;
          })
            .catch(function (error) {
              console.log(error);
              clearInterval(that.interval);
              that.buttonLoading = false;
              that.buttonDisable = false;
              that.$Message.error('烧录失败');
            })
          if (flag == 3+that.testData.controlCenterNum) {
            console.log(flag);
            that.mapItem();
            clearInterval(that.interval);
            that.buttonLoading = false;
            that.buttonDisable = false;
            that.modal1 = false;
            that.$Message.success('测试结束');
            that.getTestingData();
          }
        }, 2000);
      },
      getTestingData() {

        getTestData(this.testData.controlCenterNum).then((res) => {
          console.log(res);
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log(this.testData);
            this.uploads();
          } else {
            this.$Message.error('请将表格填写完整！');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.modal1 = false;
      },
      buttonSet: function () {
        this.modal1 = true;
      },
      click1: function () {
        this.color11 = !this.color11;
        this.color12 = !this.color12;
        this.color21 = true;
        this.color22 = false;
        this.color31 = true;
        this.color32 = false;
        this.color41 = true;
        this.color42 = false;
        this.color51 = true;
        this.color52 = false;
        if (this.color12 == true) {
          this.$router.replace("/networklossrate");
          this.testKind = "丢包率测试";
        } else {
          this.$router.replace("/testtopology");
          this.testKind = "节点信息";
        }
      },
      click2: function () {
        this.color21 = !this.color21;
        this.color22 = !this.color22;
        this.color11 = true;
        this.color12 = false;
        this.color31 = true;
        this.color32 = false;
        this.color41 = true;
        this.color42 = false;
        this.color51 = true;
        this.color52 = false;
        if (this.color22 == true) {
          this.$router.replace("/networkthroughput");
          this.testKind = "网络吞吐量测试";
        } else {
          this.$router.replace("/testtopology");
          this.testKind = "节点信息";
        }
      },
      click3: function () {
        this.color31 = !this.color31;
        this.color32 = !this.color32;
        this.color11 = true;
        this.color12 = false;
        this.color21 = true;
        this.color22 = false;
        this.color41 = true;
        this.color42 = false;
        this.color51 = true;
        this.color52 = false;
        if (this.color32 == true) {
          this.$router.replace("/networkconnectivity");
          this.testKind = "网络联通度测试";
        } else {
          this.$router.replace("/testtopology");
          this.testKind = "节点信息";
        }
      },
      click4: function () {
        this.color41 = !this.color41;
        this.color42 = !this.color42;
        this.color21 = true;
        this.color22 = false;
        this.color31 = true;
        this.color32 = false;
        this.color11 = true;
        this.color12 = false;
        this.color51 = true;
        this.color52 = false;
        if (this.color42 == true) {
          this.$router.replace("/networkdelay");
          this.testKind = "网络时延测试";
        } else {
          this.$router.replace("/testtopology");
          this.testKind = "节点信息";
        }
      },
      click5: function () {
        this.color51 = !this.color51;
        this.color52 = !this.color52;
        this.color21 = true;
        this.color22 = false;
        this.color31 = true;
        this.color32 = false;
        this.color41 = true;
        this.color42 = false;
        this.color11 = true;
        this.color12 = false;
        if (this.color52 == true) {
          this.$router.replace("/networklength");
          this.testKind = "网络平均路径长度";
        } else {
          this.$router.replace("/testtopology");
          this.testKind = "节点信息";
        }
      },
    },
    mounted: function () {
      this.items = JSON.parse(sessionStorage.getItem('systemTopology'));
      this.$router.replace("/testtopology");

    }
  }
</script>

<style scoped>
  .checkbox {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 7px;
  }

  .performancetest {
    margin: 20px auto;
    bottom: 20px;
    width: 1000px;
    min-height: 670px;
  }

  .title {
    width: 1000px;
    height: 130px;
    border-bottom: 1px solid #ddd;
  }

  .sub_title {
    font-size: 20px;
    color: black;
  }

  .setting {
    width: 1000px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
  }

  .icon {
    margin-bottom: 5px;
  }

  .header, .header1, .header3, .header4, .header5 {
    margin-top: 6px;
    width: 132px;
    height: 80px;
    border-radius: 10px;
    transition-duration: 0.4s;
    cursor: pointer;
    float: left;
  }

  .header {
    background: url("../../../build/netready_bg.png") no-repeat;
    background-size: 100%;
    margin-left: 10px;
  }

  .header1 {
    background: url("../../../build/net_bg.png") no-repeat;
    margin-left: 10px;
    background-size: 100%;
  }

  .header3 {
    background: url("../../../build/shell_bg.png") no-repeat;
    margin-left: 10px;
    background-size: 100%;
  }

  .header4 {
    background: url("../../../build/system_design_bg.png") no-repeat;
    background-size: 100%;
  }

  .header5 {
    background: url("../../../build/shell_bg.png") no-repeat;
    margin-left: 10px;
    background-size: 100%;
  }

  .header:hover, .header1:hover, .header3:hover, .header4:hover, .header5:hover {
    box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.25);
  }

  .inner, .inner1, .inner3, .inner4, .inner5 {
    width: 132px;
    height: 80px;
    opacity: 0.75;
    border-radius: 10px;
    font-size: 16px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inner {
    background: linear-gradient(#f7da56, #fda117);
  }

  .inner1 {
    background: linear-gradient(#66FFFF, blue);
  }

  .inner3 {
    background: linear-gradient(#78d580, #339900);
  }

  .inner4 {
    background: linear-gradient(#d58fca, #8566cd);
  }

  .inner5 {
    background: linear-gradient(#ff795c, #ff5778);
  }

  .inner_click, .inner1_click, .inner3_click, .inner4_click, .inner5_click {
    width: 132px;
    height: 80px;
    opacity: 0.7;
    border-radius: 10px;
    font-size: 16px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .inner_click {
    background: linear-gradient(#fda117, #f7da56);
  }

  .inner1_click {
    background: linear-gradient(blue, #66FFFF);
  }

  .inner3_click {
    background: linear-gradient(#339900, #78d580);
  }

  .inner4_click {
    background: linear-gradient(#8566cd, #d58fca);
  }

  .inner5_click {
    background: linear-gradient(#ff5778, #ff795c);
  }


</style>

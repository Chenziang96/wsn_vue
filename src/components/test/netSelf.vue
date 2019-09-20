<template>
  <div class="netSelf">
    <div class="body">
      <div class="leftpane">
        <div class="left_body">
          <div class="header">组网准备</div>
          <div class="titleLeft" style="margin-top: 5px">控制中心</div>
          <Select v-model="controlCenterId" style="width:480px;margin-top: 10px" class="selectLeft" placeholder="请选择控制中心号">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <br><br>

          <div>
            <input type="file" id="myFile" @change="uploads" class="input">
            <label for="myFile" class="label">
              <div class="inputInner">
                <Icon class="icon" type="md-cloud-circle" style="margin-top: 3px"/>
                Upload Files
              </div>
            </label>
            <div class="fileInfo">
              <ul class="files">
                <li v-for="item in files">
                  <div style="height: 25px">
                    <div style="float: left;height: 22px">{{ item.name }}</div>
                    <Spin style="display: flex" v-if="showOf"></Spin>
                    <Icon v-if="showIf" type="ios-checkmark" style="color:#5cb85c;margin-left: 1px" size="22"/>
                    <Icon v-if="showFalse" type="ios-close" style="color:red;margin-left: 1px" size="22"/>
                  </div>
                  <div></div>
                </li>
              </ul>
            </div>
          </div>
          <div class="Button" style="margin-top: 5px;">
            <Button type="primary" @click="downloadingProtocol">协议下载</Button>
            <Button type="primary" @click="burningProtocol">协议烧录</Button>
            <Button type="primary" @click="getNetwork">节点复位</Button>
            <Button type="error">拓扑图</Button>
          </div>
          <div class="left_table">
            <Button type="success" class="Button1" @click="getList">刷新</Button>
            <br><br>
            <div style="height: 482px;margin-top: 10px">
              <Table
                :data="historyData"
                :columns="tableColumns1"
                stripe size="small"
                :loading="loading1"
                :no-data-text="noDataText"
                border></Table>
            </div>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changePage"
                      style="max-width:550px"></Page>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rightpane">
        <div class="left_body">
          <div class="header">网络拓补信息</div>
          <div class="left_table">
            <Button type="success" class="Button2" @click="getList1">刷新</Button>
            <br><br>
            <div style="height: 680px;">
              <Table
                :data="historyData1"
                :columns="tableColumns2"
                stripe size="small"
                :loading="loading2"
                :no-data-text="noDataText"
                border></Table>
            </div>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="dataCount1" :page-size="pageSize1" show-total class="paging"
                      @on-change="changePage1"></Page>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="font-size: large;margin-left: 95px">当前系统状态：</div>
      <router-view></router-view>
    </div>


  </div>
</template>

<script>
  import {getThroughPutData} from "../../request/api";
  import {sendProtocol} from "../../request/api";
  import {downloadProtocol} from "../../request/api";
  import {burnProtocol} from "../../request/api";
  import {getEndFlag} from "../../request/api";
  import {getNetwork} from "../../request/api";

  export default {
    name: "netSelf",
    data() {
      return {
        controlCenterId:'',
        files: [{name: '未选择文件'}],
        cityList: [
          {
            value: '1',
            label: '控制中心1'
          },
          {
            value: '2',
            label: '控制中心2',
          }
        ],
        loading1: true,
        loading2: true,
        noDataText: '加载数据失败',
        fileCount:1,
        showIf: false,
        showOf: false,
        showFalse: false,
        tableData2: [],
        tableData1: [],
        tableColumns1: [
          {
            title: '序号',
            key: 'id',
            render: (h, params) => {
              return h('div', {}, (this.pageIndex1 - 1) * this.pageSize + params.index + 1)
            }
          },
          {
            title: '节点id',
            key: 'nodeId'
          },
          {
            title: '是否下载协议',
            key: 'downloadIf',
            render: (h, params) => {
              return h('div', {}, '是')
            }
          },
          {
            title: '是否烧录协议',
            key: 'writeIf',
            render: (h, params) => {
              return h('div', {}, '是')
            }
          }],
        tableColumns2: [
          {
            title: '序号',
            key: 'id',
            render: (h, params) => {
              return h('div', {}, params.index + (this.pageIndex2 - 1) * this.pageSize1 + 1)
            }
          },
          {
            title: '节点id',
            key: 'nodeId',
          },
          {
            title: '父节点id',
            key: 'parentId'
          },
          {
            title: '节点类型',
            key: 'nodeType',
            width: 150
          }],
        ajaxHistoryData: [],
        ajaxHistoryData1: [],
        dataCount: 0,
        dataCount1: 0,
        pageSize: 11,
        pageSize1: 16,
        historyData: [],
        historyData1: [],
        pageIndex1: 1,
        pageIndex2: 1,
        interval: {},
        stop: '',
        fileFlag:0,
        testId1:'',
      }
    },
    methods: {
      burningProtocol() {
        let that = this;
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'ios-loading',
                  size: 60
                },
                style: {
                  animation: 'ani-demo-spin 1s linear infinite'
                }
              }),
              h('div', {style: {fontSize: '16px'}}, '正在烧录')
            ])
          }
        });
        console.log(this.controlCenterId);
        burnProtocol(this.controlCenterId).then((res) => {
          console.log("烧录协议成功");
          console.log(res);
          this.getPacketLoss();
        })
          .catch(function (error) {
            console.log(error);
            that.$Spin.hide();
            that.$Message.error('连接失败');
          })
      },
      downloadingProtocol() {
        let that = this;
        console.log('控制中心号',this.controlCenterId);
        this.$Spin.show({
          render: (h) => {

            return h('div', [
              h('Icon', {
                props: {
                  type: 'ios-loading',
                  size: 60
                },
                style: {
                  animation: 'ani-demo-spin 1s linear infinite'
                }
              }),
              h('div', {style: {fontSize: '16px'}}, '正在下载')
            ])
          }
        });
        downloadProtocol(this.controlCenterId).then((res) => {
          console.log("协议下载");
          console.log(res);
          this.getPacketLoss1();
        })
          .catch(function (error) {
            console.log(error);
            that.$Spin.hide();
            that.$Message.error('连接失败');
          })
      },
      getPacketLoss1() {
        console.log('正在请求信息');
        let that = this;
        let flag = 0;
        this.interval = setInterval(function () {
          getEndFlag().then((res) => {
            console.log(res);
            flag = res.data;
          })
            .catch(function (error) {
              console.log(error);
              that.$Spin.hide();
              that.$Message.error('连接错误');
              clearInterval(that.interval);
            })
          if(flag == 1+that.controlCenterId) {
            console.log(flag);
            clearInterval(that.interval);
            that.$Spin.hide();
            that.$Message.success('下载成功');
          }
        }, 2000);
      },
      getNetwork(){
        getNetwork(this.controlCenterId).then((res) => {
          console.log(res);
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      getPacketLoss() {
        console.log('正在请求信息');
        let that = this;
        let flag = 0;
        this.interval = setInterval(function () {
          getEndFlag().then((res) => {
            console.log(res);
            flag = res.data;
          })
            .catch(function (error) {
              console.log(error);
              that.$Spin.hide();
              clearInterval(that.interval);
              that.$Message.error('连接错误');
            })
          if (flag == 2+that.controlCenterId) {
            console.log(flag);
            clearInterval(that.interval);
            that.$Spin.hide();
            that.$Message.success('烧录成功');
            that.getNetwork();
          }
        }, 2000);
      },
      handleListApproveHistory() {
        this.ajaxHistoryData = this.tableData1;
        this.dataCount = this.tableData1.length;
        if (this.tableData1.length < this.pageSize) {
          this.historyData = this.ajaxHistoryData;
        } else {
          this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
        }
      },
      handleListApproveHistory1() {
        this.ajaxHistoryData1 = this.tableData2;
        this.dataCount1 = this.tableData2.length;
        if (this.tableData2.length < this.pageSize1) {
          this.historyData1 = this.ajaxHistoryData1;
        } else {
          this.historyData1 = this.ajaxHistoryData1.slice(0, this.pageSize1)
        }
      },
      changePage(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start, _end);
      },
      changePage1(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize1;
        var _end = index * this.pageSize1;
        this.historyData1 = this.ajaxHistoryData1.slice(_start, _end);
      },
      uploads(e) {
        // this.showIf[this.fileFlag]=false
        this.fileCount+=1;
        this.showIf = false;
        this.showOf = true;
        console.log(this.fileCount);
        console.log(this.showOf);
        console.log(this.showIf);
        let tFiles = e.target.files[0];
        let item = {
          name: tFiles.name
        };
        this.files[this.fileFlag] = item;

        console.log(this.files.name);
        const file = e.target.files[0];//获取到当前文件对象
        console.log(file.name);
        let formData = new FormData();
        formData.append('nodeKind', this.model1);
        console.log(this.model1);
        formData.append('file', file); // 'file' 可变 相当于 input 表单的name 属性
        // 服务器只需按照正常的上传程序代码即可
        let that = this;
        let config = {
          //添加请求头
          headers: {"Content-Type": "multipart/form-data"},
        };
        sendProtocol(formData, config).then((res) => {
          console.log('11');
          that.showOf= false;
          that.showIf = true;
        }).catch(function (error) {
          console.log(error.res.status);
          console.log(this.model1);
          console.log('1');
          that.showOf = false;
          that.showFalse = true;
        })
        this.fileFlag = this.fileFlag+1;

      },
      getList() {
        let that = this;
        getThroughPutData(this.testId1,this.controlCenterId).then((res) => {
          console.log("获取组网信息成功");
          console.log(res);
          this.tableData1 = res.data;
          var obj = this.tableData1;
          sessionStorage.setItem("netSelfData", JSON.stringify(obj));
          this.handleListApproveHistory();
          this.loading1 = false;
        })
          .catch(function (error) {
            console.log(error);
            that.loading1 = false;
          })
      },
      getList1() {
        let that = this;
        getThroughPutData(this.testId1,this.controlCenterId).then((res) => {
          console.log("获取网络拓扑信息成功");
          console.log(res);
          this.tableData2 = res.data;
          var obj = this.tableData2;
          sessionStorage.setItem("nodeNetData", JSON.stringify(obj));
          this.handleListApproveHistory1();
          this.loading2 = false;
        })
          .catch(function (error) {
            console.log(error);
            that.loading2 = false;
          })
      },
    },
    created() {
      this.$router.push('/nettopology')
      var read = JSON.parse(sessionStorage.getItem("netSelfData"));
      this.testId1 = JSON.parse(sessionStorage.getItem("testId"));
      this.tableData1 = read;
      if (read) {
        this.loading1 = false;
        console.log('读取本地文件');
      } else {
        this.getList();
      }
      if (this.tableData1) {
        this.handleListApproveHistory();
      }
      var read = JSON.parse(sessionStorage.getItem("nodeNetData"));
      this.tableData2 = read;
      this.tableData2 = read;
      if (read) {
        this.loading2 = false;
        console.log('读取本地文件');
      } else {
        this.getList1();
      }
      if (this.tableData2) {
        this.handleListApproveHistory1();
      }
    }
  }
</script>

<style scoped>
  .body {
    margin: 10px auto;
    width: 1200px;
    min-height: 870px;
    border: 0.2em solid gray;
    border-radius: 5px;
  }

  .leftpane {
    float: left;
    width: 50%;
    min-height: 830px;
  }

  .rightpane {
    float: right;
    width: 50%;
    min-height: 830px;
  }

  .left_body {
    margin-left: 100px;
    margin-top: 10px;
    margin-right: 5px;
  }

  .header {
    font-size: 22px;
  }

  .titleLeft {
    font-size: 15px;
    font-weight: bold;
  }

  .Button {
    margin-top: 11px;
  }

  .Button1 {
    float: right;
    margin-right: 2px;
    margin-top: 10px;
  }

  .Button2 {
    float: right;
    margin-right: 2px;
  }

  .left_table {
    margin-top: 13px;
    margin-right: 15px;
  }

  .input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  /*E + F 毗邻元素选择器，匹配所有紧随E元素之后的同级元素F*/

  .input + label {
    color: #3e97df;
    display: inline-block;
  }

  .label {
    width: 114px;
    height: 31px;
    border: 1px solid #dcdee2;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
    transition-duration: 0.4s;
  }

  .inputInner {
    font-size: 12px;
    color: #515a6e;
    padding: 5px 15px 6px;
    transition-duration: 0.4s;
    display: flex;

  }

  .icon {
    padding-right: 3px;
  }

  .inputInner:hover {
    font-size: 12px;
    color: #3e76f7;
    padding: 5px 15px 6px;
    transition-duration: 0.4s;
  }

  .label:hover {
    width: 114px;
    height: 31px;
    border: 1px solid #3e76f7;
    opacity: 50%;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
    transition-duration: 0.4s;
  }

  li {
    list-style: none;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

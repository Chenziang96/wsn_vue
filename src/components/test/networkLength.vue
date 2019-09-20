<template>
  <div class="networkLength">
    <div class="result">
      <div class="result_title">测试结果列表</div>
      <Button type="primary" class="Button1" @click="getList">刷新</Button>
      <br><br>
      <div style="height: 480px">
        <Table
          border
          :data="historyData"
          :columns="tableColumns1"
          stripe size="small"
          :loading="loading"
          :no-data-text="noDataText"></Table>
      </div>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getNetworkLengthData} from "../../request/api";

  export default {
    name: "packetTest",
    data(){
      return{
        tableColumns1: [
          {
            title: '控制中心号',
            key: 'controlCenterNum',
            width:115,
            filters: [
              {
                label: '控制中心1',
                value: 1
              },
              {
                label: '控制中心2',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.controlCenterNum === '1';
              } else if (value === 2) {
                return row.controlCenterNum === '2';
              }
            }
          },
          {
            title: '测试次数',
            key: 'testNum'
          },
          {
            title: '测试ID',
            key: 'testId',
            width:320
          },
          {
            title: '周期数',
            key: 'cycleNum',
            width:80
          },
          {
            title: '节点ID',
            key: 'nodeId',
            width:80
          },
          {
            title: '节点类型',
            key: 'nodeType',
            width:150
          },
          {
            title:'路径长度',
            key: 'pathLength',
          }],
        networkLengthData: [],
        ajaxHistoryData: [],
        dataCount: 0,
        pageSize: 11,
        historyData: [],
        number:0,
        loading: true,
        noDataText:'加载失败',
        testId1:'',
        controlCenterId:'',
      }
    },
    methods: {
      handleListApproveHistory() {
        this.ajaxHistoryData = this.networkLengthData;
        this.dataCount = this.networkLengthData.length;
        if (this.networkLengthData.length < this.pageSize) {
          this.historyData = this.ajaxHistoryData;
        } else {
          this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
        }
      },
      changePage(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start, _end);
        this.number = _start;
      },
      getList() {
        let that = this;
        getNetworkLengthData(this.testId1,this.controlCenterId).then((res) => {
            console.log("获取测试信息成功");
            console.log(res);
            this.networkLengthData = res.data;
            var obj = this.networkLengthData;
            sessionStorage.setItem("networkLengthData", JSON.stringify(obj));
            this.handleListApproveHistory();
            this.loading = false;
          })
          .catch(function (error) {
            console.log(error);
            that.loading = false;
          })
      }
    },
    created() {
      this.testId1 = JSON.parse(sessionStorage.getItem("testId"));
      this.controlCenterId = JSON.parse(sessionStorage.getItem("controlCenterId"));
      var read = JSON.parse(sessionStorage.getItem("networkLengthData"));
      this.networkLengthData = read;
      if (read) {
        this.loading = false;
        console.log('读取本地文件');
      } else {
        this.getList();
      }
      console.log(this.networkLengthData);
      if (this.networkLengthData) {
        this.handleListApproveHistory();
      }
    }
  }
</script>

<style scoped>
  .setting {
    width: 1000px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
  }

  .result_title {
    font-size: 19px;
    width: 100%;
    margin-top: 10px;
  }

  .Button1{
    float: right;
  }
</style>

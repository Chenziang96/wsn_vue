<template>
  <div class="networkLossRate">
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
  import {getNetworkLossRateData} from "../../request/api";

  export default {
    name: "packetTest",
    data() {
      return {
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
            title: '测试包发送速率(字节/秒)',
            key: 'sendSpeed',
            width: 160
          },
          {
            title: '周期数',
            key: 'cycleNum',
            width: 80
          },
          {
            title: '节点ID',
            key: 'nodeId',
            width: 80
          },
          {
            title: '节点类型',
            key: 'nodeType',
            width: 150
          },
          {
            title: '父节点ID',
            key: 'parentId',
            width: 90
          },
          {
            title: '收包数',
            key: 'receivePacket',
            width: 80
          },
          {
            title: '发包数',
            key: 'sendPacket',
            width: 80
          },
          {
            title: '节点丢包率',
            key: 'nodePacketLoss',
            width: 100
          }],
        tableData1: [],
        ajaxHistoryData: [],
        dataCount: 0,
        pageSize: 11,
        historyData: [],
        pageIndex: 1,
        loading: true,
        noDataText: '加载失败',
        testId1:'',
        controlCenterId:'',
      }
    },
    methods: {
      getList() {
        let that = this;
        getNetworkLossRateData(this.testId1,this.controlCenterId).then((res) => {
          console.log("获取测试信息成功");
          console.log(res);
          console.log('11');
          this.tableData1 = res.data;
          var obj = this.tableData1;
          sessionStorage.setItem("networkLossRateData", JSON.stringify(obj));
          this.handleListApproveHistory();
          that.loading = false;
          console.log(that.loading);
        })
          .catch(function (error) {
            console.log(error);
            that.loading = false;
          })
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
      changePage(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start, _end);
        this.pageIndex = index;
      },
    },
    created() {
      this.testId1 = JSON.parse(sessionStorage.getItem("testId"));
      this.controlCenterId = JSON.parse(sessionStorage.getItem("controlCenterId"));
      var read = JSON.parse(sessionStorage.getItem("networkLossRateData"));
      this.tableData1 = read;
      if (read) {
        this.loading = false;
        console.log('读取本地文件');
      } else {
        this.getList();
      }
      if (this.tableData1) {
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

  .Button1 {
    float: right;
  }
</style>

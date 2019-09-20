<template>
  <div class="netDelay">
    <div class="result">
      <div class="result_left">
        <div class="result_title">测试结果列表</div>
        <Button type="primary" class="Button1" @click="getList">刷新</Button>
        <br><br>
        <div style="height: 560px">
          <Table
            border
            :data="historyData"
            :columns="tableColumns1"
            stripe
            size="small"
            :loading="loading"
            :no-data-text="noDataText"></Table>
        </div>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changePage"></Page>
          </div>
        </div>
      </div>
      <div class="result_right">
        <div class="result_title">绘图区</div>
        <div class="selector">
          <div style="font-size: 15px ; margin-top: 19px">请选择横坐标</div>
          <Select v-model="model1" style="width:510px;margin-top: 6px">
            <Option v-for="item in nodelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '../../assets/eventBus'
  import {getNetworkDelay} from "../../request/api";

  export default {
    name: "networkDelay",
    data() {
      return {
        testId1:'',
        tableColumns1: [
          {
            title: '序号',
            key: 'id',
            render: (h, params) => {
              return h('div', {}, params.index + (this.pageIndex - 1) * this.pageSize + 1);
            }
          },
          {
            title: '测试次数',
            key: 'testNum'
          },
          {
            title: '节点ID',
            key: 'nodeId',
          },
          {
            title: '测试包长度',
            key: 'packetLength'
          },
          {
            title: '节点时延',
            key: 'timeDelay'
          }],
        tableData1: [],
        ajaxHistoryData: [],
        dataCount: '',
        testId1:'',
        pageSize: 13,
        pageIndex: 1,
        historyData: [],
        loading:true,
        noDataText:'加载失败',
        nodelist: [
          {
            value: 'length',
            label: '数据包长度(字节)'
          },
          {
            value: 'number',
            label: '测试次数(次)'
          }
        ],
        model1: ''
      }
    },
    mounted() {
      this.$router.replace('/netdelaydraph');
    },
    methods: {
      handleListApproveHistory() {
        this.ajaxHistoryData = this.tableData1;
        this.dataCount = this.tableData1.length;
        console.log(this.ajaxHistoryData);
        if (this.tableData1.length < this.pageSize) {
          this.historyData = this.ajaxHistoryData;
        } else {
          this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
        }
        console.log(this.historyData);
      },
      changePage(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start, _end);
        this.pageIndex = index;
      },
      getList() {
        let that = this;
        getNetworkDelay(this.testId1).then((res) => {
            console.log("获取测试信息成功");
            console.log(res);
            this.tableData1 = res.data;
            var obj = this.tableData1;
            sessionStorage.setItem("netDelayData", JSON.stringify(obj));
            this.handleListApproveHistory();
            that.loading = false;
          })
          .catch(function (error) {
            console.log(error);
            that.loading = false;
          })
      }
    },
    created() {
      this.testId1 = JSON.parse(sessionStorage.getItem("testId"));
      var read = JSON.parse(sessionStorage.getItem("netDelayData"));
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
  .result {
    width: 1000px;
    height: 500px;
    font-size: 16px;
  }

  .result_title {
    font-size: 19px;
    width: 100%;
    margin-top: 10px;
  }

  .result_left {
    margin-top: 10px;
    float: left;
    width: 50%;
    height: 500px;
    padding-right: 5px;
  }

  .result_right {
    margin-top: 10px;
    float: right;
    width: 50%;
    height: 500px;
    padding-left: 10px;
  }

  .Button1 {
    float: right;
    margin-right: 2px;
  }
</style>

<template>
  <div id="temperatureData">
    <div class="title">湿度数据查询</div>
    <div style="font-weight: bold">请选择控制中心：
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <Tabs :animated="false" @on-click="getList1">
      <TabPane label="温度数据">
        <div class="button1">
          <Button type="primary" class="Button" @click="getSensorData" :disabled="button1">开始感知</Button>
          <Button type="primary" class="Button" @click="endSense" style="margin-left: 5px" :disabled="button2">结束感知</Button>
          <Button type="primary" class="Button" @click="getList" style="margin-left: 5px" :disabled="button2">刷新数据</Button>
        </div>
        <div style="height: 670px">
          <Table
            border
            :columns="columns"
            :data="historyData"
            class="Table"
            :loading="loading"
            :no-data-text="noDataText"
          ></Table>
        </div>
        <div style="float: right;">
          <Page :total="dataCount" :page-size="pageSize" show-total="" class="paging" @on-change="changePage"></Page>
        </div>
      </TabPane>
      <TabPane label="湿度数据">
        <div class="button1">
          <Button type="primary" class="Button" @click="getSensorData" :disabled="button1">开始感知</Button>
          <Button type="primary" class="Button" @click="endSense" style="margin-left: 5px" :disabled="button2">结束感知</Button>
          <Button type="primary" class="Button" @click="getList1" style="margin-left: 5px" :disabled="button2">刷新数据</Button>
        </div>
        <div style="height: 670px">
          <Table
            border
            :columns="columns1"
            :data="historyData1"
            class="Table"
            :loading="loading1"
            :no-data-text="noDataText"
          ></Table>
        </div>
        <div style="float: right;">
          <Page :total="dataCount1" :page-size="pageSize1" show-total="" class="paging" @on-change="changePage1"></Page>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import {endSense} from '../../request/api'
  import {getSensorData} from '../../request/api'
  import {getHumidityData} from '../../request/api'
  import {getTemperatureData} from '../../request/api'

  export default {
    name: "temperatureData",
    data() {
      return {
        model1:'',
        cityList:[
          {
            label:'控制中心2',
            value:'controlCenter1'
          },
        ],
        columns: [
          {
            title: '序号',
            key: 'id',
            width: 80,
            render: (h, params) => {
              return h('div', {}, params.index + (this.pageIndex - 1) * this.pageSize + 1)
            }
          },
          {
            title: '控制中心号',
            key: 'controlCenterNum'
          },
          {
            title: '数据类型',
            key: 'dataType',

          },
          {
            title: '创建时间',
            key: 'creationTime',

          },
          {
            title: '温度(/°C)',
            key: 'temperature',

          }],
        columns1: [
          {
            title: '序号',
            key: 'id',
            width: 80,
            render: (h, params) => {
              return h('div', {}, params.index + (this.pageIndex - 1) * this.pageSize + 1)
            }
          },
          {
            title: '控制中心号',
            key: 'controlCenterNum'
          },
          {
            title: '数据类型',
            key: 'dataType',

          },
          {
            title: '创建时间',
            key: 'creationTime',

          },
          {
            title: '湿度(/%)',
            key: 'humidity',

          }],
        tableData1: [],
        tableData2: [],
        ajaxHistoryData: [],
        ajaxHistoryData1: [],
        dataCount: 0,
        dataCount1: 0,
        pageSize: 11,
        pageSize1: 11,
        historyData: [],
        historyData1: [],
        pageIndex: 1,
        pageIndex1: 1,
        loading: true,
        loading1: true,
        noDataText: '加载失败',
        testId1: '',
        controlCenterId: '',
        button1: false,
        button2: true,
        button3: false,
        button4: true,
        time: '',
        time1: '',
      }
    },
    methods: {
      getSensorData() {
        let myDate = new Date();
        let day = myDate.getDate();
        day= this.format(day,2);
        let month = myDate.getMonth();
        month += 1;
        month= this.format(month,2);
        let year = myDate.getFullYear();
        let hour = myDate.getHours();
        hour= this.format(hour,2);
        let minute = myDate.getMinutes();
        minute= this.format(minute,2);
        let second = myDate.getSeconds();
        second= this.format(second,2);
        let time = year + '-' + month + '-' + day + '\t' + hour + ':' + minute + ':' + second;
        this.time1 = time;
        sessionStorage.setItem("time1", JSON.stringify(time));
        console.log(time);
        getSensorData('2').then((res) => {
          console.log(res);
          console.log('开始感知成功');
          this.button1 = true;
          this.button2 = false;
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      format(num,n){
        let len = num.toString().length;
        while(len<n){
          num = "0"+num;
          len++
        }
        return num;
      },
      endSense() {
        endSense('2').then((res) => {
          console.log(res);
          console.log('结束感知成功');
          sessionStorage.removeItem("time1");
          this.button1 = false;
          this.button2 = true;
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      getList() {
        let that = this;
        getTemperatureData('2',this.time1,'2').then((res) => {
          console.log("获取测试信息成功");
          console.log(res);
          console.log('11');
          this.tableData1 = res.data;
          this.handleListApproveHistory();
          that.loading = false;
        })
          .catch(function (error) {
            console.log(error);
            that.loading = false;
          })
      },
      getList1() {
        let that = this;
        getHumidityData('2',this.time1,'2').then((res) => {
          console.log("获取测试信息成功");
          console.log(res);
          console.log('11');
          this.tableData2 = res.data;
          this.handleListApproveHistory1();
          that.loading1 = false;
        })
          .catch(function (error) {
            console.log(error);
            that.loading1 = false;
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
      handleListApproveHistory1() {
        this.ajaxHistoryData1 = this.tableData2;
        this.dataCount1 = this.tableData2.length;
        if (this.tableData2.length < this.pageSize) {
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
        this.pageIndex = index;
      },
      changePage1(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData1 = this.ajaxHistoryData1.slice(_start, _end);
        this.pageIndex1 = index;
      },
    },
    mounted() {
      this.testId1 = JSON.parse(sessionStorage.getItem("testId"));
      this.time1 = JSON.parse(sessionStorage.getItem("time1"));
      if (this.time1) {
        this.button1 = true;
        this.button2 = false;
        console.log('有时间',this.button1);
      } else {
        this.button1 = false;
        this.button2 = true;
      }
      this.controlCenterId = JSON.parse(sessionStorage.getItem("controlCenterId"));
      var read = JSON.parse(sessionStorage.getItem("networkLossRateData"));
      this.tableData1 = read;
      this.getList();
      this.getList1();
      this.handleListApproveHistory();
      this.handleListApproveHistory1();
    }
  }
</script>

<style scoped>
  .button1 {
    height: 35px;
    font-size: 15px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .title {
    font-size: 25px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    height: 50px;
    border-bottom: 1px solid #ddd;
  }
</style>

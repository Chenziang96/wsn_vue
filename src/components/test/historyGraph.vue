<template>
  <div>
    <Button type="primary" style="float: right;" @click="refresh">刷新</Button>
    <Tabs :animated="false">
      <TabPane label="时延测试折线图">
        <div id="netDelayGraph"></div>
      </TabPane>
      <TabPane label="丢包率测试折线图">
        <div id="lossRateGraph"></div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import {getDelayGraph} from "../../request/api";
  import {getTestList} from "../../request/api";
  import {getLossGraph} from "../../request/api";

  export default {
    name: "historyGraph",
    data() {
      return {
        numbers: [],
        userName:'',
        testId1: '',
        testList: [],
        lossRateId: [],
        timeDelayData: [],
        lossRateData: '',
        test: [[1, 2, 3], [2, 3, 4]],
      }
    },
    mounted() {

      console.log('testid',this.testId1);
      this.userName = localStorage.getItem('isLogin')
      this.getTestList();
    },
    methods: {
      refresh(){
        this.getDelay();
        this.getLoss()
      },
      getDelay: function () { //接收节点类型信息
        getDelayGraph(this.lossRateId).then((response) => {
          console.log("获取节点类型成功");
          console.log('timeDelay', response);
          this.timeDelayData = response;
          this.drawLine();
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      getLoss: function () { //接收节点类型信息
        getLossGraph(this.lossRateId).then((response) => {
          console.log("获取节点类型成功");
          console.log('lossRate', response);
          this.lossRateData = response;
          this.drawLine1();
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      getTestList: function () { //接收testID，testName
        getTestList(this.userName).then((response) => {
          console.log("获取测试列表成功");
          this.testList = response.data;
          console.log('testList', this.testList);
          this.saveId();
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      saveId() {
        for (let i = 0; i < this.testList.length; i++) {
          this.lossRateId[i] = this.testList[i].testId;
        }
        console.log('lossRate', this.lossRateId);
        this.getLoss();
        this.getDelay();
      },
      drawLine() {//绘制折线图
        let myChart = this.$echarts.init(document.getElementById('netDelayGraph'));
        myChart.hideLoading();
        let datas = [];
        let numbers = [];
        let j = 0;
        let lossData = this.timeDelayData;
        let names = [];
        let list = this.testList;
        //数据处理，返回的rObj为echarts所需要的series数据
        datas = lossData.map(function (obj, index) {
          let rObj = {};
          if (lossData[index].length == 0) {
            delete rObj[index];
          } else {
            rObj.name = list[index].testName;
            rObj.data = lossData[index];
            rObj.type = 'line';
            rObj.smooth = true;
            names[j] = list[index].testName;
            // names[j] = '测试' + String(j + 1);
            j += 1;
            if (lossData[index].length > numbers.length) {
              for (let k = 0; k < lossData[index].length; k++) {
                numbers[k] = k + 1;
              }
            }
            return rObj;
          }
        });
        console.log('names', names);
        let option = {
          title: { //设置标题
            text: '时延测试历史查询',
          },
          grid: { //图片左边距
            left: 49
          },
          tooltip: { //开启标签，设置参考线类型
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: { //横坐标
            name: '序号',
            type: 'category',
            data: numbers,

          },
          yAxis: { //纵坐标
            name: '丢包率(/ms)',
            type: 'value'
          },
          legend: {
            data: names,
            orient: 'horizontal',
            top: '2%',
            left: '20%',
          },
          series: datas,
        };
        myChart.setOption(option);
      },
      drawLine1() {//绘制折线图
        let myChart = this.$echarts.init(document.getElementById('lossRateGraph'));
        myChart.hideLoading();
        let datas = [];
        let numbers = [];
        let j = 0;
        let lossData = this.lossRateData;
        let names = [];
        let list = this.testList;
        datas = lossData.map(function (obj, index) {
          let rObj = {};
          if (lossData[index].length == 0) {
            delete rObj[index];
          } else {
            rObj.name = list[index].testName;
            rObj.data = lossData[index];
            rObj.type = 'line';
            rObj.smooth = true;
            names[j] = list[index].testName;
            j += 1;
            if (lossData[index].length > numbers.length) {
              for (let k = 0; k < lossData[index].length; k++) {
                numbers[k] = k + 1;
              }
            }
            return rObj;
          }
        });
        let option = {
          title: { //设置标题
            text: '丢包率历史查询',
          },
          grid: { //图片左边距
            left: 49
          },
          tooltip: { //开启标签，设置参考线类型
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: { //横坐标
            name: '序号',
            type: 'category',
            data: numbers,

          },
          yAxis: { //纵坐标
            name: '丢包率(/ms)',
            type: 'value'
          },
          legend: {
            data: names,
            orient: 'horizontal',
            top: '2%',
            left: '20%',
          },
          series: datas,
        };
        myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  #netDelayGraph {
    width: 1000px;
    height: 600px;
    margin-top: 20px;
  }

  #lossRateGraph {
    width: 1000px;
    height: 600px;
    margin-top: 20px;
  }

</style>

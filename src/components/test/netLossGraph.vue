<template>
  <div>
    <div id="netDelayGraph"></div>
  </div>
</template>

<script>
  import {getLossRateGraph} from "../../request/api";

  export default {
    name: "netLossGraph",
    data() {
      return {
        testData: [],
        delays: [],
        numbers: [],
        node: [],
      }
    },
    mounted() {
      this.testId1 = JSON.parse(sessionStorage.getItem("testId"));
      console.log('testId', this.testId1);
      this.getNode();
    },
    methods: {
      getNode: function () { //接收节点类型信息
        getLossRateGraph(this.testId1).then((response) => {
          console.log("丢包率拓扑图数据成功");
          console.log(response);
          this.node = response.data;
          var obj = this.node;
          sessionStorage.setItem("topologyNode", JSON.stringify(obj));
          this.drawLine();
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      drawLine() {//绘制折线图
        let myChart = this.$echarts.init(document.getElementById('netDelayGraph'));
        myChart.hideLoading();
        let datas = [];
        let numbers = [];
        for (let i = 0; i < this.node.length; i++) {
          //遍历JSON对象，并将值分别取出，赋给datas和numbers数组，满足echarts所需的[a,b,c,d]的数据格式
          datas[i] = this.node[i];
          numbers[i] = i+1;
        };
        console.log(datas);
        let option = {
          title: { //设置标题
            text: '网络丢包率性能对比图',
            left: '30%'
          },
          grid: { //图片左边距
            left: 39
          },
          tooltip: { //开启标签，设置参考线类型
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: { //横坐标
            name: '次数',
            type: 'category',
            data: numbers,

          },
          yAxis: { //纵坐标
            name: '系统丢包率',
            type: 'value'
          },
          series: [{
            name: '网络时延',
            data: datas,
            type: 'line',
            smooth: true,
          }]
        };
        myChart.setOption(option);
      }
    }
  }

</script>

<style scoped>
  #netDelayGraph {
    width: 540px;
    height: 540px;
    margin-top: 20px;
  }
</style>

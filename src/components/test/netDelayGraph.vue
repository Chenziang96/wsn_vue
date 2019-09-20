<template>
  <div>
    <div id="netDelayGraph"></div>
  </div>
</template>

<script>
  import {getNetworkDelayGraph} from "../../request/api";

  export default {
    name: "netDelayGraph",
    data() {
      return {
        testData:[],
        numbers:[],
        testId1:'',
      }
    },
    mounted() {
      this.testId1 = JSON.parse(sessionStorage.getItem("testId"));
      this.getNode();
    },
    methods: {
      getNode: function () { //接收节点类型信息
        getNetworkDelayGraph(this.testId1).then((response) => {
            console.log("获取节点类型成功");
            console.log(response);
            this.testData = response.data;
            this.changeData();
            this.drawLine();
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      changeData() {
        let number = this.testData.length;
        for(let i=0;i<number;i++){
          this.numbers[i] = String[i];
        }
      },
      drawLine() {//绘制折线图
        let myChart = this.$echarts.init(document.getElementById('netDelayGraph'));
        myChart.hideLoading();
        let datas =[];
        let numbers = [];
        for(let i = 0 ; i < this.testData.length ; i ++){
          // 创建一个对象，用来存每个JSON的数据
          // 最后的数据格式是
          // {name : '' , type : '', data :''}
          // 不是对象的话 ， 可能会报错了  意思是要指定 series 的type
          datas[i] = this.testData[i];
          numbers[i] = i+1;
        };
        console.log(datas);
        let option = {
          title:{ //设置标题
            text:'网络时延性能对比图',
            left:'30%'
          },
          grid:{ //图片左边距
            left:49
          },
          tooltip : { //开启标签，设置参考线类型
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: { //横坐标
            name:'序号',
            type: 'category',
            data: numbers,

          },
          yAxis: { //纵坐标
            name:'网络时延(/ms)',
            type: 'value'
          },
          series: [{
            name:'网络时延',
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

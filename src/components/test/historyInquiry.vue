<template>
  <div class="historyInquiry">
    <div class="title">历史测试数据查询</div>
    <div class="searcher">
      按测试名查询：<Input search placeholder="请输入测试名" style="width: 200px" v-model="testName" @on-search="getName"/>
    </div>
    <Tabs :animated="false" style="margin-top: 10px">
      <TabPane label="节点拓扑图">
        <div id="main"></div>
      </TabPane>
      <TabPane label="节点信息">
        <div style="height: 480px;margin-top: 20px">
          <Table
            border
            :data="historyData"
            :columns="tableColumns1"
            stripe size="small"
            :no-data-text="noDataText"></Table>
        </div>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changePage"></Page>
          </div>
        </div>
      </TabPane>
      <TabPane label="网络时延测试">
        <div style="height: 480px;margin-top: 20px">
          <Table
            border
            :data="historyData2"
            :columns="tableColumns2"
            stripe size="small"
            :no-data-text="noDataText"></Table>
        </div>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="dataCount2" :page-size="pageSize" show-total class="paging" @on-change="changePage2"></Page>
          </div>
        </div>
      </TabPane>
      <TabPane label="平均路径长度">
        <div style="height: 480px;margin-top: 20px">
          <Table
            border
            :data="historyData3"
            :columns="tableColumns3"
            stripe size="small"
            :no-data-text="noDataText"></Table>
        </div>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="dataCount3" :page-size="pageSize" show-total class="paging" @on-change="changePage3"></Page>
          </div>
        </div>
      </TabPane>
      <TabPane label="丢包率测试">
        <div style="height: 480px;margin-top: 20px">
          <Table
            border
            :data="historyData4"
            :columns="tableColumns4"
            stripe size="small"
            :no-data-text="noDataText"></Table>
        </div>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="dataCount4" :page-size="pageSize" show-total class="paging" @on-change="changePage4"></Page>
          </div>
        </div>
      </TabPane>
      <TabPane label="网络吞吐量测试">
        <div style="height: 480px;margin-top: 20px">
          <Table
            border
            :data="historyData5"
            :columns="tableColumns5"
            stripe size="small"
            :no-data-text="noDataText"></Table>
        </div>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="dataCount5" :page-size="pageSize" show-total class="paging" @on-change="changePage5"></Page>
          </div>
        </div>
      </TabPane>
      <TabPane label="网络联通度测试">
        <div style="height: 480px;margin-top: 20px">
          <Table
            border
            :data="historyData6"
            :columns="tableColumns6"
            stripe size="small"
            :no-data-text="noDataText"></Table>
        </div>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="dataCount6" :page-size="pageSize" show-total class="paging" @on-change="changePage6"></Page>
          </div>
        </div>
      </TabPane>
    </Tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getNodeList} from "../../request/api";
  import {getTestName} from "../../request/api";
  import {getPathLength} from "../../request/api";
  import {getDelayList} from "../../request/api";
  import {getPacketLossData} from "../../request/api";
  import {getThroughPut} from "../../request/api";
  import {getConnectivity} from "../../request/api";
  import {getHistoryTopology} from "../../request/api";
  import {getHistoryTopologyLink} from "../../request/api";
  import {getHistoryNode} from "../../request/api";

  export default {
    name: "historyInquiry",
    data() {
      return {
        userName:'',
        node: [],
        link: [],
        tableColumns1: [
          {
            title: '序号',
            key: 'id',
            width: 80,
            render: (h, params) => {
              return h('div', {}, params.index + this.number + 1);
            }
          },
          {
            title: '测试Id',
            key: 'testId',
            width:280
          },
          {
            title: '节点ip',
            key: 'ip'
          },
          {
            title: '父节点id',
            key: 'parentId',
          },
          {
            title: '节点类型',
            key: 'nodeType',
            width: 150,
          },
          {
            title: '是否在线',
            key: 'onLine',
            width: 90
          },
          {
            title: '是否烧录协议',
            key: 'burner'
          },
          {
            title: '是否参与组网',
            key: 'joinNetwork',
          }],
        tableColumns2: [
          {
            title: '序号',
            key: 'id',
            render: (h, params) => {
              return h('div', {},params.index + this.number + 1);
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
        tableColumns3: [
          {
            title: '序号',
            key: 'id',
            width:80,
            render: (h, params) => {
              return h('div',{},params.index+this.number+1);
            }
          },
          {
            title: '测试次数',
            key: 'testNum'
          },
          {
            title: '测试ID',
            key: 'testId',
            width:250
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
        tableColumns4: [
          {
            title: '序号',
            key: 'id',
            render: (h, params) => {
              return h('div', {}, params.index+this.number+1);
            }
          },
          {
            title: '测试次数',
            key: 'testNum'
          },
          {
            title: '测试包发送速率(字节/秒)',
            key: 'sendSpeed',
            width: 170
          },
          {
            title: '节点ID',
            key: 'nodeId',
            width: 80
          },
          {
            title: '节点丢包率',
            key: 'nodePacketLoss',
            width: 100
          }],
        tableColumns5: [
          {
            title: '序号',
            key: 'id',
            width: 60,
            render: (h, params) => {
              return h('div', {}, params.index+this.number+1)
            }
          },
          {
            title: '测试次数',
            key: 'testNum',
            width: 85
          },
          {
            title: '周期数',
            key: 'cycleNum',
            width: 75
          },
          {
            title: '节点ID',
            key: 'nodeId',
            width: 75
          },
          {
            title: '节点类型',
            key: 'nodeType',
            width: 130
          },
          {
            title: '父节点ID',
            key: 'parentId',
            width: 85
          },
          {
            title: '发包数',
            key: 'sendPacket',
            width: 80
          },
          {
            title: '实际收包数',
            key: 'recievePacketFact',
            width: 100
          },
          {
            title: '理论收包数',
            key: 'recievePacketTheory',
            width: 100
          },
          {
            title: '吞吐量(字节)',
            key: 'throughPut',
            width: 110
          },
          {
            title: '吞吐量结果有效性',
            key: 'effectiveness',
            render: (h, params) => {
              return h('div', {}, '有效')
            }
          },],
        tableColumns6: [
          {
            title: '序号',
            key: 'id',
            width: 80,
            render: (h,params) =>{
              return h('div',{},params.index+this.number+1)
            }
          },
          {
            title: '测试次数',
            key: 'testNum',
            width: 200
          },
          {
            title: '参与测试节点ID',
            key: 'nodeId',
            width: 300
          },
          {
            title: '是否收到该节点信息',
            key: 'recieveFlag'
          }],
        networkLengthData: [],
        networkLengthData2: [],
        networkLengthData3: [],
        networkLengthData4: [],
        networkLengthData5: [],
        networkLengthData6: [],
        ajaxHistoryData: [],
        ajaxHistoryData2: [],
        ajaxHistoryData3: [],
        ajaxHistoryData4: [],
        ajaxHistoryData5: [],
        ajaxHistoryData6: [],
        dataCount: 0,
        dataCount2: 0,
        dataCount3: 0,
        dataCount4: 0,
        dataCount5: 0,
        dataCount6: 0,
        pageSize: 8,
        historyData: [],
        historyData2: [],
        historyData3: [],
        historyData4: [],
        historyData5: [],
        historyData6: [],
        number: 0,
        loading: true,
        noDataText: '加载失败',
        testId1: '',
        testName: '',
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
      handleListApproveHistory2() {
        this.ajaxHistoryData2 = this.networkLengthData2;
        this.dataCount2 = this.networkLengthData2.length;
        if (this.networkLengthData2.length < this.pageSize) {
          this.historyData2 = this.ajaxHistoryData2;
        } else {
          this.historyData2 = this.ajaxHistoryData2.slice(0, this.pageSize)
        }
      },
      handleListApproveHistory3() {
        this.ajaxHistoryData3 = this.networkLengthData3;
        this.dataCount3 = this.networkLengthData3.length;
        if (this.networkLengthData3.length < this.pageSize) {
          this.historyData3 = this.ajaxHistoryData3;
        } else {
          this.historyData3 = this.ajaxHistoryData3.slice(0, this.pageSize)
        }
      },
      handleListApproveHistory4() {
        this.ajaxHistoryData4 = this.networkLengthData4;
        this.dataCount4 = this.networkLengthData4.length;
        if (this.networkLengthData4.length < this.pageSize) {
          this.historyData4 = this.ajaxHistoryData4;
        } else {
          this.historyData4 = this.ajaxHistoryData4.slice(0, this.pageSize)
        }
      },
      handleListApproveHistory5() {
        this.ajaxHistoryData5 = this.networkLengthData5;
        this.dataCount5 = this.networkLengthData5.length;
        if (this.networkLengthData5.length < this.pageSize) {
          this.historyData5 = this.ajaxHistoryData5;
        } else {
          this.historyData5 = this.ajaxHistoryData5.slice(0, this.pageSize)
        }
      },
      handleListApproveHistory6() {
        this.ajaxHistoryData6 = this.networkLengthData6;
        this.dataCount6 = this.networkLengthData6.length;
        if (this.networkLengthData6.length < this.pageSize) {
          this.historyData6 = this.ajaxHistoryData6;
        } else {
          this.historyData6 = this.ajaxHistoryData6.slice(0, this.pageSize)
        }
      },
      changePage(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start, _end);
        this.number = _start;
      },
      changePage3(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData3 = this.ajaxHistoryData3.slice(_start, _end);
        this.number = _start;
      },
      changePage2(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData2 = this.ajaxHistoryData2.slice(_start, _end);
        this.number = _start;
      },
      changePage4(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData4 = this.ajaxHistoryData4.slice(_start, _end);
        this.number = _start;
      },
      changePage5(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData5 = this.ajaxHistoryData5.slice(_start, _end);
        this.number = _start;
      },
      changePage6(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData6 = this.ajaxHistoryData6.slice(_start, _end);
        this.number = _start;
      },
      getName() {
        let that = this;
        let username = this.userName;
        console.log('username',username);
        getTestName(username, this.testName).then(res => {
          console.log("成功获取测试id");
          console.log('res', res);
          this.testId1 = res.data;
          that.$store.commit('changeHistoryId',this.testId1);
          this.getlist();
        })
          .catch(function (error) {
            that.loading = false;
            console.log(error);
          })
      },
      getlist: function () {
        let that = this;
        console.log('testId', this.testId1);
        getHistoryNode(this.testId1).then(res => {
          console.log("获取节点信息成功");
          console.log('res', res);
          this.networkLengthData = res.data;
          console.log(this.networkLengthData);
          var obj = this.networkLengthData;
          sessionStorage.setItem("listdata", JSON.stringify(obj));
          this.getNode();
          this.handleListApproveHistory();
          this.loading = false;
          this.getPathLength();
          this.getDelay();
          this.getPacketLossData();
          this.getThroughPut();
          this.getConnectivity();

        })
          .catch(function (error) {
            that.loading = false;
            console.log(error);
          })
      },
      getDelay: function () {
        let that = this;
        console.log('testId', this.testId1);
        getDelayList(this.testId1).then(res => {
          console.log("获取时延测试成功");
          console.log('res', res);
          this.networkLengthData2 = res.data;
          console.log(this.networkLengthData2);
          this.handleListApproveHistory2();
          this.loading = false;
        })
          .catch(function (error) {
            that.loading = false;
            console.log(error);
          })
      },
      getPathLength: function () {
        let that = this;
        console.log('testId', this.testId1);
        getPathLength(this.testId1).then(res => {
          console.log("获取节点信息成功");
          console.log('res', res);
          this.networkLengthData3 = res.data;
          console.log(this.networkLengthData3);
          this.handleListApproveHistory3();
          this.loading = false;
        })
          .catch(function (error) {
            that.loading = false;
            console.log(error);
          })
      },
      getPacketLossData: function () {
        let that = this;
        console.log('testId', this.testId1);
        getPacketLossData(this.testId1).then(res => {
          console.log("获取时延测试成功");
          console.log('res', res);
          this.networkLengthData4 = res.data;
          console.log(this.networkLengthData4);
          this.handleListApproveHistory4();
          this.loading = false;
        })
          .catch(function (error) {
            that.loading = false;
            console.log(error);
          })
      },
      getThroughPut: function () {
        let that = this;
        console.log('testId', this.testId1);
        getThroughPut(this.testId1).then(res => {
          console.log("获取时延测试成功");
          console.log('res', res);
          this.networkLengthData5 = res.data;
          console.log(this.networkLengthData5);
          this.handleListApproveHistory5();
          this.loading = false;
        })
          .catch(function (error) {
            that.loading = false;
            console.log(error);
          })
      },
      getConnectivity: function () {
        let that = this;
        console.log('testId', this.testId1);
        getConnectivity(this.testId1).then(res => {
          console.log("获取联通度测试成功");
          console.log('res', res);
          this.networkLengthData6 = res.data;
          console.log(this.networkLengthData6);
          this.handleListApproveHistory6();
          this.loading = false;
        })
          .catch(function (error) {
            that.loading = false;
            console.log(error);
          })
      },
      getNode: function () { //接收节点类型信息
        console.log('1234214124521',this.testId1);
        getHistoryTopology(this.testId1).then((res) => {
          console.log("获取拓扑图节点信息");
          console.log(res);
          this.node = res.data;
          var obj = this.node;
          this.getLink();
        })
          .catch(function (error) {
            console.log(error);
            console.log('获取节点类型失败');
          })
      },
      getLink: function () { //接收节点连接信息
        getHistoryTopologyLink(this.testId1).then((res) => {
          console.log("获取连接信息成功");
          console.log(res);
          this.link = res.data;
          this.drawTopology();
        })
          .catch(function (error) {
            console.log(error);
            console.log('获取连接失败');
          })
      },
      drawTopology() {
        console.log('start')
        let graph = {//数据
          nodes: [//节点
          ],
          links: [//连接
          ]
        };
        graph.nodes = this.node;
        graph.links = this.link;
// 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('main'));
        myChart.hideLoading();
        var categories = [];
        categories[0] = {
          name: 'controlCenter'
        };
        categories[1] = {
          name: 'gatewayNode'
        };
        categories[2] = {
          name: 'category'
        };
        categories[3] = {
          name: 'commonNode'
        };//定义节点类型//定义节点类型
        graph.nodes.forEach(function (node) {
          node.itemStyle = null;//
          node.symbolSize = node.size;//强制指定节点的大小
          // Use random x, y
          node.x = node.y = null;
          node.draggable = true;

        });
        console.log('1');
        console.log(graph.nodes);
        console.log(graph.links);
        let option = {
          title: {
            text: '节点信息拓扑图',//文本标题
            subtext: 'Default layout',//副标题
            top: 'bottom',//上下位置
            left: 'right'//左右位置
          },
          tooltip: {
            formatter: function (params, ticket, callback) {//回调函数
              var str = appendPath(graph.nodes[params.dataIndex].id);
              // document.getElementById("div1").innerHTML = str;
              return str;//
            }
          },
          legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {//显示策略
              return a.name;
            })
          }],
          animation: false,//是否开启动画
          series: [
            {
              name: '',
              type: 'graph',
              layout: 'force',
              lineStyle: {
                normal: {
                  color: 'black'
                }
              },
              data: graph.nodes,//节点数据
              links: graph.links,//节点边数据
              categories: categories,//策略
              roam: true,//是否开启滚轮缩放和拖拽漫游，默认为false（关闭），其他有效输入为true（开启），'scale'（仅开启滚轮缩放），'move'（仅开启拖拽漫游）
              label: {
                normal: {
                  show: 'false',
                  position: 'right'
                }
              },
              slient: false,//是否响应点击事件，为false的时候就是响应
              force: {
                repulsion: 100
              }
            }
          ]
        };
        myChart.setOption(option);
        /**
         拼接路径
         */
        function appendPath(id) {
          var str = id;
          var links = graph.links;
          var i = 0;
          var map = {};
          for (i = 0; i < links.length; i++) {
            map[links[i].target] = links[i].source;
          }
          while (true) {
            if (map[id] == undefined) {
              break;
            }
            str = map[id] + "->" + str;
            id = map[id];
          }
          return str;
        }
      }
    },
    mounted() {
      this.$router.push('/historyGraph');
      this.userName = localStorage.getItem('isLogin');
    }
  }
</script>

<style scoped>
  .historyInquiry {
    margin: 0px auto;
    bottom: 20px;
    height: 670px;
    width: 1200px;
  }

  .title {
    font-size: 25px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    height: 50px;
    border-bottom: 1px solid #ddd;
  }

  .searcher {
    margin-top: 20px;
    border-bottom: 1px solid #ddd;
    height: 52px;
    font-size: 15px;
  }

  #main {
    border: 1px solid black;
    margin: 40px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 473px;
  }
</style>

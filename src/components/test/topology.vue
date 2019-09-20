<template>
  <div>
        <div id="main" style="width: 1000px;height:400px;">
          <spin size="small" class="spin" v-show="this.spinShow"></spin>
          <spin class="spin" v-show="this.spinShow"></spin>
          <spin size="large" class="spin" v-show="this.spinShow"></spin>
          <div class="false" v-show="this.falseShow">
            <Icon type="md-close" size="70" color="red"/>
            <span class="span">拓扑图加载失败</span>
          </div>
        </div>
        <div id="div1"></div>

  </div>
</template>

<script>
  import {getTopologyNode} from "../../request/api";
  import {getTopologyLink} from "../../request/api";

  export default {
    name: "topology",
    data() {
      return {
        node: [],
        link: [],
        spinShow:true,
        falseShow:false,
        testId1:'',
      }
    },
    mounted() {
      this.testId1 = JSON.parse(sessionStorage.getItem("testId"));
      this.getNode();
    },
    methods: {
      getNode: function () { //接收节点类型信息
        let that = this;
        getTopologyNode(this.testId1).then((res) => {
            console.log("获取拓扑图节点信息");
            console.log(res);
            this.node = res.data;
            var obj = this.node;
            sessionStorage.setItem("topologyNode", JSON.stringify(obj));
            this.getLink();
            that.spinShow = false;
          })
          .catch(function (error) {
            console.log(error);
            console.log('获取节点类型失败');
            that.spinShow = false;
            that.falseShow = true;
          })
      },
      getLink: function () { //接收节点连接信息
        getTopologyLink(this.testId1).then((res) => {
            console.log("获取连接信息成功");
            console.log(res);
            this.link = res.data;
            var obj = this.link;
            sessionStorage.setItem("topologyLink", JSON.stringify(obj));
            this.drawTopology();
          })
          .catch(function (error) {
            console.log(error);
            console.log('获取连接失败');
          })
      },
      drawTopology() {
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
        // for (var i = 0; i < 3; i++) {
        //   categories[i] = {
        //     name: '类型' + i
        //   };
        // }
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
              lineStyle:{
                normal:{
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
    }
  }
</script>

<style scoped>
  #main {
    border: 1px solid black;
    margin: 40px auto;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .span{
    display: flex;
    flex-wrap: wrap
  }
  .false{
    display: flex;
    flex-direction: column;
  }
</style>

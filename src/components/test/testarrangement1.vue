<template>
  <div class="testarrangement1">
    <div class="header">
      节点信息列表
    </div>
    <div class="table">
      <Tabs :animated="false" @on-click="getlist1">
        <TabPane label="控制中心1">
          <Button type="primary" class="Button" @click="getlist">刷新列表</Button>
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
          <Button style="float: right;margin-right: 10px" type="primary" @click="upDate">提交修改</Button>
        </TabPane>
        <TabPane label="控制中心2">
          <Button type="primary" class="Button" @click="getlist1">刷新列表</Button>
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
          <Button style="float: right;margin-right: 10px" type="primary" @click="upDate1">提交修改</Button>
        </TabPane>
      </Tabs>
    </div>

    <router-view v-if="isRouterAlive"></router-view>
  </div>

</template>
<script>
  import {getNodeList} from "../../request/api"
  import {getburnTime} from "../../request/api"
  import {getNodeInformation} from "../../request/api"
  import {getNodeInformation1} from "../../request/api"

  export default {
    data() {
      return {
        items:[],
        testId1: '',  //最新测试id
        nodeid: '',
        ajaxHistoryData: [], //分页获取原始数据表格
        ajaxHistoryData1: [], //分页获取原始数据表格
        dataCount: 0,  //原始数据表单长度
        dataCount1: 0,  //原始数据表单长度
        pageSize: 12,  //分页：每页的大小
        pageSize1: 12,  //分页：每页的大小
        historyData: [],//表格实际显示内容
        historyData1: [],//表格实际显示内容
        data1: 'true',
        pageIndex: 1,
        pageIndex1: 1,
        pagerData: [],
        upLoadData: [],
        upLoadData1: [],
        currentPage: 1,
        currentPage1: 1,
        loading: true,
        loading1: true,
        noDataText: '加载数据失败',
        nodeList: [
          {
            value: 'commonNode',
            label: '普通节点'
          },
          {
            value: 'clusterHeadNode',
            label: '簇头节点',
          },
          {
            value: 'gatewayNode',
            label: '网关',
          }],
        nodeList1: [
          {
            value: 'commonNode',
            label: '普通节点'
          },
          {
            value: 'clusterHeadNode',
            label: '簇头节点',
          },
          {
            value: 'gatewayNode',
            label: '网关',
          }],
        modalData: '',
        sendData: [],
        drawData: [],
        drawData1: [],
        burnTime: '',
        tagColor: '',
        columns: [
          {
            title: '节点id',
            key: 'nodeId',
            render: (h, params) => {
              return h('div', [
                h('strong', params.row.nodeId)
              ]);
            },
            width: 80
          },
          {
            title: '节点ip',
            key: 'ip'
          },
          {
            title: '父节点id',
            key: 'parentId',
            width: 90
          },
          {
            title: '节点类型',
            key: 'nodeType',
            width: 150,
            render: (h, params) => {
              return h('Select', {
                  props: {
                    value: this.historyData[params.index].nodeType,
                  },
                  on: {
                    'on-change': (value) => {
                      this.historyData[params.index].nodeType = value;
                      console.log(this.historyData)
                    }
                  },
                },
                [
                  h('Option', {
                    props: {
                      value: 'commonNode'
                    }
                  }, '普通节点'),
                  h('Option', {
                    props: {
                      value: 'clusterHeadNode'
                    }
                  }, '簇头节点'),
                  h('Option', {
                    props: {
                      value: 'gatewayNode'
                    }
                  }, '网关节点')
                ]
              );
            },
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
            render: (h, params) => {
              let join = String(this.historyData[params.index].joinNetwork);
              return h('Select', {
                  props: {
                    value: join,
                  },
                  on: {
                    'on-change': (value) => {
                      let join1;
                      if (value == 'true') {
                        join1 = true
                      } else {
                        join1 = false
                      }
                      ;
                      console.log(join1);
                      this.historyData[params.index].joinNetwork = join1;
                      console.log(this.historyData);
                    }
                  },
                },
                [
                  h('Option', {
                    props: {
                      value: 'true'
                    }
                  }, '是'),
                  h('Option', {
                    props: {
                      value: 'false'
                    }
                  }, '否'),
                ]
              );
            },
          },
          {
            title: '烧录次数',
            key: 'burnNumber',
            width: 150,
            align: 'center',
            render: (h, params) => {
              let burnNumber = Math.floor(Math.random() * 1000 + 1);
              let color = '';
              if (burnNumber < 300) {
                color = 'success'
              } else if (burnNumber < 700) {
                color = 'warning'
              } else {
                color = 'error'
              }
              return h('Tag', {
                props: {
                  color: color,
                  type: 'dot',
                }
              }, burnNumber);
            },
          },
        ],
        columns1: [
          {
            title: '节点id',
            key: 'nodeId',
            render: (h, params) => {
              return h('div', [
                h('strong', params.row.nodeId)
              ]);
            },
            width: 80
          },
          {
            title: '节点ip',
            key: 'ip'
          },
          {
            title: '父节点id',
            key: 'parentId',
            width: 90
          },
          {
            title: '节点类型',
            key: 'nodeType',
            width: 150,
            render: (h, params) => {
              return h('Select', {
                  props: {
                    value: this.historyData1[params.index].nodeType,
                  },
                  on: {
                    'on-change': (value) => {
                      this.historyData1[params.index].nodeType = value;
                      console.log(this.historyData1)
                    }
                  },
                },
                [
                  h('Option', {
                    props: {
                      value: 'commonNode'
                    }
                  }, '普通节点'),
                  h('Option', {
                    props: {
                      value: 'clusterHeadNode'
                    }
                  }, '簇头节点'),
                  h('Option', {
                    props: {
                      value: 'gatewayNode'
                    }
                  }, '网关节点')
                ]
              );
            },
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
            render: (h, params) => {
              let join = String(this.historyData1[params.index].joinNetwork);
              return h('Select', {
                  props: {
                    value: join,
                  },
                  on: {
                    'on-change': (value) => {
                      let join1;
                      if (value == 'true') {
                        join1 = true
                      } else {
                        join1 = false
                      }
                      ;
                      console.log(join1);
                      this.historyData1[params.index].joinNetwork = join1;
                      console.log(this.historyData1);
                    }
                  },
                },
                [
                  h('Option', {
                    props: {
                      value: 'true'
                    }
                  }, '是'),
                  h('Option', {
                    props: {
                      value: 'false'
                    }
                  }, '否'),
                ]
              );
            },
          },
          {
            title: '烧录次数',
            key: 'burnNumber',
            width: 150,
            align: 'center',
            render: (h, params) => {
              let burnNumber = Math.floor(Math.random() * 1000 + 1);
              let color = '';
              if (burnNumber < 300) {
                color = 'success'
              } else if (burnNumber < 700) {
                color = 'warning'
              } else {
                color = 'error'
              }
              return h('Tag', {
                props: {
                  color: color,
                  type: 'dot',
                }
              }, burnNumber);
            },
          },
        ],
        tableData1: [],
        tableData2: [],
        burnTime: [],
        controlCenterId: '',
        isRouterAlive:true,
      }
    },
    mounted() {
      this.testId1 = JSON.parse(sessionStorage.getItem("testId"));
      this.items = JSON.parse(sessionStorage.getItem('systemTopology'));
      this.controlCenterId = JSON.parse(sessionStorage.getItem("controlCenterId"));
      var read = JSON.parse(sessionStorage.getItem("listdata"));
      this.tableData1 = read;
      if (read) {
        this.loading = false;
      } else {
        this.getlist();
      }
      if (this.tableData1) {
        this.handleListApproveHistory();
      }
      this.$router.replace('/topology');

    },
    methods: {
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      },
      mapItem(){
        let that = this;
        console.log('11231',this.items);
        for(var i=10;i<17;i++){
          that.items[i].back_active=true;

        }
        console.log(this.items);
        sessionStorage.setItem('systemTopology',JSON.stringify(this.items));
        this.reload();
      },
      upDate() {   //修改数据库数据
        let that = this;
        this.mapItem();
        console.log('上传数据', this.historyData);
        this.$http(
          {
            url: 'post1/nodemanage/node/listUpdate',
            method: "post",
            dataType: "json",
            data: this.historyData
          })
          .then(function (res) {
            console.log(res);
            console.log('his', that.historyData);
            that.setNodeOrder();
          })
          .catch(function (error) {
            console.log(error);
            that.$Message.error('修改失败，请稍后再试');
          });
      },
      upDate1() {
        let that = this;
        this.mapItem();
        this.$http(
          {
            url: 'post1/nodemanage/node/listUpdate',
            method: "post",
            dataType: "json",
            data: this.historyData1
          })
          .then(function (res) {
            console.log(res);
            console.log('更新硬件', that.historyData1);
            that.setNodeOrder1();
          })
          .catch(function (error) {
            console.log(error);
            that.$Message.error('修改失败，请稍后再试');
          });
      },
      setNodeOrder() {  //修改硬件数据
        let that = this;
        console.log('发送信息', this.drawData);
        let bool = Boolean(this.drawData.joinNetwork);
        console.log(bool);
        this.$http(
          {
            url: 'api/datatransmission/setNodeOrder?orderType=modifyNodeInformation',
            method: "post",
            dataType: "json",
            data: this.historyData,
          })
          .then(function (res) {
            console.log(res);
            that.modal1 = false;
            that.$Message.success('修改成功');
          })
          .catch(function (error) {
            console.log(error);
            that.$Message.error('修改失败，请稍后再试');
          })
      },
      setNodeOrder1() {
        let that = this;
        console.log(this.historyData1);
        this.$http(
          {
            url: 'api/datatransmission/setNodeOrder?orderType=modifyNodeInformation',
            method: "post",
            dataType: "json",
            data: this.historyData1,
          })
          .then(function (res) {
            console.log(res);
            that.modal1 = false;
            that.$Message.success('修改成功');
          })
          .catch(function (error) {
            console.log(error);
            that.$Message.error('修改失败，请稍后再试');
          })
      },
      remove(index) {
        this.data6.splice(index, 1);
      },
      getburnTime() {
        getburnTime().then(res => {
          console.log("获取烧录次数成功");
          console.log('res', res);
          this.burnTime = res.data;
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      getlist: function () {
        let that = this;
        console.log('testId', this.testId1);
        getNodeList(this.testId1,'1').then(res => {
          console.log("获取节点信息成功");
          console.log('res', res);
          this.tableData1 = res.data;
          console.log(this.tableData1);
          var obj = this.tableData1;
          sessionStorage.setItem("listdata", JSON.stringify(obj));
          this.getburnTime();
          this.handleListApproveHistory();
          this.loading = false;
        })
          .catch(function (error) {
            that.loading = false;
            console.log(error);
          })
      },
      getlist1: function () {
        let that = this;
        console.log('testId', this.testId1);
        getNodeList(this.testId1,'2').then(res => {
          console.log("获取节点信息成功");
          console.log('res', res);
          this.tableData2 = res.data;
          console.log(this.tableData2);
          var obj = this.tableData2;
          sessionStorage.setItem("listdata1", JSON.stringify(obj));
          this.getburnTime();
          this.handleListApproveHistory1();
          this.loading1 = false;
        })
          .catch(function (error) {
            that.loading1 = false;
            console.log(error);
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
        this.currentPage = index;
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start, _end);
        this.pageIndex = index;
      },
      changePage1(index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        this.currentPage1 = index;
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData1 = this.ajaxHistoryData1.slice(_start, _end);
        this.pageIndex1 = index;
      }
    }
  }
</script>

<style scoped>
  .header {
    margin: 0 auto;
    padding-left: 20px;
    display: flex;
    align-items: center;
    width: 900px;
    height: 120px;
    background-color: gainsboro;
    font-size: 25px;
    color: black;

  }

  .table {
    width: 900px;
    margin: 20px auto;
  }

  .Button {
    float: right;
  }

  .Table {
    width: 900px;
    float: right;
    margin-top: 5px;
  }
</style>

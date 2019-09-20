<template>
  <div class="nodeTable">
    <Button type="primary" class="Button" @click="getList">刷新列表</Button>
    <div style="height: 580px">
      <Table border :columns="columns" :data="historyData" class="Table" :loading="loading" :no-data-text="noDataText"></Table>
    </div>
    <div style="float: right;">
      <Page :total="dataCount" :page-size="pageSize" show-total="" class="paging" @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
  import bus from "../../assets/eventBus"
  import {getNodeList} from "../../request/api";

  export default {
    name: "nodeTable",
    data() {
      return {
        testid1: '',
        nodeid: '',
        loading:true,
        controlCenterId:'',
        noDataText:'加载失败',
        columns: [
          {
            title: '节点id',
            key: 'nodeId',
            render: (h, params) => {
              return h('div', [
                h('strong', params.row.nodeId)
              ]);
            }
          },
          {
            title: '节点ip',
            key: 'ip'
          },
          {
            title: '父节点id',
            key: 'parentId'
          },
          {
            title: '节点类型',
            key: 'nodeType',
            width: 150
          },
          {
            title: '是否在线',
            key: 'onLine'
          },
          {
            title: '是否烧录协议',
            key: 'burner'
          },
          {
            title: '是否参与组网',
            key: 'joinNetwork'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, 'View'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, 'Delete')
              ]);
            }
          }
        ],
        tableData1: [],
        ajaxHistoryData: [],
        dataCount: 0,
        pageSize: 10,
        historyData: [],
        pageIndex: 1,
        pagerData: [],
        checkStatus: [],
        testId1:'',
      }
    },
    methods: {
      show(index) {
        this.$Modal.info({
          title: '节点信息',
          content: `节点id：${this.tableData1[index].nodeId}<br>节点ip：${this.tableData1[index].ip}<br>节点类型：${this.tableData1[index].nodeType}`
        })
      },
      remove(index) {
        // this.data6.splice(index, 1);
      },
      getList: function () {
        let that  = this;
        getNodeList(this.testId1,this.controlCenterId).then((res) => {
            console.log("获取节点信息成功");
            console.log(res);
            this.tableData1 = res.data;
            var obj = this.tableData1;
            sessionStorage.setItem("nodeDataTest", JSON.stringify(obj));
            this.handleListApproveHistory();
            that.loading = false;
          })
          .catch(function (error) {
            console.log(error);
            that.loading = false
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
    mounted() {
      this.testId1 = JSON.parse(sessionStorage.getItem("testId"));
      this.controlCenterId = JSON.parse(sessionStorage.getItem("contorlCenterId"))
      var read = JSON.parse(sessionStorage.getItem("nodeDataTest"));
      if(read){
        this.loading = false;
      }
      this.tableData1 = read;
      if (this.tableData1) {
        this.handleListApproveHistory();
      }else{
        this.getList();
      }
    }
  }
</script>

<style scoped>
  .nodeTable {
    width: 1000px;
    height: 700px;
    margin: 20px auto;
  }

  .Button {
    float: right;
  }

  .Table {
    width: 1000px;
    float: right;
    margin-top: 5px;
    margin-bottom: 20px;
  }
</style>

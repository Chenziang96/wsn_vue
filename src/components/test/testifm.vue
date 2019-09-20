<template>
  <div id="testifm" class="testifm">
    <input type="text" v-model="id">
    <input type="text" v-model="name">
    <button @click="addData">添加</button>
    <table id="tb">
      <tr>
        <th>nodeId</th>
        <th>名称</th>
        <th>时间</th>
        <th>操作</th>
      </tr>
      <tr v-if="this.list.length==0">
      <td colspan="4">没有数据</td>
    </tr>
      <tr v-for="item in list">
        <td>{{item.nodeId}}</td>
        <td>{{item.ip}}</td>
        <td>{{item.testId}}</td>
        <td><a href="javascript: void(0)" @click="deleteData(item.id,item.name)">删除</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'testifm',
  data() {
    return {
      list: [],
      id:'',
      name:''
    }
  },
  created: function () {
    this.getlist();
  },
  methods: {
    addData: function () {
      let p = {
        burner: false,
        controlCenterNum: "1",
        download: false,
        ip: "10.10.1.13",
        joinNetwork: true,
        nodeId: "26",
        nodeKind: "testNode",
        nodeType: "commonNode",
        onLine: true,
        parentId: "null",
        protocolType: "WIFI",
        testId: "01692757-7ae3-40d5-a601-fcb8e18f0197"
      };
      this.$http.post('/api/nodemanage-client/node/insert',p)
        .then((response) =>{
          console.log(response);
          console.log("成功");
          this.getlist();
        })
        .catch(function (error) {
        console.log(error);
      });
    },
    deleteData: function (id, name) {
      if (!confirm('是否要删除数据')) {
        return;
      }
      var index = this.list.findIndex(function (item1) {
        return item1.id == id && item1.name == name
      });
      this.list.splice(index, 1);
    },
    getlist: function () {
      this.$http.get('/api/hibernate-client/node/list?testId=01692757-7ae3-40d5-a601-fcb8e18f0197')
        .then((response) =>{
          console.log("成功");
          console.log(response);
          this.list = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
}
</script>

<style scoped>
  #tb {
    width: 800px;
    border-collapse: collapse;
    font-size: 16px;

  }

  #tb th {
    background-color: #000fff;
    color: white;
    border: 1px solid black;
  }

  #tb td {
    background-color: white;
    color: black;
    text-align: center;
    border: 1px solid black;
  }
</style>

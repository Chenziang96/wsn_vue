<template>
  <div id="description">

  </div>
</template>

<script>
  import {sendProtocol} from "../../request/api";

  export default {
    name: 'description',
    data() {
      return {
        fileName: '',
        uploadData: {}
      }
    },
    methods: {
      handleUpload(e) {
        // this.showIf[this.fileFlag]=false
        let tFiles = e.target.files[0];
        let item = {
          name: tFiles.name
        };
        this.files[this.fileFlag] = item;
        console.log(this.files.name);
        const file = e.target.files[0];//获取到当前文件对象
        console.log(file.name);
        let formData = new FormData();
        formData.append('nodeKind', this.model1);
        console.log(this.model1);
        formData.append('file', file); // 'file' 可变 相当于 input 表单的name 属性
        // 服务器只需按照正常的上传程序代码即可
        let config = {
          //添加请求头
          headers: {"Content-Type": "multipart/form-data"},
        };
        sendProtocol(formData, config).then((res) => {
          console.log('11');
          this.showOf = false;
          this.showIf = true;
        }).catch(function (error) {
          console.log(error.res.status);
          console.log(this.model1);
          console.log('1');
          this.showOf = false;
          this.showFalse = true;
        })
        this.fileFlag = this.fileFlag + 1;
      },
    },
    mounted() {
    },
  }
</script>

<style scoped>
  #description {
    position: relative;
    top: 60px;
  }

</style>

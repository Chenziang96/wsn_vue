<template>
    <div id="chooseSys">
      <div>请选择系统</div>
      <Button type="primary">测试管理系统</Button>
      <Button type="error">感知数据管理</Button>
    </div>
</template>

<script>
    export default {
        name: "chooseSys"
    }
</script>

<style scoped>
  #chooseSys{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

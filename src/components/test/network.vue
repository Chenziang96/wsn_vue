<template>
    <div id="network" class="network">
      <div class="body">
        <Split v-model="split1">
          <div slot="left" class="demo-split-pane">
            Left Pane
          </div>
          <div slot="right" class="demo-split-pane">
            Right Pane
          </div>
        </Split>

      </div>

    </div>
</template>

<script>
export default {
  name: 'network',
  data(){
    return{
      split1: 0.5
    }
  }
}
</script>

<style scoped>
.network{
    display: flex;
    align-items: center;
    justify-content: center;
  }
.body{
  margin-top: 50px;
  height: 100%;
  border: 1px solid gray;
  width: 90%;
}
.demo-split{
  height: 200px;
  border: 1px solid #dcdee2;
}
.demo-split-pane{
  padding: 10px;
}
</style>

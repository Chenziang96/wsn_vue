<template>
  <div class="developer">
    <div class="test1">
      <div>
        <RadioGroup v-model="animal[0].ip">
          <Radio label="金斑蝶"></Radio>
          <Radio label="爪哇犀牛"></Radio>
          <Radio label="印度黑羚"></Radio>
        </RadioGroup>
        <RadioGroup v-model="animal[1].ip">
          <Radio label="金斑蝶"></Radio>
          <Radio label="爪哇犀牛"></Radio>
          <Radio label="印度黑羚"></Radio>
        </RadioGroup>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'developer',
    data() {
      return {
        animal: [
          {ip:'金斑蝶'},
          {ip:'印度黑羚'},
        ]
      }
    },
    methods: {
      change() {
      console.log(this.animal);
      }
    }
  }

</script>

<style scoped>
  .developer {
    top: 60px;
    width: 100%;
    height: 100%;
  }

  .test1 {
    width: 50%;
    height: 50%;
  }

  .test1 div {
    width: 100%;
    height: 100%;
    margin-left: 50px;
    margin-top: 100px;
    border: 1px solid black;
    transform: translate(0px, -900px) rotate(0deg);
    transition: 0.4s;
  }

  .test1:hover div {
    transform: translate(0px, 0px) rotate(360deg);
  }
</style>

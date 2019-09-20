<template>
  <div class="register">
    <div class="content">
      <img src="../../assets/image2.jpg" height="150px" width="200px">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <FormItem>
          <Input v-model="useNameInput" placeholder="username" size="large" style="width:340px;height:40px"></Input>
        </FormItem>
        <FormItem>
          <Input v-model="passwordInput" type="password" placeholder="password" size="large" style="width:340px;"></Input>
        </FormItem>
        <FormItem>
          <Input v-model="confirmPassword" placeholder="Confirm Password" size="large" style="width:340px"></Input>
        </FormItem>
      </Form>
      <Button type="primary" class="button" @click="submit" @keydown.enter="jump1" style="width:340px;height:40px;font-size: 15px">Sign up</Button>
      <div class="whether"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        formItem: '',
        useNameInput: '',
        passwordInput: '',
        confirmPassword:'',

      }
    },
    methods:{
      submit(){

      }
    }
  }
</script>

<style scoped>
  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eceff1;
    width: 100%;
    height: 100%;
  }

  .content {
    background-color: white;
    width: 400px;
    height: 600px;
    border-radius: 6px;
    text-align: center;
  }


</style>

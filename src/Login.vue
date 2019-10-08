
<template>
    <Form ref='form' :model='model' :rules='rules' :label-width="80">
      <FormItem label='用户名' prop='username'>
        <Input v-model="model.username" placeholder="Enter your username"></Input>
      </FormItem>
      <FormItem label='密码' prop='password'>
        <Input v-model="model.password" placeholder="Enter your password"></Input>
      </FormItem>
    </Form>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>

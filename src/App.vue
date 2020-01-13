<template>
  <div id="app" @submit="onSubmit">
    <form class="login-form">
      <h4>请您登录</h4>
      <input v-model="username" placeholder="请输入用户名" required>
      <input v-model="password" :type="passwordType" placeholder="请输入密码" required>
      <label><input type="checkbox" v-model="showPassword">显示密码</label>
      <button>登录</button>
    </form>
  </div>
</template>

<script>

import { login } from '@/api/login'

export default {
  name: 'app',
  data () {
    return {
      username: '',
      password: '',
      showPassword: false
    }
  },
  computed: {
    passwordType () {
      if (!this.showPassword) {
        return 'password'
      } else {
        return 'input'
      }
    }
  },
  methods: {
    onSubmit (e) {
      login(this.username, this.password)
        .then(token => {
          alert('登录成功！')
        })
        .catch(msg => {
          alert('登录失败！错误信息：' + msg)
        })
      e.preventDefault()
    }
  },
  components: {
  }
}
</script>

<style lang="less">
@primary-color: #55f;
@border-color: #a1a1a1;

html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #1e5799 0%,#2989d8 60%,#207cca 61%,#7db9e8 100%);

  .login-form {
    width: 45%;
    max-width: 600px;
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-70%);
    border: 1px solid @border-color;
    padding: 2rem 1rem;
    background-color: darken(#fffa, 10%);
    border-radius: 5px;

    & > h4 {
      margin-top: 0;
    }

    #general-input {
      display: block;
      width: 100%;
      font-size: 16px;
      padding: 0.5rem;
      border-radius: 5px;
    }

    input {
      #general-input();
      margin-bottom: 1.5rem;
      border: 1px solid @border-color;
      box-sizing: border-box;
    }

    input[type=checkbox] {
      display: inline-block;
      width: 1.2rem;
      height: 1.2rem;
    }

    button {
      #general-input();
      background-color: @primary-color;
      border: none;
      color: #fff;
      cursor: pointer;
    }
  }

}
</style>

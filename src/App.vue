<template>
  <div id="app">
    <div class="vertical-center">
      <div class="input">
        <div>
          <input v-model.number="formData.hour">时
          <input v-model.number="formData.minute">分
          <input v-model.number="formData.second">秒
        </div>
        <textarea placeholder="请输入描述" v-model="formData.description"></textarea>

        <div><button @click="addCountDown">添加倒计时</button></div>
      </div>

      <h1 v-for="(item, index) in countDownList" :key="index">
        {{ timeCountDown(item) }} - {{ item.description }}
      </h1>
    </div>
  </div>
</template>

<script>

import { sendNotification } from '@/util/NotificationUtil'

export default {
  name: 'app',
  data () {
    return {
      formData: {
        hour: 0,
        minute: 0,
        second: 0,
        description: ''
      },
      countDownList: [],
      timerId: null
    }
  },
  computed: {
  },
  created () {
    this.timerId = setInterval(() => {
      this.doInterval()
    }, 1000)
  },
  methods: {
    doInterval () {
      this.countDownList.forEach((countDownItem) => {
        if (countDownItem.timeLeft > 1) {
          countDownItem.timeLeft--
        } else if (countDownItem.timeLeft === 1) {
          countDownItem.timeLeft = 0
          this.$nextTick(() => {
            sendNotification(countDownItem.description)
          })
        }
      })
    },
    addCountDown () {
      const item = {
        timeLeft: this.formData.hour * 60 * 60 + this.formData.minute * 60 + this.formData.second,
        description: this.formData.description || '时间到！'
      }

      this.countDownList.push(item)
    },
    timeCountDown (countDownItem) {
      if (!countDownItem || countDownItem.timeLeft === -1) {
        return '00:00:00'
      }
      const timeLeft = countDownItem.timeLeft
      const hour = Math.floor(timeLeft / 60 / 60)
      const minute = Math.floor((timeLeft - hour * 60 * 60) / 60)
      const second = timeLeft - hour * 60 * 60 - minute * 60
      return `${this.appendZero(hour)}:${this.appendZero(minute)}:${this.appendZero(second)}`
    },
    appendZero (val) {
      const strVal = '' + val
      if (strVal.length >= 2) {
        return strVal
      } else {
        return '0' + strVal
      }
    }
  },
  components: {
  },
  destroyed () {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
  }
}
</script>

<style lang="less">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;

  .vertical-center {
    width: 65%;
    margin: 1.5rem auto 0;

    h1 {
      text-align: center;
    }

    .input {
      border: 1px solid #ddd;
      text-align: center;
      input {
        width: 3rem;
      }
    }
  }
}
</style>

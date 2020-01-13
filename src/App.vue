<template>
  <div id="app">
    <div>
      网格宽度：
      <select v-model="gridWidth">
        <option v-for="width in gridWithOptions" :key="width" :value="width">{{width}}</option>
      </select>
    </div>
    <canvas ref="theCanvas" width="801" height="801" @click="onClick"></canvas>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      canvas: null,
      graphics: null,
      gridWidth: 100,
      gridWithOptions: [10, 20, 50, 100]
    }
  },
  computed: {
  },
  watch: {
    gridWidth (val) {
      this.$nextTick(this.initDraw)
    }
  },
  mounted () {
    this.canvas = this.$refs.theCanvas
    this.graphics = this.canvas.getContext('2d')

    this.initDraw()
  },
  methods: {
    initDraw () {
      this.graphics.fillStyle = '#ddd'
      this.graphics.fillRect(0, 0, 805, 805)
      this.graphics.beginPath()

      for (let i = 1, j = 1; i <= 801 && j <= 801; i += this.gridWidth, j += this.gridWidth) {
        this.graphics.moveTo(0, j)
        this.graphics.lineTo(800, j)
        this.graphics.moveTo(i, 0)
        this.graphics.lineTo(i, 800)
      }
      this.graphics.strokeStyle = '#0f0'
      this.graphics.closePath()
      this.graphics.stroke()
    },
    onClick (event) {
      this.initDraw()
      this.graphics.fillStyle = '#000'
      const position = {
        x: event.offsetX,
        y: event.offsetY
      }
      this.graphics.fillText(`${position.x}, ${position.y}`, position.x, position.y)
    }
  },
  components: {
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

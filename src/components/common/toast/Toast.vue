<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data () {
    return {
      isShow: false,
      message: ''
    }
  },
  methods: {
    show(message, duration = 2000) {
      this.message = message
      this.isShow = true

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    font-size: 16px;
    padding: 10px 20px;
    transform: translate(-50%, -50%);
    color: #fff;
    border-radius: 20px;
    background-color: rgba(0,0,0, .7);
    z-index: 999;
  }
</style>
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      bs: null
    }
  },
  mounted() {
    this.Scroll()
  },
  methods: {
    Scroll() {
      this.bs = new BScroll(this.$refs.wrapper, {
        probeType: 3,
      })
      
      
    }
  }
}
</script>

<style>

</style>
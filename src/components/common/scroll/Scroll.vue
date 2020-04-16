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
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
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
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })
      

      this.bs.on('scroll', position => {
        this.$emit('scrollPosition', position)
      })

      this.bs.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
      
    },

    finishPullUp() {
        this.bs.finishPullUp()
    },

    refresh() {
      // console.log('刷新啦')
      this.bs && this.bs.refresh()
    },

    //封装scrollTo方法，默认1秒跳转
    scrollTo(x, y, time=1000) {
      this.bs && this.bs.scrollTo(x, y, time)
    },

    getScrollY () {
      return this.bs ? this.bs.y : 0
    }
  }
}
</script>

<style>

</style>
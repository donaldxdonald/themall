<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoaded">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        isImgLoaded: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      // 只发送一次即可
      swiperImgLoaded() {
        if (!this.isImgLoaded) {
          this.$emit('swiperImgLoaded')
          this.isImgLoaded = true
        }
      }
    }
  }
</script>

<style scoped>

</style>

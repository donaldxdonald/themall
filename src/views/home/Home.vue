<template>
  <div id="home">
    <nav-bar class="home-nav">
      <h3 slot="center">购物街</h3>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'

import {getHomeMultidata} from 'network/home.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data () {
    return {
      banners: [],
      recommends: [],
      alldata: null
    }
  },
  created () {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      this.alldata = res.data
    })
  }
}
</script>

<style>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
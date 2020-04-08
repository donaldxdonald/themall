<template>
  <div id="home">
    <nav-bar class="home-nav">
      <h3 slot="center">购物街</h3>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature></feature>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import Feature from './childComps/Feature'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    Feature,
    NavBar,
    TabControl,
    GoodsList
  },
  data () {
    return {
      banners: [],
      recommends: [],
      alldata: null,
      goods: {
        'pop':{page: 0, list: []},
        'new':{page: 0, list: []},
        'sell':{page: 0, list: []},
      },
      currentType: 'pop'
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created () {
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  methods: {

    /**
     * 事件监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
        this.alldata = res.data
      })
    },
    getHomeGoods(type) {
      const page = ++this.goods[type].page
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
      })
    },
    getLocation() {

    }
  }
}
</script>

<style>
  #home {
    margin-bottom: 5000px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
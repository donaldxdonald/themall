<template>
  <div id="home">
      <nav-bar class="home-nav">
        <h3 slot="center">购物街</h3>
      </nav-bar>
      <tab-control :titles="['流行', '新款', '精选']" 
                          @tabClick="tabClick" 
                          ref="tabControl1" 
                          v-show="isShowTabCtrl1"
                          class="tab-control1"></tab-control>
      <scroll class="content" 
                  ref="scroll" 
                  @showTopBtn="showTopBtn"
                  @pullingUp="loadMore"
                  :probeType="3"
                  :pullUpLoad="true">
        <home-swiper :banners="banners" @swiperImgLoaded="getHomeOffsetTop"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature></feature>
        <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="topClick" class="back-top" v-show="isShowTopBtn"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import Feature from './childComps/Feature'

import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import {denounce} from 'assets/js/common/utils.js'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    Feature,
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop
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
      currentType: 'pop',
      isShowTopBtn: false,
      isShowTabCtrl1: false,
      saveY: 0
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

  mounted() {
    this.imgLoaded()
    
    
  },

  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },

  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    topClick() {
      this.$refs.scroll.scrollTo(0,0, 1000)
    },

    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    },

    showTopBtn(position) {
      this.isShowTopBtn =  position.y <= -600

      this.isShowTabCtrl1 = (-position.y) >= this.getHomeOffsetTop()
    },

    getHomeOffsetTop() {
      return this.$refs.tabControl2.$el.offsetTop
    },

    

    // 监听图片加载完成后刷新better-scroll的内容高度
    imgLoaded() {
      this.$bus.$on('imgLoaded', () => {
        this.refresh()
      })

    },

    refresh() {
      const refresh = this.$refs.scroll.refresh()
      denounce(refresh, 1000)
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
    
  },

}
</script>

<style scoped>
  #home {
    margin-bottom: 100px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    height: calc(100vh - 6.5rem);
  }

  .tab-control1 {
    position: fixed;
    top: 3.5rem;
    left: 0;
    right: 0;
  }
  
</style>
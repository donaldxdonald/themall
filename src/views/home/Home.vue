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
                  @scrollPosition="getPosition"
                  @pullingUp="loadMore"
                  :probeType="3"
                  :pullUpLoad="true">
        <home-swiper :banners="banners" @swiperImgLoaded="getHomeOffsetTop"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature></feature>
        <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
        <goods-list :goods="showGoods" ref="goods"></goods-list>
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

import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import {debounce} from 'common/utils.js'
import {itemImgListener, backTopMixin} from 'common/mixin.js'

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
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop':{page: 0, list: []},
        'new':{page: 0, list: []},
        'sell':{page: 0, list: []},
      },
      currentType: 'pop',
      isShowTabCtrl1: false,
      saveY: 0,
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
  },
  mixins: [itemImgListener, backTopMixin],
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },

  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局事件的监听
    this.$bus.$off('imgLoaded', this.itemImgListener)
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

    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    },

    getPosition(position) {
      // 在特定区域显示置顶按钮
      this.isShowTopBtn =  position.y <= -this.$refs.goods.$el.offsetTop
      // 显示另一个tabcontrol
      this.isShowTabCtrl1 = (-position.y) >= this.getHomeOffsetTop()
    },

    getHomeOffsetTop() {
      return this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
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
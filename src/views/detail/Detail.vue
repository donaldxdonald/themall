<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll class="content"
              ref="scroll"
              @showTopBtn="showTopBtn"
              :probeType="3">
      <detail-swiper :swiperImgs="swiperImgs"/>
      <detail-base-info :goods="goods" :shop="shop"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imgLoaded="refresh"/>
    </scroll>
    <back-top @click.native="topClick" class="back-top" v-show="isShowTopBtn"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'

import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import {getDetails, Goods, Shop} from 'network/detail.js'
import {debounce} from 'common/utils.js'

export default {
  name: "Detail",
  data () {
    return {
      iid: null,
      alldata: null,
      swiperImgs: null,
      goods: {},
      shop: {},
      detailInfo: {},
      isShowTopBtn: false
    }
  },
  
  created() {
    // 1. 保存请求的iid
      this.iid = this.$route.params.iid

    // 2. 根据iid请求数据
    this.getDetails(this.iid)

  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
    BackTop
  },
  methods: {
    /**
     * 网络请求相关
     */
    getDetails(iid) {
      getDetails(iid).then(res => {
        const data = res.result
        this.alldata = data
        // 1. 获取顶部的轮播图片顺序
        this.swiperImgs = data.itemInfo.topImages
        // 2. 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 4.获取详情信息
        this.detailInfo = data.detailInfo
    })
    },

    /**
   * 监听相关
   */
    refresh() {
      const func = this.$refs.scroll.refresh()
      debounce(func, 1000)
    },
    topClick() {
      this.$refs.scroll.scrollTo(0,0, 1000)
    },
    showTopBtn(position) {
      this.isShowTopBtn =  position.y <= -800
    },
    
  },
  
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100vh - 3.5rem);
  }
</style>
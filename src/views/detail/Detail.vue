<template>
  <div id="detail">
    <detail-nav-bar @detailNavClick="navClick"/>
    <scroll class="content"
              ref="scroll"
              @scrollPosition="showTopBtn"
              :probeType="3">
      <detail-swiper :swiperImgs="swiperImgs"/>
      <detail-base-info :goods="goods" :shop="shop"/>
      <detail-shop-info :shop="shop"/>
      <detail-param-info :goodsParam="goodsParam" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <detail-goods-info :detailInfo="detailInfo" />
      <goods-list :goods="recommends" ref="recommend"/>
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
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import GoodsList from 'components/content/goods/GoodsList.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import {getDetails, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
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
      goodsParam: {},
      commentInfo: {},
      recommends: [],
      navTabY: [],
      getNavTabY: null,
      isShowTopBtn: false,
      itemImgListener: null
    }
  },
  
  created() {
    // 1. 保存请求的iid
      this.iid = this.$route.params.iid

    // 2. 根据iid请求数据
    this.getDetails(this.iid)

    // 3.请求推荐数据
    this.getRecommend()

    this.getNavTabY = debounce(() => {
      this.navTabY = []
      this.navTabY.push(0)
      this.navTabY.push(this.$refs.params.$el.offsetTop - 56)
      this.navTabY.push(this.$refs.comment.$el.offsetTop  - 56)
      this.navTabY.push(this.$refs.recommend.$el.offsetTop  - 56)
      // 减去导航栏的高度
      console.log(this.navTabY)
    })

    
  },
  mounted () {
    this.refresh()
    
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    BackTop
  },
  methods: {
    /**
     * 网络请求相关
     */
    // 一、获取详情数据
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
        // 5.获取商品参数
        this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
    })
    },
    // 二、获取推荐数据
    getRecommend() {
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },

    /**
   * 监听相关
   */
    refresh() {
      let newRefresh = debounce(this.$refs.scroll.refresh)
      
      this.itemImgListener = () => {
        newRefresh()
        this.getNavTabY()
      }
      
      this.$bus.$on('imgLoaded', this.itemImgListener)
      
    },
    topClick() {
      this.$refs.scroll.scrollTo(0,0, 1000)
    },
    showTopBtn(position) {
      // console.log(position)
      this.isShowTopBtn =  position.y <= -800

    },

    navClick(index) {
      // 设定导航栏各个标签对应的位置
      console.log('我点了')
      this.$refs.scroll.scrollTo(0, -this.navTabY[index])
     }
    }
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
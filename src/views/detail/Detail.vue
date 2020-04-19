<template>
  <div id="detail">
    <detail-nav-bar @detailNavClick="navClick" ref="nav"/>
    <scroll class="content"
              ref="scroll"
              @scrollPosition="getPosition"
              :probeType="3">
      <detail-swiper :swiperImgs="swiperImgs"/>
      <detail-base-info :goods="goods" :shop="shop"/>
      <detail-shop-info :shop="shop"/>
      <detail-param-info :goodsParam="goodsParam" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <detail-goods-info :detailInfo="detailInfo" />
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
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
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodsList from 'components/content/goods/GoodsList.vue'

import Scroll from 'components/common/scroll/Scroll.vue'

import {getDetails, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
import {debounce} from 'common/utils.js'
import {itemImgListener, backTopMixin} from 'common/mixin.js'

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
      currentIndex: 0
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
      this.navTabY.push(this.$refs.params.$el.offsetTop)
      this.navTabY.push(this.$refs.comment.$el.offsetTop)
      this.navTabY.push(this.$refs.recommend.$el.offsetTop)
      this.navTabY.push(Number.MAX_VALUE)//优化方法的一部分
    })

    
  },
  updated () {
    this.getNavTabY()
  },
  mixins: [itemImgListener, backTopMixin],
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
    DetailBottomBar,
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
    getPosition(position) {
      let positionY = position.y
      // 在特定区域显示置顶按钮
      this.isShowTopBtn =  positionY <= -this.navTabY[1]

      // 判断位置返回相应的导航栏标签
      // ↓普通做法
      // for (let i = 0; i < this.navTabY.length; i++ ) {
      //   if (i !== this.currentIndex && ((-positionY >= this.navTabY[i] && -positionY < this.navTabY[i+1]) || (i === this.navTabY.length - 1 && -positionY >= this.navTabY[i]))) {
      //     this.currentIndex = i
      //   }
      // }
      
      // ↓优化做法  增加navTabY的最后一个值, 少一个判断
      for (let i = 0; i < this.navTabY.length-1; ++i ) {
        if (i !== this.currentIndex && (-positionY >= this.navTabY[i] && -positionY < this.navTabY[i+1])) {
          this.currentIndex = i
        }
      }
      this.$refs.nav.currentIndex = this.currentIndex
    },

    navClick(index) {
      // 设定导航栏各个标签对应的位置
      this.$refs.scroll.scrollTo(0, -this.navTabY[index])
    },
    

    addToCart() {
      const product = {}
      // 1.获取购物车需要展示的信息
      product.image = this.swiperImgs[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购物车里
      this.$store.dispatch('addCart',product).then(res => {
        this.$toast.show(res)
      })
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
    height: calc(100vh - 7rem);
  }
</style>
import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop.vue'

export const itemImgListener = {
  data () {
    return {
      itemImgListener: null,
    }
  },
  mounted () {
     // 监听图片加载完成后刷新better-scroll的内容高度
    let newRefresh = debounce(this.$refs.scroll.refresh)
      
    this.itemImgListener = () => {
      newRefresh()
    }
      
    this.$bus.$on('imgLoaded', this.itemImgListener)
  }
}

export const backTopMixin = {
  data () {
    return {
      isShowTopBtn: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    topClick() {
      this.$refs.scroll.scrollTo(0,0, 1000)
    },
  }
}
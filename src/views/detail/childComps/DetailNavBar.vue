<template>
  <div>
    <nav-bar class="detail-nav-bar">
      <img src="~assets/img/common/back.svg" slot="left" @click="backClick" alt="">
      <div class="detail-nav-center" slot="center">
        <div v-for="(item, index) in titles " 
              :key="index"
              :class="{active: currentIndex == index}"
              @click="itemClick(index)">
          <span>{{item}}</span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data () {
    return {
      currentIndex: 0,
      titles: ['商品', '参数', '评论', '推荐']
    }
  },
  activated() {
    this.currentIndex = 0
  },
  methods: {
    /**
     * 事件监听相关
     */
    backClick() {
      this.$router.back()
    },

    itemClick(index) {
      this.currentIndex = index
      this.$emit('detailNavClick', index)
    }
  }
}
</script>

<style>
  .detail-nav-bar {
    background-color: #fff;
  }

  .detail-nav-bar .left img {
    vertical-align: middle;
  }

  .detail-nav-bar .detail-nav-center {
    display: flex;
    width: 80%;
    margin: 0 auto;
    
  }

  .detail-nav-bar .detail-nav-center div {
    flex: 1;
  }

  .detail-nav-bar .detail-nav-center div span {
    padding: 10px 5px;
  }


  .detail-nav-bar .detail-nav-center .active span{
    color: var(--text-high-text);
    border-bottom: 3px solid var(--color-tint);
  }
</style>
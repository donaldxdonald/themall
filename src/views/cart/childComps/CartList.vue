<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item"/>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import Scroll from 'components/common/scroll/Scroll.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    CartListItem,
    Scroll
  },
  activated () {
    
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    overflow: hidden;
  }

  .content {
    height: calc(100vh - 6.5rem);
  }
</style>
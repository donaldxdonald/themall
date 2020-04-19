<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <h3 slot="center">购物车({{goodsCount}})</h3>
    </nav-bar>
    <cart-list class="cart-list"/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import NavBar from 'components/common/navbar/NavBar.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    CartList,
    CartBottomBar,
    NavBar,
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['goodsCount'])
  },
  methods: {
  }
}
</script>

<style scoped>
  #cart {
    background-color: #fff;
  }

  .cart-nav {
    color: #fff;
    background-color: var(--color-tint);
  }


</style>
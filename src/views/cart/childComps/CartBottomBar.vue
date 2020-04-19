<template>
  <div class="cart-bottom-bar">
    <div class="check-button">
      <check-button :value="isSelectAll" @click.native="checkClick"/>
    </div>
    <div class="total-price">
      <span>总计: {{totalPrice}}</span>
    </div>
    <div class="check-out" @click="chkOutClick">
      <span>去结算({{chkLength}})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      // 先筛选出已勾选的商品
      // 然后用reduce函数将全部加起来
      return '￥' + this.cartList.filter(item =>  {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    chkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length == 0) return false

      return !(this.cartList.find(item => !item.checked))
    }
  },
  methods: {
    checkClick() {
      const all = this.isSelectAll
      this.cartList.forEach(item => item.checked = !all)

      // if(!this.isSelectAll) {
      //   this.cartList.forEach(item => item.checked = true)
      // } else this.cartList.forEach(item => item.checked = false)
    },
    chkOutClick() {
      if (this.chkLength) {
        this.$toast.show('购买失败，穷鬼')
      } else this.$toast.show('请勾选要购买的商品')
    }
  }
}
</script>

<style scoped>
  .cart-bottom-bar {
    position: fixed;
    height: 3rem;
    bottom: 3rem;
    width: 100%;
    z-index: 100;

    display: flex;
    align-items: center;
    background-color: #eee;
  }

  .check-button {
    margin: 0 5px;
  }

  .total-price {
    flex: 1;
  }

  .check-out {
    display: flex;
    flex-direction: row-reverse;
    width: 35%;
  }

  .check-out span {
    padding: 8px 10px;
    margin-right: 20px;
    border-radius: 20px;
    color: #fff;
    background-color: var(--color-tint);
  }

</style>
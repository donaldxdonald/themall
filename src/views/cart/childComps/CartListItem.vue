<template>
  <div class="cart-list-item" :class="{selected: product.checked}">
    <div class="item-selector">
      <check-button v-model="product.checked" @click.native="boxChecked"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述: {{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">{{productPrice}}</div>
        <div class="item-count right">
          <button @click="minusCount" :disabled="product.count == 1">-</button>
          <span>{{product.count}}</span>
          <button @click="addCount">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

import {ADD_COUNT, MINUS_COUNT,  BOX_CHECKED} from '../../../store/mutations_types'

export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      isChecked: false
    }
  },
  computed: {
    productPrice() {
      return '￥' + (this.product.price * this.product.count).toFixed(2)
    }
  },
  components: {
    CheckButton
  },
  methods: {
    boxChecked() {
      this.isChecked = !this.isChecked
      this.$store.commit(BOX_CHECKED, this.product)
    },
    addCount() {
      this.$store.commit(ADD_COUNT, this.product)
    },
    minusCount() {
      this.$store.commit(MINUS_COUNT, this.product)
    }
  }
}
</script>

<style scoped>
  .cart-list-item {
    padding-bottom: 5px;
    padding-top: 5px;
    width: 100%;
    display: flex;
    border-bottom: 1px solid #ccc;
  }

  .selected {
    background-color: #eee;
  }

  .item-selector {
    margin-left: 5px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 120px;
    display: block;
    border-radius: 10px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
  }

  .info-bottom .item-count {
    display: flex;
    width: 30%;
    justify-content: space-evenly;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  .info-bottom button {
    width: 20px;
    height: 20px;
    
  }
</style>
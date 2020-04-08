<template>
  <div class="goods">
    <goods-item  v-for="(item, index) in goods" :key="index" :gdetails="goods[index]"/>>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
  name: "Goods",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsItem
  }
  
}
</script>

<style>
.goods {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-evenly;
}
</style>
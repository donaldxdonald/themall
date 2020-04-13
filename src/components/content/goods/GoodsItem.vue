<template>
  <div class="goods-item" @click="itemClick">
      <img :src="gdetails.show.img" @load="imgLoaded">
      <div class="goods-info">
        <p class="goods-item-title">{{gdetails.title}}</p>
        <span class="price">￥{{gdetails.price}}</span>
        <span class="fav">⭐{{gdetails.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    gdetails: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoaded() {
      this.$bus.$emit('imgLoaded')
    },
    itemClick() {
      this.$router.push('detail/' + this.gdetails.iid)
    }
  }

}
</script>

<style>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-info {
    overflow: hidden;
    position: absolute;
    bottom: 5px;
    font-size: 12px;
    left: 0;
    right: 0;
    text-align: center;
  }

  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }

  .goods-item-title {
    padding: 5px 3px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
  }

 
 
</style>
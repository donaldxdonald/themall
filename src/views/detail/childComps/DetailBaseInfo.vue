<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="r-price">￥{{goods.realPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info {
    margin:  10px auto;
  }

  .info-title {
    font-weight: 700;
    margin: 3px 5px;
  }

  .info-price {
    color: var(--color-high-text);
    height: 35px;
    line-height: 35px;
    margin-top: 5px;
    margin-bottom: 8px;
    margin-left: 5px;
  }

  .r-price {
    font-size: 23px;
    padding-right: 5px;
  }

  .o-price {
    text-decoration: line-through;
    font-size: 14px;
    padding-right: 5px;
  }

  .discount {
    color: #fff;
    padding: 3px 5px;
    font-size: 12px;
    background-color: var(--color-tint);
    border-radius: 12px;
  }

  .info-other {
    display: flex;
    padding: 5px;
    justify-content: space-between;
    font-size: var(--font-size);
    color: var(--color-text);
    border-bottom: 2px solid rgba(100, 100, 100, .2);
  }

  .info-service {
    padding: 0 5px;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid rgba(100, 100, 100, .2);
    font-size: 1rem;
  }

  .info-service img {
    width: 11px;
    margin: 2px;
    vertical-align: middle;
  }

  .info-service span {
    vertical-align: middle;
  }
</style>
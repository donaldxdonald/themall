<template>
  <div class="detail-shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{shop.sells}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" 
                :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高' : '低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <span>进店逛逛</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
    }
  }
  }
}
</script>

<style scoped>
  .detail-shop-info {
    padding: 10px auto;
  }

  .shop-top {
    height: 70px;
    line-height: 70px;
    padding-left: 10px;
  }

  .shop-top img {
    width: 45px;
    vertical-align: middle;
    margin-left: 5px;
    margin-right: 7px;
  }

  .shop-middle {
    display: flex;
  }

  .shop-middle-item {
    flex: 1;
    font-size: 15px;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    border-right: 2px solid rgba(100, 100, 100, .2);
  }

  .shop-middle-left .sells-count {
    margin-bottom: 5px;
  }


  .shop-middle-left .goods-count {
    margin-bottom: 5px;
  }

  .shop-middle-right table {
    margin: 0 auto;
  }

  .shop-middle-right table  tr {
    height: 20px;
  }

  .shop-middle-right table  tr td {
    padding: 0 5px;
    text-align: center;
  }

  .shop-middle-right .score {
    color: #0f0;
  }

.shop-middle-right .score-better {
    color: #f13e3a;
  }

.shop-middle-right .better span{
    background-color: #5ea732;
    color: #fff;
    text-align: center;
}
  
.shop-middle-right .better-more span {
    background-color: #f13e3a;
}
  
  .shop-bottom {
    text-align: center;
    height: 5rem;
    line-height: 5rem;
    border-bottom: 4px solid rgba(100, 100, 100, .2);
  }

  .shop-bottom span {
    padding: .5rem 2rem;
    border-radius: 1rem;
    background-color: #e6e6e6;
    text-align: center;
  }
</style>
<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon fav"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    background-color: #fff;
    height: 3.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    box-shadow: 0 -1px 5px rgba(100, 100, 100, .2);
  }
  
  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-left {
    justify-content: center;
    font-size: 14px;
  }

  .bar-left div {
    flex: 1;
  }

  .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto;
    background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  }

  .service {
    background-position: 0 -53px;
  }

  .shop {
    background-position: 0 -98px;
  }

  .fav {
    background-position: 0 -148px;
  }
  
  .bar-right {
    justify-content: center;
  }

  .bar-right div {
    flex: 1;
    height: 3.5rem;
    line-height: 3.5rem;
  }

  .cart {
    background-color: #ee3;
  }

  .buy {
    background-color: #f99;
  }
</style>
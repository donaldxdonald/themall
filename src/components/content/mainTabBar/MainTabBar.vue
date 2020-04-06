<template>
  <div id="main-tb">
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-img" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-img-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <span slot="item-text">首页</span>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-img" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-img-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <span slot="item-text">分类</span>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-img" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-img-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <span slot="item-text">购物车</span>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-img" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-img-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <span slot="item-text">我的</span>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import tabBar from 'components/common/tabbar/TabBar'
import tabBarItem from 'components/common/tabbar/TabBarItem'

export default {
    name: 'MainTabBar',
    components: {
      tabBar,
      tabBarItem
    }

}
</script>

<style>
h2 {
  padding-left: 20px;
}

</style>
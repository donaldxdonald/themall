<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import mainTabBar from 'components/content/mainTabBar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
    mainTabBar,
  }
}
</script>

<style>
@import url('assets/css/base.css');


</style>

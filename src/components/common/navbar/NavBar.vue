<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
}

.left, .right {
  width: 60px;
}

.center {
  flex: 1;
  text-align: center;
}

</style>
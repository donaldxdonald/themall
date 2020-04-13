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
  height: 3.5rem;
  line-height: 3.5rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
}

.left, .right {
  width: 60px;
  text-align: center;
}

.center {
  flex: 1;
  text-align: center;

}

</style>
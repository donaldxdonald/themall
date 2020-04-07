<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style>

#tab-bar {
  background-color: #f6f6f6;
  display: flex;
  height: 7%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 1px -1px 5px rgba(100, 100, 100, .2);
}





</style>
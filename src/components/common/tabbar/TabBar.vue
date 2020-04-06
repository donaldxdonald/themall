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
  background-color: #e6e6e6;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 1px -1px 5px rgba(0, 0, 0, .2);
}





</style>
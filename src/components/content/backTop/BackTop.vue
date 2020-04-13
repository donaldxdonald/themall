<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    bottom: 3.8rem;
    right: 1rem;
    z-index: 100;
  }

  .back-top img {
    width: 48px;
    height: 48px;
  }
</style>
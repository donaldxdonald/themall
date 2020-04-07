<template>
  <div class="recommends">
    <div v-for="item in recommends" :key="item.index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },


}
</script>

<style>
  .recommends {
    display: flex;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 20px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    margin: 0;
    padding: 0;
  }

  .recommend-item img {
    width: 70%;
    margin-bottom: 10px;
  }

  .recommend-item span {
    display: block;
  }
</style>
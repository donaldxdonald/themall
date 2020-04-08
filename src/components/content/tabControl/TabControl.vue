<template>
  <div class="tab-control">
    <div class="tab-control-item" 
            v-for="(item, index) in titles" 
            :key="index" 
            :class="{active: currentIndex == index}"
            @click="getIndex(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex : 0
    }
  },
  methods: {
    getIndex(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
  .tab-control{
    display: flex;
    background-color: #fff;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    position: sticky;
    top: 3.5rem;
    z-index: 1;
  }

  .tab-control-item {
    flex: 1;
    padding: 5px;
  }

  .tab-control-item span {
    padding: 6px 8px;
  }

  .active {
    color: var('--color-high-text');
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
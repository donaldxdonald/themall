<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive"><slot name="item-img"></slot></div>
    <div v-else> <slot name="item-img-active"></slot></div>
    <div :class="{active: !isActive}"><slot name= "item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path)
    }
  },
  methods: {
    itemClick(){
      this.$router.push(this.path)
    },
  }
}
</script>

<style>

.tab-bar-item img {
  width: 20px;
  height: 20px;
  margin-top: 6px;
  margin-bottom: 2px;
  vertical-align: middle;
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}

.tab-bar-item span {
  font-size: 12px;
  display: block;
}

.active {
  color: #f00;
}

</style>
<template>
  <div class="check-button" :class="{checked: isChecked}" @click="boxChecked">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  data () {
    return {
      isChecked: false
    }
  },
  methods: {
    boxChecked() {
      this.isChecked = !this.isChecked
    }
  }
}
</script>

<style scoped>
  .check-button {
    position: relative;
    margin: 0;
    padding: 3px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .checked {
    background-color: #f00;
    border-color: #ff8198;
  }
</style>
<template>
  <div class="param-info" v-if="Object.keys(goodsParam).length !== 0" >
    <table v-for="(item, index) in goodsParam.sizes" :key="index" class="info-size">
      <tr v-for="(tr, indey) in item" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param" >
      <tr v-for="(infos, index) in goodsParam.infos" :key="index">
        <td class="info-param-key">{{infos.key}}</td>
        <td class="info-param-value">{{infos.value}}</td>
      </tr>
    </table>
    <div class="info-img">
      <img :src="goodsParam.image" alt="" >
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    goodsParam: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    width: 98px;
  }

   .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .info-param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }

</style>
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1. 安装插件
Vue.use(Vuex)

// 2. 创建store对象

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 3. 挂载Vue实例上 main.js
export default store
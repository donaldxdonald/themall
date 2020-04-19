import {
  ADD_COUNT,
  MINUS_COUNT,
  ADD_TO_CART,
  BOX_CHECKED,
} from './mutations_types'

export default {
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  [MINUS_COUNT](state, payload) {
    payload.count--
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  [BOX_CHECKED](state, payload) {
    payload.checked = !payload.checked
  },
}
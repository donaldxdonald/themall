import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations_types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct)
        resolve('商品数量+1')
      } else {
        payload.count = 1
        payload.checked = false
        context.commit(ADD_TO_CART, payload)
        resolve('已添加到购物车')
      }
    })
  },
} 
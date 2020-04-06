import Vue from 'vue'
import Router from 'vue-router'


const Home = ()=> import('views/home/Home.vue')
const Category = ()=> import('views/category/Category.vue')
const Cart = ()=> import('views/cart/Cart.vue')
const Profile = ()=> import('views/profile/Profile.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ],
  mode: 'history'
})

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/add-product',
    name: 'AddProduct',
    component: () => import('@/pages/AddProduct.vue'),
  },
  {
    path: '/',
    name: 'Busket',
    component: () => import('../pages/Busket.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

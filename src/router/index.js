import Vue from 'vue'
import VueRouter from 'vue-router'
import route from './route'

Vue.use(VueRouter)

const routes = [
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/views/Demo.vue')
  },
  route
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

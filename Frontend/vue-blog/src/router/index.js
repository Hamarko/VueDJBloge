import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Grafik from '../views/Grafik.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Blog',
    component: Home
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post    
  },
  {
    path: '/graf/',
    name: 'Graf',
    component: Grafik
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

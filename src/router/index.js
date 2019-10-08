import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
      {
        path: '/login',
        component: () => import(/* webpackChunkName: "Home" */ '@/Login.vue')
      },
      {
        path: '/',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/layout/main.vue'),
        redirect: '/home',
        children : [
          {
            path: '/home',
            component: () => import(/* webpackChunkName: "Home" */ '@/views/home/home.vue'),
            meta: { title: 'home' },
            name: 'home'
          },
          {
            path: '/about',
            component: () => import(/* webpackChunkName: "Home" */ '@/views/about/about.vue'),
            meta: { title: 'about' },
            name: 'about'
          }
        ]
      }
    ]
  })
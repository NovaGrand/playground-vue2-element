import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import HomeView from "@/views/HomeView";

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    ...routes
  ]
})

export default router

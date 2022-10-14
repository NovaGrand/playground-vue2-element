import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/big_file_upload',
    name: 'big_file_upload',
    component: ()=>import('@/views/bigFileUpload')
  },
  {
    path: '/super_map',
    name: 'super_map',
    component: ()=>import('@/views/superMap')
  },
  {
    path: '/big_screen',
    name: 'big_screen',
    component: ()=>import('@/views/bigScreen')
  },
  {
    path: '/haohai',
    name: 'haohai',
    component: ()=>import('@/views/haohai/layout.vue'),
    children:[
      {
        path: 'controlBoard',
        name: 'dklawa',
        component: ()=>import('@/views/haohai/command&conduct/controlBoard'),
      },
      {
        path: 'oneKeyOperation',
        name: '一键调度',
        component: ()=>import('@/views/haohai/command&conduct/oneKeyOperation'),
      },
      {
        path: 'reportManagement',
        name: '情况报告',
        component: ()=>import('@/views/haohai/command&conduct/reportManagement'),
      },
      {
        path: 'resourceManagement',
        name: '资源管理',
        component: ()=>import('@/views/haohai/command&conduct/resourceManagement'),
      },
      {
        path: 'taskManagement',
        name: '任务管理',
        component: ()=>import('@/views/haohai/command&conduct/taskManagement'),
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

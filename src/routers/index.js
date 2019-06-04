import Vue from 'vue'
import Router from 'vue-router'
import Movie from './movie'
import Mine from './mine'
import Cinema from './cinema'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
   Movie,Mine,Cinema,
   {
     path:'/*',
     redirect:'/movie'
   }
  ]
})

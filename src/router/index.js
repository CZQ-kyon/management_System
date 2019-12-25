import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import parentWeb from '@/components/parentWeb'
import teacherWeb from '@/components/teacherWeb'
import administratorWeb from '@/components/administratorWeb'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/administratorWeb',
      name:'administratorWeb',
      component:administratorWeb
    },
    {
      path:'/parentWeb/:parent_name',
      name:'parentWeb',
      component:parentWeb
    },
    {
      path:'/teacherWeb/:schoolid',
      name:'teacherWeb',
      component:teacherWeb
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import router from './router'
import Bootstrap_table from '@/page/Bootstrap_table'
const DemoServer = resolve => require(['@/page/DemoServer.vue'], resolve)
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/bootstrap_table',
      name: 'Bootstrap_table',
      component: Bootstrap_table
    },
    { path: '/demoserver', name: 'DemoServer',component: DemoServer},
  ]
})


export default router

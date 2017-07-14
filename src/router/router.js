import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history',
  base: '/my-project/'
})

router.beforeEach(({ meta, path }, from, next) => {
  const { auth = true } = meta
  const isLogin = Boolean(localStorage.getItem('my_project_accesstoken')) // true用户已登录， false用户未登录
  if (auth && !isLogin && path !== '/login') {
    let to = { path: '/login' }
    return next(to)
  }
  next()
})

export default router

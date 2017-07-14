import Vue from 'vue'
import router from './router/'
import vuet from './vuet/'
import * as filters from './filters/'
import components from './components/'

Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`v${name}`, components[key])
})
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器

export default new Vue({ router, vuet }).$mount('#app')

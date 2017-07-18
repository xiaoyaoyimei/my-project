import Vue from 'vue'
<<<<<<< HEAD
import App from './App'
import router from './router'
import axios from 'axios';
import http from './service/http';
import TableServer from './components/TableServer'
import ShowColumns from './components/ShowColumns'
import Table from './components/Table';
import Pager from "./components/Pager"
import router from './router/'
import vuet from './vuet/'
import * as filters from './filters/'
import components from './components/'
Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.config.productionTip = false
let btTable = {
    TableServer,
    ShowColumns,
    Table
}
Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`v${name}`, components[key])
})
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器

export default new Vue({ router, vuet }).$mount('#app')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }})
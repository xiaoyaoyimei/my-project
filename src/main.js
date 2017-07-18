// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import http from './service/http';
import TableServer from './components/TableServer'
import ShowColumns from './components/ShowColumns'
import Table from './components/Table';
import Pager from "./components/Pager"
Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.config.productionTip = false
let btTable = {
    TableServer,
    ShowColumns,
    Table
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

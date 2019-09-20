// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import {router1} from './router/index'
import axios from 'axios'
import echarts from 'echarts'
import store from './store'


Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts


Vue.use(iview)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,//使用store
  router: router1,
  render: c => c(App),

})

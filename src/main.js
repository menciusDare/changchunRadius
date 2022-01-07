// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
import Echarts from 'echarts'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
Vue.config.productionTip = false
Vue.component('v-chart', VueECharts)
Vue.prototype.$echarts = Echarts
Vue.prototype.$axios = Axios
Vue.use(ElementUI)
// console.log = function () {}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

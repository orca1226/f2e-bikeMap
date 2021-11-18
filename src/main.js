import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import api from './api/index.js'

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

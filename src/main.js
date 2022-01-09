import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import api from './api/index.js'
import * as VueGoogleMaps from 'vue2-google-maps'
import gmapsInit from './utils/gmap.js'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBgnlQTPezT-ASNOzQZeMOexhEOF66FLUQ',
    libraries: 'places'
  }
})
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.axios = axios
Vue.prototype.gmapsInit = gmapsInit

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

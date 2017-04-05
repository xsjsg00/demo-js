// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
//import axios from 'axios'
//import VueAxios from 'vue-axios'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'

Vue.use(MintUI)
Vue.use(VueResource)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

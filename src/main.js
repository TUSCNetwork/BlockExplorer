// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import {Apis} from 'bitsharesjs-ws'
Vue.prototype.$chainWebsocket = Apis

Vue.config.productionTip = false

window.app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import chainWebsocket from './chainWebsocket'

Vue.config.productionTip = false

Vue.use(chainWebsocket)

window.app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created() {
    this.$chainWebsocket.connect()
  },
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import chainWebsocket from './chainWebsocket'

Vue.config.productionTip = false

Vue.prototype.$chainWebsocket = chainWebsocket('ws://ec2-18-191-226-51.us-east-2.compute.amazonaws.com:8090')
// Vue.prototype.$chainWebsocket = chainWebsocket('wss://bitshares.openledger.info/ws')

window.app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created() {
    this.$chainWebsocket.connect()
  },
})

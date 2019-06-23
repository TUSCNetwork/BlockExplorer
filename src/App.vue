<template>
  <div id="app">
    <!-- <div class="section">
      <p>Search:</p>
      <input type="text" id="search" v-model="search">
    </div> -->
    <div class="section border">
      <router-link to="/">Home</router-link>
    </div>
    <div class="section border">
      <p>Account name: 
        <input type="text" id="searchAddress" v-model="searchAddress">
      </p>
    </div>
    <div class="section border">
      <witnesses/>
    </div>
    <router-view :key="$route.fullPath" class="section border"/>
  </div>
</template>

<script>
  import Witnesses from './components/Witnesses.vue'

  export default {
    name: 'App',
    data() {
      return {
        search: '',
        searchAddress: '',
        socketReady: false,
        queryQueue: []
      }
    },
    components: {
      Witnesses
    },
    watch: {
      searchAddress: debounce(function(val) {
        this.$router.push({name: 'account', params: {name: val}})
      }, 500)
    },
    methods: {
      send(api, method, params) {
        const apis = {  // the keys get provided, the values are for bitsharesjs-ws
          database: 'db_api',
          history: 'history_api',
          network: 'network_api',
          crypto: 'crypto_api',
          orders: 'orders_api'
        }

        if (! this.socketReady) {
          return new Promise((res, rej) => {
            this.queryQueue.push([api, method, params, res, rej])
          })
        }

        log(`sending params`, api, method, params)

        const apiName = apis[api] || 'unknown_api'
        return this.$chainWebsocket.instance()[apiName]().exec(method, params)
        // TODO less brittle
    }
  },
  created() {
    this.$chainWebsocket
      // .instance("wss://bitshares.openledger.info/ws", true)
      .instance("ws://ec2-18-191-226-51.us-east-2.compute.amazonaws.com:8090", true)
      .init_promise
      .then((res) => {

        /* DEBUG */
        let originalOnMessage = this.$chainWebsocket.instance().ws_rpc.ws.onmessage
        this.$chainWebsocket.instance().ws_rpc.ws.onmessage = (message) => {
          const messageData = JSON.parse(message.data)
          const messageID = messageData.id
          log(`received response`, messageData.result)
          originalOnMessage(message)
        }
        /* END DEBUG */

        // handle all requests that were entered before the socket was ready
        this.socketReady = true
        while(this.queryQueue.length > 0) {
          const [api, method, params, res, rej] = this.queryQueue.pop()
          this.send(api, method, params).then(res).catch(rej)
          log('queued query got sent', method, params)
        }

        // chainWebsocket.instance().db_api().exec("set_subscribe_callback", [updateListener, true])
      })

    // function updateListener(object) {
        // console.log("set_subscribe_callback:\n", object)
    // }
  }
}

// TODO lodash?
function debounce(func, wait) {
  let timeout
  return function() {
    const context = this, args = arguments
    const later = () => timeout = null
    clearTimeout(timeout)
    console.log('debounced')
    timeout = setTimeout(later, wait)
    func.apply(context, args)
  }
}

window.onload = () => {
  document.getElementById('searchAddress').focus()
}

const debug_logging = true
let logCounter = 1
window.log = (...args) => {
  args = args.map(arg => {
    if(typeof arg === 'string')
      return arg
    return JSON.stringify(arg, null, 2)
  })
  
  if (! debug_logging) {
    args.forEach(arg => console.log(arg))
    return
  }

  const logDiv = document.getElementById('log')
  const scrollLog = () => { logDiv.scrollTop = logDiv.scrollHeight }

  const el = document.createElement('p')
  el.innerText = `${logCounter}. ${args[0]}`
  el.classList.add('log-item')
  logDiv.appendChild(el)
  logCounter++

  args.slice(1).forEach(arg => {
    const el = document.createElement('p')
    el.innerText = arg
    el.classList.add('log-item', 'log-indented')
    logDiv.appendChild(el)
  })

  logDiv.appendChild(document.createElement('hr'))

  // scrollLog()
}
</script>

<style>
html {
  height: 100%;
  line-height: 1.4;
}
body {
  height: 100%;
  margin: 10px 0 0;
}

/* * */
input[type="text"] {
  background-color: #EEE;
}
p {
  margin: 2px 0;
}
hr {
  margin-bottom: 10px;
}

#app {
  padding: 10px;
}

/* * */
.border {
    border: 1px solid black;
    border-radius: 2px;
  }
.section {
  padding: 15px;
  margin: 20px auto;
}
.subsection {
  margin: 20px auto;
  padding: 10px 15px;
}
.indent {
  border-left: 1px solid black;
  padding-left: 15px;
  margin-left: 10px;
}
.long-key {
  word-break: break-word;
  vertical-align: top;
}

/* * */
#log {
  background-color: rgb(45, 47, 48);
  font-family: "Courier New", serif;

  max-height: 50%;

  word-break: break-all;
  overflow-y: auto;
  padding: 10px;
}
.log-item {
  white-space: pre-wrap;
}
.log-indented {
  padding-left: 40px;
}

/* * * provisional dark style */
body {
  background-color: rgb(34, 36, 37);
  color: rgb(209, 203, 199);
}

* {
  border-color: rgb(123, 107, 101) !important;
}

a {
  color: rgb(144, 196, 238);
}
a:visited {
  color: rgb(160, 117, 234);
}
</style>

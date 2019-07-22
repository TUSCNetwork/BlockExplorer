import {Apis as _socket} from 'bitsharesjs-ws'
import Vue from 'vue'

export default {
  install(vue, userOptions) {
    const options = {...defaultOptions, ...userOptions}
    Vue.prototype.$chainWebsocket = chainWebsocket(options)
  }
}

const defaultOptions = {
  debug: false
}

const chainWebsocket = options => ({
  _socket,
  queryQueue: [],
  onReceivedCallbacks: [],
  ready: false,
  tried: false,
  connect() {
    this._socket
      .instance(options.url, true)
      .init_promise
      .then((res) => {
        this.ready = true
        
        // handle all requests that were sent before the socket was ready
        while(this.queryQueue.length > 0) {
          const [api, method, params, res, rej] = this.queryQueue.pop()
          this.send(api, method, params).then(res).catch(rej)
        }

        // intercept 2.1.0 (dynamic global properties) updates
        const instance = this._socket.instance()
        const originalOnMessage = instance.ws_rpc.ws.onmessage
        instance.ws_rpc.ws.onmessage = message => {
          this.onReceivedCallbacks.forEach(f => {
            f(message)
          })

          if(options.debug)
            console.log(`received params ${JSON.stringify(message.data, null, 2)}`)

          originalOnMessage(message)
        }
      })
  },
  send(api, method, params=[]) {
    const apis = {  // the keys get provided, the values are for bitsharesjs-ws
      database: 'db_api',
      history: 'history_api',
      network: 'network_api',
      crypto: 'crypto_api',
      orders: 'orders_api'
    }

    if (! this.ready) {
      return new Promise((res, rej) => {
        this.queryQueue.push([api, method, params, res, rej])
      })
    }

    if (options.debug)
      console.log(`sending params ${api}.${method}`, params)

    // TODO less brittle
    const apiName = apis[api] || 'unknown_api'
    return this._socket.instance()[apiName]().exec(method, params)
  },
  setOnReceivedCallback(f) {
    this.onReceivedCallbacks.push(f)
  }
})

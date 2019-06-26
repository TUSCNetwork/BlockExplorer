import {Apis as _socket} from 'bitsharesjs-ws'

export default chainURL => ({
  _socket,
  queryQueue: [],
  ready: false,
  tried: false,
  connect() {
    this._socket
      .instance(chainURL, true)
      .init_promise
      .then((res) => {
        this.ready = true

        // handle all requests that were sent before the socket was ready
        while(this.queryQueue.length > 0) {
          const [api, method, params, res, rej] = this.queryQueue.pop()
          this.send(api, method, params).then(res).catch(rej)
          window.log('queued query got sent', method, params)
        }
      })

    // debug logging in DOM
    if (process.env.NODE_ENV === 'development') {
      let logCounter = 1
      window.log = (...args) => {
        args = args.map(arg => {
          if(typeof arg === 'string')
            return arg
          return JSON.stringify(arg, null, 2)
        })

        const logDiv = document.createElement('div')
        logDiv.setAttribute('id', 'log')
        logDiv.appendChild(document.createElement('p', {innerText: 'Log'}))
        logDiv.appendChild(document.createElement('hr'))
        document.body.appendChild(logDiv)

        const scrollLog = () => {
          const logDiv = document.getElementById('log')
          logDiv.scrollTop = logDiv.scrollHeight
        }

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

        scrollLog()
      }

      const instance = this._socket.instance()
      const originalOnMessage = instance.ws_rpc.ws.onmessage
      instance.ws_rpc.ws.onmessage = (message) => {
        const messageData = JSON.parse(message.data)
        const messageID = messageData.id
        window.log(`received response`, messageData.result)
        originalOnMessage(message)
      }
    } else {
      window.log = (...args) => console.log(...args)
    }
    // end debug logging in DOM
  },
  send(api, method, params) {
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

    window.log(`sending params`, api, method, params)

    // TODO less brittle
    const apiName = apis[api] || 'unknown_api'
    return this._socket.instance()[apiName]().exec(method, params)
  }
})

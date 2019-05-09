let app = new Vue({
	el: '#app',
	data: function() {
		return { search: '' }
		log('vue')
	},
})

document.getElementById('search').focus()

const debug_logging = true
const logDiv = document.getElementById('log')
var logCounter = 1
const scrollLog = () => { logDiv.scrollTop = logDiv.scrollHeight }
const log = (...args) => {
	args.forEach(arg => {
		console.log(arg)

		if (debug_logging) {
			lines = arg.split('\n')

			el = document.createElement('p')
			el.innerText = `${logCounter}. ` + lines[0]
			logDiv.appendChild(el)
			logCounter++
			scrollLog()

			lines.slice(1).forEach(line => {
				el = document.createElement('p')
				el.innerText = line
				el.classList.add('log-indented')
				logDiv.appendChild(el)
				scrollLog()
			})
		}
	})
}

const node = 'wss://bitshares.openledger.info/ws'
const ws = new WebSocket(node)
log('opening socket')

var id = 0
var callbacks = {}
// increments id for you, can provide a callback, method defaults to 'call'
const send = (params, callback=null, method='call') => {
	json = {
		id: id,
		method: method,
		params: params
	}

	log(`request #${id} has params
		${JSON.stringify(params)}`)

	ws.send(JSON.stringify(json))

	if(callback != null) {
		log(`set callback ${id}`)
		callbacks[id] = callback
	}

	id++
}

var NETWORK_BROADCAST_API, DATABASE_API

ws.onmessage = (message) => {
	messageData = JSON.parse(message.data)
	messageID = messageData.id

	log(`response #${messageID} has data
		${JSON.stringify(messageData.result)}`)

	if(callbacks[messageID]) {
		callbacks[messageID](messageData.result)
		delete callbacks[messageID]
	}
}

ws.onopen = () => {
	log('socket opened')
	send([1, 'login', ['', '']])
	// send([1, 'network_broadcast', []], id => {NETWORK_BROADCAST_API = id})
	send([1, 'database', []], id => {
		DATABASE_API = id
		send([DATABASE_API, 'get_chain_properties', []])
	})
}

<template>
  <div>
    <div>Block {{ id }}</div>
    <hr>

    <div v-if="loading">
      <loader/>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="blockInfo">
      <div>Previous block:
        <router-link :to="'/block/'+(id - 1)">{{ id - 1 }}</router-link>
      </div>
      <div>Timestamp: <timestamp :time-string="blockInfo.timestamp" /></div>
      <div>
        Witness:
        <router-link :to="'/witness/'+blockInfo.witness">
          {{ blockInfo.witness }}
        </router-link>
      </div>
      <div>
        Witness signature:
        <span class="long-key indent">{{ blockInfo.witness_signature }}</span>
      </div>
      <div>Merkle root: {{ blockInfo.transaction_merkle_root }}</div>
      <div>Transactions in block:</div>
      <ul v-if="blockInfo.transactions.length">
        <li v-for="transaction in blockInfo.transactions">
          <div v-for="key in Object.keys(transaction)">
            {{ key }}: {{ transaction[key] }}
          </div>
        </li>
      </ul>
      <div class="indent" v-else>None</div>
      <!-- TODO different transaction format than component -->
    </div>
  </div>
</template>

<script>
import Loader from './Loader'
import Timestamp from './Timestamp'

export default {
  name: 'Block',
  props: ['id'],
  data() {
    return {
      loading: false,
      error: null,
      blockInfo: null
    }
  },
  components: {
    Loader,
    Timestamp
  },
  created() {
    this.fetch()
  },
  watch: {
    '$route': 'fetch'
  },
  methods: {
    async fetch() {
      this.error = this.blockInfo = null
      this.loading = true

      try {
        this.blockInfo = await this.$chainWebsocket.send(
          'database',
          'get_block',
          [this.id])
      } catch(e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
</style>

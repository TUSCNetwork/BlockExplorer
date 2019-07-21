<template>
  <div>
    <div>Transaction {{ id }}</div>
    <hr>

    <div v-if="loading">
      <loader/>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="transactionInfo">
      <div>Contained in: block
        <router-link :to="'/block/'+transactionInfo.block_num">
          {{ transactionInfo.block_num }}
        </router-link>
      </div>
      <div>Transaction number in block: {{ transactionInfo.trx_in_block }}</div>
      <div>Operation in transaction: {{ transactionInfo.op_in_trx }}</div>
      <div>Virtual operation: {{ transactionInfo.virtual_op }}</div>
      <operation :operationCode="transactionInfo.op[0]" :operation="transactionInfo.op[1]" class="border subsection"/>
    </div>
  </div>
</template>

<script>
import Loader from './Loader'
import Operation from './Operation'

export default {
  name: 'Transaction',
  props: ['id'],
  data() {
    return {
      loading: false,
      error: null,
      transactionInfo: null
    }
  },
  components: {
    Loader,
    Operation
  },
  created() {
    this.fetch()
  },
  watch: {
    '$route': 'fetch'
  },
  methods: {
    async fetch() {
      this.error = this.transactionInfo = null
      this.loading = true

      try {
        this.transactionInfo = ( await this.$chainWebsocket.send('database', 'get_objects', [[this.id]]) )[0]
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
.memo {
  word-break: break-word;
  max-width: 50%;
}
</style>

<template>
  <div>
    <p>Transaction {{ id }}</p>
    <hr>

    <div v-if="loading">
      <loader/>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="transactionInfo">
      <p>Block number: {{ transactionInfo.block_num }}</p>
      <p>Transaction number in block: {{ transactionInfo.trx_in_block }}</p>
      <p>Operation in transaction: {{ transactionInfo.op_in_trx }}</p>
      <p>Virtual operation: {{ transactionInfo.virtual_op }}</p>
      <operation :operation_code="transactionInfo.op[0]" :operation="transactionInfo.op[1]" class="border subsection"/>
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue'
import Operation from './Operation.vue'

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
        this.transactionInfo = ( await this.$parent.send('database', 'get_objects', [[this.id]]) )[0]
      } catch(e) {
        this.error = err
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

<template>
  <div>
    <p>Chain overview</p>
    <hr>

    <div v-if="loading">
      <loader/>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="overviewInfo">
      <div>
        Head block:
        <router-link :to="'/block/'+overviewInfo.head_block_number">
          {{ overviewInfo.head_block_number }}
        </router-link>
      </div>
      <div>Timestamp: <timestamp :time-string="overviewInfo.time" /></div>
      <div>
        Current witness:
        <witness :witnessID="overviewInfo.current_witness" show-preview />
      </div>
      <div>Witness budget: {{ overviewInfo.witness_budget }}</div>
      <div>Accounts registered this interval: {{ overviewInfo.accounts_registered_this_interval }}</div>
      <div>Recently missed count: {{ overviewInfo.recently_missed_count }}</div>
      <div>Current aslot: {{ overviewInfo.current_aslot }}</div>
      <div>Recent slots filled: {{ overviewInfo.recent_slots_filled }}</div>
      <div>Dynamic flags: {{ overviewInfo.dynamic_flags }}</div>
      <div>Last irreversible block: block
        <router-link :to="'/block/'+overviewInfo.last_irreversible_block_num">
          {{ overviewInfo.last_irreversible_block_num }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader'
import Timestamp from './Timestamp'
import Witness from './Witness'

export default {
  name: 'ChainOverview',
  props: ['id'],
  data() {
    return {
      loading: false,
      error: null,
      overviewInfo: null
    }
  },
  components: {
    Loader,
    Timestamp,
    Witness
  },
  created() {
    this.fetch()

    if(this.$chainWebsocket.setOnReceivedCallback) {
      this.$chainWebsocket.setOnReceivedCallback(message => {
        const messageData = JSON.parse(message.data)
        const messageResult = messageData.result
        if (
          messageResult instanceof Array &&
          messageResult.length === 1 &&
          messageResult[0] &&
          messageResult[0].id === '2.1.0'
          )
        {
          this.updateChainOverview(messageResult[0])
        }
      })
    }
  },
  methods: {
    updateChainOverview(newInfo) {
      this.overviewInfo = newInfo
    },
    async fetch() {
      this.error = this.overviewInfo = null
      this.loading = true

      try {
        this.overviewInfo = await this.$chainWebsocket.send(
          'database', 'get_dynamic_global_properties')
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

<template>
  <div class="witness">
    <div v-if="loading">
      <loader/>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="witnessInfo">
      Witness {{ witnessInfo.id }}
      <div class="indent">
        <div>
          corresponding account:
          <router-link :to="'/account/'+witnessInfo.witness_account">
            {{ witnessInfo.witness_account }}
          </router-link>
        </div>
        <div>
          signing key: <span class="long-key indent">{{ witnessInfo.signing_key }}</span>
        </div>
        <div>
          total_votes: {{ witnessInfo.total_votes }}
        </div>
        <div>
          vote_id: {{ witnessInfo.vote_id }}
        </div>
        <div>
          url: <a :href="witnessInfo.url" target="_blank">{{ witnessInfo.url }}</a>
        </div>
        <div>
          last_aslot: {{ witnessInfo.last_aslot }}
        </div>
        <div>
          pay_vb: {{ witnessInfo.pay_vb }}
        </div>
        <div>
          total_missed: {{ witnessInfo.total_missed }}
        </div>
        <div>
          last_confirmed_block_num: {{ witnessInfo.last_confirmed_block_num }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader'

export default {
  name: 'Witness',
  props: {
    witnessID: {
      type: String,
      required: false
    },
    presetWitnessInfo: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      witnessInfo: null
    }
  },
  components: {
    Loader
  },
  created() {
    if(this.presetWitnessInfo === null) {
      this.fetch()
      return
    }

    this.witnessInfo = this.presetWitnessInfo
  },
  methods: {
    async fetch() {
      this.error = this.witnessInfo = null
      this.loading = true
      
      try {        
        this.witnessInfo = ( await this.$chainWebsocket.send(
          'database', 'get_objects', [[this.witnessID]]) )[0]
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
.witness {
  display: inline-block;
  border: 1px solid gray;
  padding: 5px;
}
.long-key {
  max-width: 300px;
  display: inline-block;
}
</style>

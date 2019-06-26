<template>
  <div>
    <p>Current active witnesses</p>
    <hr>

    <div v-if="loading">
      <loader/>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="witnesses" class="witnesses">
      <div v-for="witness in witnesses" class="witness">
        Witness {{ witness.id }}
        <div class="indent">
          <table>
            <tr>
              <td>
                corresponding account:
                <router-link :to="'/account/'+witness.witness_account">
                  {{ witness.witness_account }}
                </router-link>
                <br>
                signing key: <span class="long-key">{{ witness.signing_key }}</span>
                <br>
                total_votes: {{ witness.total_votes }}
                <br>
                vote_id: {{ witness.vote_id }}
                <br>
                url: <a :href="witness.url" target="_blank">{{ witness.url }}</a>
              </td>
              <td>
                last_aslot: {{ witness.last_aslot }}
                <br>
                pay_vb: {{ witness.pay_vb }}
                <br>
                total_missed: {{ witness.total_missed }}
                <br>
                last_confirmed_block_num: {{ witness.last_confirmed_block_num }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue'

export default {
  name: 'Witnesses',
  data() {
    return {
      loading: false,
      error: null,
      witnesses: null
    }
  },
  components: {
    Loader
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.error = this.witnesses = null
      this.loading = true
      
      try {        
        let witnessIDs = (
          await this.$chainWebsocket.send('database', 'get_global_properties', [])
        ).active_witnesses
        
        this.witnesses = await this.$chainWebsocket.send('database', 'get_objects', [witnessIDs])
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
  margin: 0 15px 20px;
  display: inline-block;
  border: 1px solid gray;
  padding: 5px;
}
.witnesses {
  height: 300px;
  overflow: auto;
}
.long-key {
  max-width: 300px;
  display: inline-block;
}
</style>

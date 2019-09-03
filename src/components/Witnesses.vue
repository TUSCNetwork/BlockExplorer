<template>
  <div>
    <div v-if="error">
      {{ error }}
    </div>

    <!-- show one table each for active and standby witnesses -->
    <div
      v-for="[witnessType, witnesses] in [['Active',activeWitnesses], ['Standby', standbyWitnesses]]"
      :key="witnessType"
    >
      <h3>{{ witnessType }} witnesses ({{ witnesses.length }})</h3>

      <div v-if="loading">
        <loader/>
      </div>

      <table v-if="witnesses.length > 0">
        <tr>
          <td>Rank</td>
          <td>Operated by</td>
          <td>Total votes</td>
          <td>Vote ID</td>
          <td>Last aslot</td>
          <td>Pay vb</td>
          <td>URL</td>
          <td>Total blocks missed</td>
          <td>Last confirmed block</td>
        </tr>
        <tr v-for="witness in witnesses" :key="witness.id">
          <td>
            {{ witness.rank }}
          </td>
          <td>
            <!-- <router-link :to="`/account/${witness.witness_account}`">
            {{ witness.witness_account }}
            </router-link> -->
            <account :nameOrID="witness.witness_account" show-preview />
          </td>
          <td>{{ witness.total_votes }}</td>
          <td>{{ witness.vote_id }}</td>
          <td>{{ witness.last_aslot }}</td>
          <td>{{ witness.pay_vb }}</td>
          <td>
            <a target="_blank" :href="witness.url">{{ witness.url }}</a>
          </td>
          <td>{{ witness.total_missed }}</td>
          <td>
            <router-link :to="`/block/${witness.last_confirmed_block_num}`">
              {{ witness.last_confirmed_block_num }}
            </router-link>
          </td>
          <td>
            <router-link :to="`/witness/${witness.id}`">more info</router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Witness from './Witness'
import Account from './Account'
import Loader from './Loader'
import range from 'lodash/range'

export default {
  name: 'Witnesses',
  data() {
    return {
      loading: false,
      error: null,
      allWitnesses: [],
      _witnessCount: null,
      _activeCount: null
    }
  },
  components: {
    Witness,
    Account,
    Loader
  },
  created() {
    this.fetch()
    setInterval(this.fetch, 1000 * 60 * 3)
  },
  computed: {
    activeWitnesses() {
      return this.allWitnesses.slice(0, this._activeCount)
    },
    standbyWitnesses() {
      return this.allWitnesses.slice(this._activeCount)
    }
  },
  methods: {
    async fetch() {
      this.error = null
      this.loading = true
      
      try {
        this._witnessCount = await this.$chainWebsocket.send(
          'database', 'get_witness_count', [])

        this._activeCount = ( await this.$chainWebsocket.send(
            'database', 'get_global_properties', []) ).active_witnesses.length

        let witnessIDs = range(1, this._witnessCount + 1).map(n => `1.5.${n}`)
        let allWitnesses = await this.$chainWebsocket.send(
          'database', 'get_objects', [witnessIDs])
        allWitnesses.sort((w1, w2) => {  // descending sort by votes
          let voteDiff = w2.total_votes - w1.total_votes
          if(voteDiff !== 0)
            return voteDiff

          let w1Pieces = w1.id.split('.')
          let w2Pieces = w2.id.split('.')
          let w1IDFinal = Number(w1Pieces[w1Pieces.length - 1])
          let w2IDFinal = Number(w2Pieces[w2Pieces.length - 1])
          return w1IDFinal - w2IDFinal
        })
        allWitnesses = allWitnesses.map((witness, index) => ({rank: index + 1, ...witness}))
        this.allWitnesses = allWitnesses
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
td {
  padding-left: 5px;
  padding-right: 5px;
  border-right: 1px solid #222;
}
</style>

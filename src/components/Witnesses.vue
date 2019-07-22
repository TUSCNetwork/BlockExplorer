<template>
  <div>
    <p>Witnesses</p>

    <div v-if="loading">
      <loader/>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="activeWitnesses" class="active-witnesses">
      <tabs :options="{ useUrlFragment: false }">
          <tab :name="`Active (${activeWitnesses.length})`">
            <witness
              v-for="witness in activeWitnesses"
              :key="witness.id"
              :presetWitnessInfo="witness"
              class="each-witness"
            />
          </tab>
          <tab :name="`Standby (${this.standbyWitnesses.length})`">
            <witness
              v-for="witness in standbyWitnesses"
              :key="witness.id"
              :presetWitnessInfo="witness"
              class="each-witness"
              />
          </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
import Witness from './Witness'
import Loader from './Loader'
import _ from 'lodash'

export default {
  name: 'activeWitnesses',
  data() {
    return {
      loading: false,
      error: null,
      activeWitnesses: [],
      standbyWitnesses: []
    }
  },
  components: {
    Witness,
    Loader
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.error = this.activeWitnesses = null
      this.loading = true
      
      try {
        let witnessCount = await this.$chainWebsocket.send(
          'database', 'get_witness_count', [])
        let allWitnessIDs = _.range(1, witnessCount + 1).map(n => `1.6.${n}`)

        let activeWitnessIDs = ( await this.$chainWebsocket.send(
            'database', 'get_global_properties', []) ).active_witnesses
        this.activeWitnesses = await this.$chainWebsocket.send(
          'database', 'get_objects', [activeWitnessIDs])

        const setMinus = (A, B) => {
          let map = {}, C = [];
          for(let i = B.length; i--; )
            map[B[i]] = null; // any other value would do
          for(let i = A.length; i--; ) {
            if(!map.hasOwnProperty(A[i]))
              C.push(A[i]);
          }

          return C;
        }

        let standbyWitnessIDs = setMinus(allWitnessIDs, activeWitnessIDs)
        this.standbyWitnesses = await this.$chainWebsocket.send(
          'database', 'get_objects', [standbyWitnessIDs])
      } catch(e) {
        this.error = e
        console.log('error')
        console.log(e)
        console.log('error')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.active-witnesses {

}
.each-witness {
  margin: 0 5px 20px;
  max-width: 400px;
}
</style>

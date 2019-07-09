<template>
  <div>
    <p>Current active witnesses (block producers)</p>
    <hr>

    <div v-if="loading">
      <loader/>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="witnesses" class="witnesses">
      <witness
        v-for="witness in witnesses"
        :key="witness.id"
        :presetWitnessInfo="witness"
        class="each-witness"
      />
    </div>
  </div>
</template>

<script>
import Witness from './Witness.vue'
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
    Witness,
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
.witnesses {
  height: 300px;
  overflow: auto;
}
.each-witness {
  margin: 0 5px 20px;
  max-width: 31%;
}
</style>

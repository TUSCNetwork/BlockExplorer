<template>
  <div class="account">
    <p>Account {{ displayName }}</p>
    <hr>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="loading">
      <loader/>
    </div>

    <div v-if="accountInfo">
      <p>ID: {{ accountInfo.id }}</p>
      <p>Registrar: {{ accountInfo.registrar }}</p>
      <p>Statistics: {{ accountInfo.statistics }}</p>
      <div class="border subsection">
        <p>Authorities</p>
        <hr>
        <p>Owner authorities</p>
        <ul>
          <li v-for="auth in accountInfo.owner.key_auths" v-bind:key="auth[0]">
            {{ auth[0] }}
          </li>
        </ul>
        <p>Active authorities</p>
        <ul style="overflow-y: auto;">
          <li v-for="auth in accountInfo.active.key_auths" v-bind:key="auth[0]">
            {{ auth[0] }}
          </li>
        </ul>
        <p>Memo authority: {{ accountInfo.options.memo_key }}</p>
      </div>
    </div>

    <div v-if="accountHistory" class="border subsection">
      <p>Account history</p>
      <hr>
      <div class="transactions-container">
        <div v-for="operation in accountHistory" v-bind:key="operation.id" class="transaction">
          Transaction <router-link :to="'/tx/'+operation.id">{{ operation.id }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue'

export default {
  name: 'Account',
  props: ['name'],
  data() {
    return {
      loading: false,
      error: null,
      displayName: this.name,
      accountInfo: null,
      accountHistory: null,
    }
  },
  components: {
    Loader
  },
  created() {
    this.fetch()
  },
  watch: {
    '$route': 'fetch'
  },
  methods: {
    fetch() {
      this.error = this.accountInfo = null
      this.loading = true

      if (/1.2.\d+/.exec(this.name) !== null) {  // we were given id
        this.$parent.send('database', 'get_objects', [[this.name]])
        .then(result => {
          this.loading = false
          this.accountInfo = result[0]
          this.displayName = this.accountInfo.name
        }).catch(err => {
          this.loading = false
          this.error = err
        })

        this.$parent.send('history', 'get_relative_account_history', [this.name, 0, 100, 0])
        .then(result => {
          this.accountHistory = result
        })
        .catch(err => {
          this.loading = false
          this.error = err
        })

        return
      }
      
      // we were given name
      this.$parent.send('database', 'get_account_by_name', [this.name])
      .then(result => {
        this.loading = false
        this.accountInfo = result
      }).catch(err => {
        this.loading = false
        this.error = err
      })

      this.$parent.send('history', 'get_relative_account_history', [this.name, 0, 100, 0])
      .then(result => {
        this.accountHistory = result
      })
      .catch(err => {
        this.loading = false
        this.error = err
      })
    }
  }
}
</script>

<style scoped>
.account {
}
.account p {
  margin: 10px inherit;
}
ul {
  margin: 0px;
}
.transaction {
  padding: 3px 5px;
}
.transactions-container {
  height: 200px;
  overflow-y: auto;
}
p {
  margin: 0 4px;
}
</style>

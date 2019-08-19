<template>

  <span v-if="showPreview">
    <router-link :to="'/account/'+nameOrID">{{ previewText }}</router-link>
  </span>
  
  <div v-else class="account">
    <div>Account {{ name }}</div>
    <hr>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="loading">
      <loader/>
    </div>

    <div v-if="accountInfo">
        <div>ID: {{ accountInfo.id }}</div>
        <div>Registrar: {{ accountInfo.registrar }}</div>
        <div>Statistics: {{ accountInfo.statistics }}</div>
        <div class="border subsection">
          <div>Authorities</div>
          <hr>
          <div>Owner authorities</div>
          <ul>
            <li v-for="auth in accountInfo.owner.key_auths" :key="auth[0]">
              {{ auth[0] }}
            </li>
          </ul>
          <div>Active authorities</div>
          <ul style="overflow-y: auto;">
            <li v-for="auth in accountInfo.active.key_auths" :key="auth[0]">
              {{ auth[0] }}
            </li>
          </ul>
          <div>Memo authority: {{ accountInfo.options.memo_key }}</div>
        </div>
    </div>

    <div v-if="accountHistory" class="border subsection">
      <div>Account history</div>
      <hr>
      <div class="transactions-container">
        <div v-for="operation in accountHistory" :key="operation.id" class="transaction">
          Transaction <router-link :to="'/tx/'+operation.id">{{ operation.id }}</router-link>
        </div>
      </div>
      <div>
        <v-pagination v-model="currentPage"
                      :page-count="totalPages"
                      :classes="bootstrapPaginationClasses"
                      :labels="paginationAnchorTexts"
                      @input="selectPage"></v-pagination>
      </div>
    </div>
  </div>

</template>

<script>
import Loader from './Loader'
import vPagination from 'vue-plain-pagination'

export default {
  name:'Account',
  props: {
    nameOrID: String,
    showPreview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      accountInfo: null,
      accountHistory: [],
      accountStatistics: null,
      currentPage: 1,
      pageLimit : 100,
      bootstrapPaginationClasses: {
        ul: 'pagination',
        li: 'pagination-item',
        liActive: 'active',
        liDisable: 'disabled',
        button: 'page-link' 
      },
      paginationAnchorTexts: {
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last'
      }
    }
  },
  components: {
    Loader,
    vPagination 
  },
  created() {
    this.fetch()
  },
  watch: {
    '$route': 'fetch'
  },
  computed: {
    name() {
      return this.accountInfo ?
      this.accountInfo.name :
      (this.nameIsID ?
        '(loading)' :
        this.nameOrID)
    },
    totalPages() {
      return Math.ceil(this.accountStatistics['total_ops']/this.pageLimit)
    },
    id() {
      return this.accountInfo ?
      this.accountInfo.id :
      (this.nameIsID ?
        this.nameOrID :
        '(loading)')
    },
    nameIsID() {
      return /1.2.\d+/.exec(this.nameOrID) !== null
    },
    previewText() {
      return this.accountInfo ? `${this.name} (${this.id})` : this.nameOrID
    }
  },
  methods: {
    async fetch() {
      this.error = this.accountInfo = null
      this.loading = true

      try {
        this.accountInfo = this.nameIsID ?
          ( await this.$chainWebsocket.send('database', 'get_objects', [[this.nameOrID]]) )[0] :
          ( await this.$chainWebsocket.send('database', 'get_account_by_name', [this.nameOrID]) )
        if (this.accountInfo === null) {
          this.error = `Account ${this.nameOrID} not found`
          return
        }
        try{
          this.accountStatistics = ( await this.$chainWebsocket.send('database', 'get_objects', [[this.accountInfo['statistics']]]) )[0]
        } catch(e) {
          this.error = e
        }
        this.fetchAccountHistory()
      } catch(e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
    async fetchAccountHistory() {
      try {
        this.accountHistory =  // accepts either id or name
        await this.$chainWebsocket.send(
          'history', 'get_relative_account_history', [this.nameOrID, 0 , this.pageLimit , this.accountStatistics['total_ops']-(this.currentPage-1)*this.pageLimit])
      } catch(e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
    selectPage : function () {
      this.fetchAccountHistory();
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

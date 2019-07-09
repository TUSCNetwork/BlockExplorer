<template>
  <div id="app">
    <div class="section border">
      <chain-overview/>
    </div>
    <div class="section border">
      <p>Account name: 
        <input type="text" id="searchAddress" v-model="searchAddress">
      </p>
    </div>
    <router-view :key="$route.fullPath" class="section border"/> 
    <witnesses class="section border"/>
  </div>
</template>

<script>
  import Witnesses from './components/Witnesses.vue'
  import ChainOverview from './components/ChainOverview'

  export default {
    name: 'App',
    data() {
      return {
        search: '',
        searchAddress: '',
      }
    },
    components: {
      Witnesses,
      ChainOverview
    },
    watch: {
      searchAddress: debounce(function(val) {
        this.$router.push({name: 'account', params: {name: val}})
      }, 500)
    },
    created() {
      this.$on('update-chain-overview', properties => {
        console.log('GOT EEM', properties)
      })
    },
    mounted() {
      document.getElementById('searchAddress').focus()
    }
}

// TODO lodash?
function debounce(func, wait) {
  let timeout
  return function() {
    const context = this, args = arguments
    const later = () => timeout = null
    clearTimeout(timeout)
    console.log('debounced')
    timeout = setTimeout(later, wait)
    func.apply(context, args)
  }
}
</script>

<style>
html {
  height: 100%;
  line-height: 1.4;
}
body {
  height: 100%;
  margin: 10px 0 0;
}

/* * */
input[type="text"] {
  background-color: #EEE;
}
p {
  margin: 2px 0;
}
hr {
  margin-bottom: 10px;
}

#app {
  padding: 10px;
}

/* * */
.border {
    border: 1px solid black;
    border-radius: 2px;
}
.section {
  background-color: #2E3131;
}
.section {
  padding: 15px;
  margin: 10px auto;
}
.subsection {
  margin: 20px auto;
  padding: 10px 15px;
}
.indent {
  border-left: 1px solid black;
  padding-left: 15px;
  margin-left: 10px;
}
.long-key {
  word-break: break-word;
  vertical-align: top;
}

/* * * provisional dark style */
body {
  background-color: rgb(34, 36, 37);
  color: rgb(209, 203, 199);
}

* {
  border-color: rgb(123, 107, 101);
}

a {
  color: rgb(144, 196, 238);
}
a:visited {
  color: rgb(160, 117, 234);
}
</style>
